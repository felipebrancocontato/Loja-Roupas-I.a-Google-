import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E2D8CA]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E0D2] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#A85542] text-[#A85542]" />
              <h2 className="font-serif text-xl font-medium text-[#1E1B18]">
                Seus Favoritos
              </h2>
              <span className="text-xs text-[#7A7268] bg-[#F0EAE1] px-2 py-0.5 rounded-full font-medium">
                {wishlistProducts.length} itens
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#635C52] hover:text-black hover:bg-[#F2ECE3] rounded-md transition-colors cursor-pointer"
              aria-label="Fechar favoritos"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 rounded-full bg-[#EFE9DF] text-[#7A6F62]">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg text-[#1E1B18]">Nenhum favorito salvo</h3>
                <p className="text-xs text-[#70685D] max-w-xs leading-relaxed">
                  Clique no ícone de coração em qualquer peça do catálogo para salvá-la aqui e acompanhar disponibilidade.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#231F1C] text-white text-xs font-medium rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E9E1D5] shadow-2xs items-center"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-22 object-cover rounded-lg bg-[#EFE9DF] shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs sm:text-sm font-medium text-[#1E1B18] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#736B5F]">
                      {prod.composition.split('|')[0]}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#1E1B18] pt-1">
                      {prod.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => onMoveToCart(prod)}
                        className="px-3 py-1.5 bg-[#231F1C] hover:bg-[#3D3732] text-white text-xs font-medium rounded-md flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Mover para Sacola</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveWishlist(prod)}
                        className="p-1.5 text-[#8F867C] hover:text-[#A84538] transition-colors"
                        title="Remover dos favoritos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E0D2]">
              <p className="text-xs text-center text-[#736B5F]">
                Os itens salvos na sua lista continuam disponíveis de acordo com nosso estoque.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
