import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: { code: string; discountPercent: number } | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 299;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const ok = onApplyCoupon(couponInput.trim());
    if (ok) {
      setCouponSuccess(true);
      setTimeout(() => setCouponSuccess(false), 2000);
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido. Tente BEMVINDO10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E2D8CA]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E0D2] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#231F1C]" />
              <h2 className="font-serif text-xl font-medium text-[#1E1B18]">
                Sua Sacola
              </h2>
              <span className="text-xs text-[#7A7268] bg-[#F0EAE1] px-2 py-0.5 rounded-full font-medium">
                {items.reduce((acc, it) => acc + it.quantity, 0)} itens
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#635C52] hover:text-black hover:bg-[#F2ECE3] rounded-md transition-colors cursor-pointer"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F3EFE9] px-6 py-3 border-b border-[#E6DDD0]">
            <div className="flex items-center justify-between text-xs font-medium text-[#4D453C] mb-1.5">
              {missingForFreeShipping === 0 ? (
                <span className="text-[#2C6E3D] flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Parabéns! Você desbloqueou Frete Grátis!
                </span>
              ) : (
                <span>
                  Faltam <strong>{missingForFreeShipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> para Frete Grátis
                </span>
              )}
              <span className="text-[11px] text-[#786E63]">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#DDD4C6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9A5C32] transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 rounded-full bg-[#EFE9DF] text-[#7A6F62]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg text-[#1E1B18]">Sua sacola está vazia</h3>
                <p className="text-xs text-[#70685D] max-w-xs leading-relaxed">
                  Explore nossa coleção de linho puro, vestidos fluidos e alfaiataria atemporal para encontrar a peça perfeita.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#231F1C] text-white text-xs font-medium rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
                >
                  Continuar Explorando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E9E1D5] shadow-2xs items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-22 object-cover rounded-lg bg-[#EFE9DF] shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs sm:text-sm font-medium text-[#1E1B18] truncate" title={item.product.name}>
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#6B6357]">
                      <span>Tam: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full inline-block border" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#1E1B18] pt-1">
                      {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-[#D9CFC2] rounded-md bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#4F473E] hover:bg-[#EAE1D5] rounded-l-md"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-[#1E1B18]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#4F473E] hover:bg-[#EAE1D5] rounded-r-md"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9E958B] hover:text-[#B94A3E] p-1 transition-colors"
                        title="Remover peça"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E8E0D2] space-y-4">
              
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#F2F7F2] border border-[#C5E1C9] rounded-lg text-xs text-[#2B6638]">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Cupom <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="text-xs text-[#A84538] underline hover:no-underline cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupom (ex: BEMVINDO10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg uppercase tracking-wider focus:outline-hidden focus:border-[#9A5C32]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#40372F] hover:bg-[#231F1C] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#A84538] mt-1">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-[#2C6E3D] mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Cupom de 10% aplicado com sucesso!
                  </p>
                )}
              </div>

              {/* Pricing totals */}
              <div className="space-y-1.5 text-xs text-[#635B51] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1E1B18]">
                    {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#2C6E3D]">
                    <span>Desconto ({appliedCoupon.code})</span>
                    <span>
                      -{discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="font-medium text-[#1E1B18]">
                    {missingForFreeShipping === 0 ? (
                      <span className="text-[#2C6E3D] font-bold">Grátis</span>
                    ) : (
                      'Calculado no checkout'
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EFE8DC] flex justify-between items-baseline text-sm">
                  <span className="font-semibold text-[#1E1B18]">Total</span>
                  <div className="text-right">
                    <span className="font-serif text-xl font-bold text-[#1E1B18]">
                      {finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="block text-[10px] text-[#80776C]">
                      ou em até 6x de {(finalTotal / 6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} s/ juros
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#231F1C] hover:bg-[#3D3732] text-white text-xs sm:text-sm font-medium tracking-wide rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#857C71]">
                🔒 Compra 100% Criptografada & Segura
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
