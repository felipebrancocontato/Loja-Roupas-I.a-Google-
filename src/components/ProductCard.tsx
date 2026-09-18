import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: any, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const installmentValue = (product.price / 6).toFixed(2).replace('.', ',');
  const formattedPrice = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedOriginalPrice = product.originalPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0], selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E9E2D7] hover:border-[#D0C2B0] hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#EFEAE2] cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Tag Badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#FAF8F5]/90 backdrop-blur-xs text-[#29241E] rounded-md border border-[#E5DEC3]">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#2B2621] hover:text-[#A85542] hover:bg-white transition-colors shadow-xs"
          aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#A85542] text-[#A85542]' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-[#201D19] text-xs font-semibold rounded-md shadow-md flex items-center justify-center gap-1.5 transition-all backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Espiar Detalhes</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs text-[#7A7268] mb-1.5">
            <span className="capitalize font-medium">{product.category}</span>
            <span className="inline-flex items-center gap-1 text-[#423D36]">
              <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
              <strong className="font-semibold">{product.rating}</strong>
              <span className="text-[11px] text-[#8C847A]">({product.reviewsCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-medium text-[#1E1B18] line-clamp-1 hover:text-[#9A5C32] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Fabric Highlight */}
          <p className="text-xs text-[#7D756C] line-clamp-1 mt-0.5">
            {product.composition.split('|')[0]}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((col) => (
            <button
              key={col.name}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(col);
              }}
              title={col.name}
              className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                selectedColor.name === col.name
                  ? 'ring-2 ring-offset-1 ring-[#1E1B18] scale-110'
                  : 'border-[#CCC4B8]'
              }`}
              style={{ backgroundColor: col.hex }}
            />
          ))}
          <span className="text-[11px] text-[#7A7268] ml-1">
            {selectedColor.name}
          </span>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-[#F0EAE1] flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-base sm:text-lg text-[#1E1B18]">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-[#9B9389] line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#787168] block">
              6x de R$ {installmentValue} s/ juros
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 ${
              addedAnimation
                ? 'bg-[#3C6E47] text-white'
                : 'bg-[#FAF6F0] hover:bg-[#231F1C] text-[#292521] hover:text-white border border-[#E0D7C9] hover:border-transparent'
            }`}
            title="Adicionar à sacola"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
