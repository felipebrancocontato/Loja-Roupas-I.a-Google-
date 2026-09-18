import React, { useState, useMemo } from 'react';
import { Product, ProductColor, ProductSize, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: ProductSize, color: ProductColor) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'todos', label: 'Todos os Modelos' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'masculino', label: 'Masculino' },
    { id: 'alfaiataria', label: 'Alfaiataria' },
    { id: 'linho', label: 'Linho Puro' },
    { id: 'acessorios', label: 'Acessórios' }
  ];

  const sizes = ['PP', 'P', 'M', 'G', 'GG'];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (activeCategory !== 'todos') {
          if (activeCategory === 'linho') {
            if (p.category !== 'linho' && !p.composition.toLowerCase().includes('linho')) {
              return false;
            }
          } else if (p.category !== activeCategory) {
            return false;
          }
        }

        // Size filter
        if (selectedSize !== 'todos') {
          if (!p.sizes.includes(selectedSize as ProductSize)) {
            return false;
          }
        }

        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchComp = p.composition.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchComp && !matchCat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // relevance / default
      });
  }, [products, activeCategory, selectedSize, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9A5C32] mb-2">
            Design Atemporal & Fibras Naturais
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            Nossa Coleção em Destaque
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B635A]">
            Peças desenvolvidas para transitar com facilidade entre ocasiões, unindo o frescor do linho, o caimento da alfaiataria e a leveza do algodão.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#231F1C] text-white shadow-xs'
                    : 'bg-[#EFEAE2] text-[#4F473E] hover:bg-[#E4DDD3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="mt-6 mb-8 pt-4 border-t border-[#EAE2D5] flex flex-wrap items-center justify-between gap-4">
          {/* Size Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#7A7268] font-medium flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Tamanho:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSize('todos')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                selectedSize === 'todos'
                  ? 'bg-[#50453A] text-white'
                  : 'bg-[#ECE5DA] text-[#4F473E] hover:bg-[#E0D7C9]'
              }`}
            >
              Todos
            </button>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  selectedSize === s
                    ? 'bg-[#50453A] text-white'
                    : 'bg-[#ECE5DA] text-[#4F473E] hover:bg-[#E0D7C9]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results count & Sort select */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#736B61]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
            </span>
            
            <div className="flex items-center gap-1.5 bg-[#EFEAE2] rounded-lg px-2.5 py-1 border border-[#E0D7C9]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#736B61]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#2E2822] font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="relevance">Mais Populares</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Search Banner Notice */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-[#EAE2D4] rounded-lg flex items-center justify-between text-xs text-[#3D352B]">
            <span>
              Filtrando resultados por: <strong>"{searchQuery}"</strong>
            </span>
            <button
              type="button"
              onClick={onClearSearch}
              className="font-medium underline hover:text-[#1E1B18] cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[#F2EDE5] rounded-xl border border-dashed border-[#D5C9BA]">
            <p className="font-serif text-xl text-[#2B2620]">Nenhuma peça encontrada</p>
            <p className="text-xs sm:text-sm text-[#736B61] mt-1 max-w-md mx-auto">
              Não encontramos peças para os filtros aplicados. Tente selecionar outro tamanho ou limpar os termos de busca.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('todos');
                setSelectedSize('todos');
                onClearSearch();
              }}
              className="mt-4 px-4 py-2 bg-[#231F1C] text-white text-xs font-medium rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
            >
              Ver Todas as Peças
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
