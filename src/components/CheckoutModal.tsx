import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, FileText, ShieldCheck, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: { code: string; discountPercent: number } | null;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    city: '',
    state: 'SP',
    installments: '1'
  });
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const pixDiscount = paymentMethod === 'pix' ? (subtotal - discountAmount) * 0.05 : 0;
  const total = Math.max(0, subtotal - discountAmount - pixDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'ES-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderPlaced(true);
    onOrderCompleted();
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136loja-essencia-pagamentos@banco.com.br5204000053039865802BR5925ESSENCIA MODA ATEMPORAL6009SAO PAULO62070503***6304ABCD');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DFD6CA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E0D2] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A5C32] font-semibold">
              Checkout Seguro
            </span>
            <h2 className="font-serif text-2xl font-medium text-[#1E1B18]">
              {orderPlaced ? 'Pedido Confirmado' : 'Finalizar Sua Compra'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#635C52] hover:text-black hover:bg-[#EFE8DE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlaced ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#EBF5EE] text-[#2E6A3B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold px-3 py-1 bg-[#F0EAE1] text-[#6E6457] rounded-full">
                Pedido {orderId}
              </span>
              <h3 className="font-serif text-2xl text-[#1E1B18]">
                Obrigado pela sua preferência!
              </h3>
              <p className="text-sm text-[#5C5449] max-w-md mx-auto">
                Enviamos os detalhes do pedido e o código de rastreamento para o e-mail informado. Suas peças serão preparadas com embalagem especial.
              </p>
            </div>

            {paymentMethod === 'pix' && (
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E0D7CA] max-w-md mx-auto space-y-3">
                <p className="text-xs font-semibold text-[#29241E]">
                  Pague com Pix para envio imediato
                </p>
                <div className="p-3 bg-white inline-block rounded-lg shadow-2xs border border-[#E8E1D5]">
                  <QrCode className="w-32 h-32 text-[#1E1B18] mx-auto" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-2.5 px-4 bg-[#231F1C] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-[#3D3732] cursor-pointer"
                >
                  {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Chave Pix Copiada!' : 'Copiar Código Pix Copia e Cola'}</span>
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-[#EAE2D6]">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#231F1C] text-white text-sm font-medium rounded-lg hover:bg-[#3D3732] transition-colors cursor-pointer"
              >
                Voltar para a Loja
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#473F35]">
                1. Dados de Envio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4D453C] mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Clara Ribeiro"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg focus:outline-hidden focus:border-[#9A5C32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4D453C] mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="clara@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg focus:outline-hidden focus:border-[#9A5C32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4D453C] mb-1">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg focus:outline-hidden focus:border-[#9A5C32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4D453C] mb-1">CEP *</label>
                  <input
                    type="text"
                    required
                    placeholder="01310-100"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg focus:outline-hidden focus:border-[#9A5C32]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#4D453C] mb-1">Endereço de Entrega & Bairro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Av. Paulista, 1000 - Apto 42 - Bela Vista"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFBF] rounded-lg focus:outline-hidden focus:border-[#9A5C32]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4 border-t border-[#EAE2D6]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#473F35]">
                2. Forma de Pagamento
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-[#1E1B18] bg-[#F7F3EB] ring-1 ring-[#1E1B18]'
                      : 'border-[#D9CFBF] hover:bg-[#F9F6F0]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#2E6A3B]" />
                  <span className="block text-xs font-semibold text-[#1E1B18]">Pix</span>
                  <span className="block text-[10px] text-[#2E6A3B] font-medium mt-0.5">5% OFF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#1E1B18] bg-[#F7F3EB] ring-1 ring-[#1E1B18]'
                      : 'border-[#D9CFBF] hover:bg-[#F9F6F0]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#423C35]" />
                  <span className="block text-xs font-semibold text-[#1E1B18]">Cartão</span>
                  <span className="block text-[10px] text-[#6E6457] mt-0.5">Até 6x s/ juros</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'boleto'
                      ? 'border-[#1E1B18] bg-[#F7F3EB] ring-1 ring-[#1E1B18]'
                      : 'border-[#D9CFBF] hover:bg-[#F9F6F0]'
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1 text-[#423C35]" />
                  <span className="block text-xs font-semibold text-[#1E1B18]">Boleto</span>
                  <span className="block text-[10px] text-[#6E6457] mt-0.5">Vencimento 3 dias</span>
                </button>
              </div>

              {/* Conditional Card inputs */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E0D7CA] space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4D453C] mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFBF] rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4D453C] mb-1">Validade (MM/AA)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFBF] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4D453C] mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFBF] rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total summary */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E0D7CA] space-y-2 text-xs text-[#595247]">
              <div className="flex justify-between">
                <span>Total dos produtos</span>
                <span className="font-semibold text-[#1E1B18]">
                  {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#2C6E3D]">
                  <span>Cupom aplicado ({appliedCoupon.code})</span>
                  <span>-{discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
              {pixDiscount > 0 && (
                <div className="flex justify-between text-[#2C6E3D]">
                  <span>Desconto de 5% no Pix</span>
                  <span>-{pixDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E5DEC3] flex justify-between items-center text-sm">
                <span className="font-bold text-[#1E1B18]">Valor Final</span>
                <span className="font-serif text-xl font-bold text-[#1E1B18]">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#231F1C] hover:bg-[#3D3732] text-white text-sm font-medium tracking-wide rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Confirmar e Finalizar Compra</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
