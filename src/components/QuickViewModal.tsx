import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Check, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { Product, ProductColor, ProductSize } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenFittingGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenFittingGuide
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Reset when product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setIsSuccess(false);
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const formattedPrice = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedOriginalPrice = product.originalPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const installmentValue = (product.price / 6).toFixed(2).replace('.', ',');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E0D7CA] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#302B25] hover:bg-white hover:text-black shadow-xs transition-colors cursor-pointer"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="md:w-1/2 p-6 bg-[#FAF7F2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE3D7]">
          <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#ECE5DB]">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#1E1B18] text-white text-[11px] font-semibold tracking-wider uppercase rounded-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.secondaryImage && (
            <div className="flex gap-2.5 mt-3">
              <button
                type="button"
                onClick={() => setSelectedImage(product.image)}
                className={`w-14 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImage === product.image ? 'border-[#1E1B18]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Visão frontal" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage(product.secondaryImage!)}
                className={`w-14 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImage === product.secondaryImage ? 'border-[#1E1B18]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImage} alt="Visão detalhada" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Rating and Reviews */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#9A5C32]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#524B43]">
                <div className="flex text-[#E5A93C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#877E74]">({product.reviewsCount} opiniões)</span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1B18]">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-[#1E1B18]">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-sm text-[#948B80] line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
                <span className="text-xs text-[#6B6358] bg-[#EFE9DF] px-2 py-0.5 rounded-sm">
                  ou 6x de R$ {installmentValue} sem juros
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5C554C] leading-relaxed">
              {product.description}
            </p>

            {/* Composition pill */}
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-[#4E473E]">
              <strong className="font-medium text-[#26221D]">Composição: </strong>
              {product.composition}
            </div>

            {/* Color selection */}
            <div>
              <label className="block text-xs font-semibold text-[#2D2822] mb-2">
                Cor: <span className="font-normal text-[#6B6358]">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`group relative p-0.5 rounded-full cursor-pointer transition-all ${
                      selectedColor.name === color.name ? 'ring-2 ring-[#1E1B18] ring-offset-2' : 'hover:scale-105'
                    }`}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#2D2822]">
                  Tamanho: <span className="font-normal text-[#6B6358]">{selectedSize}</span>
                </label>
                <button
                  type="button"
                  onClick={onOpenFittingGuide}
                  className="inline-flex items-center gap-1 text-xs text-[#9A5C32] hover:text-[#6B3D1D] font-medium underline cursor-pointer"
                >
                  <Ruler className="w-3 h-3" />
                  Guia de Medidas
                </button>
              </div>
              <div className="flex items-center gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-10 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#231F1C] text-white shadow-xs'
                        : 'bg-[#F2ECE3] text-[#473F36] hover:bg-[#E5DDCF]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-[#D9CEBF] rounded-lg bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-[#38322B] hover:bg-[#ECE4D8] rounded-l-lg transition-colors"
                >
                  -
                </button>
                <span className="w-9 text-center text-xs font-semibold text-[#1E1B18]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-[#38322B] hover:bg-[#ECE4D8] rounded-r-lg transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 rounded-lg font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isSuccess
                    ? 'bg-[#2E6A3B] text-white'
                    : 'bg-[#231F1C] hover:bg-[#3D3732] text-white shadow-md'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <span>Adicionar à Sacola • {((product.price) * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-lg border border-[#D9CEBF] transition-colors cursor-pointer ${
                  isWishlisted ? 'bg-[#F9EBE8] border-[#A85542] text-[#A85542]' : 'text-[#4A433A] hover:bg-[#F2EDE5]'
                }`}
                title="Salvar nos favoritos"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="pt-4 border-t border-[#EAE3D7] grid grid-cols-2 gap-3 text-[11px] text-[#6E665C]">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#2E6A3B]" />
              <span>Envio em 24h a 48h úteis</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E6A3B]" />
              <span>Garantia de 30 dias para troca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
