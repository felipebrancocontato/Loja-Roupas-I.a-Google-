import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import lookbookImg from '../assets/images/editorial_lookbook_1789769599897.jpg';
import { Product } from '../types';

interface LookbookSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddLookToCart: (products: Product[]) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  onQuickView,
  onAddLookToCart
}) => {
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Look pieces: prod-1 (Blazer), prod-4 (Calça), prod-7 (Bolsa)
  const lookProducts = products.filter((p) => ['prod-1', 'prod-4', 'prod-7'].includes(p.id));
  const lookTotal = lookProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddAll = () => {
    onAddLookToCart(lookProducts);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <section id="lookbook" className="py-20 bg-[#F5EFEB] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E0D5C5] bg-[#EAE2D5]">
              <img
                src={lookbookImg}
                alt="Editorial Lookbook 2026 - Alfaiataria Despretensiosa"
                referrerPolicy="no-referrer"
                className="w-full h-[520px] sm:h-[600px] object-cover object-center"
              />

              {/* Tag overlay */}
              <div className="absolute top-6 left-6 bg-[#231F1C]/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Editorial Primavera / Verão
              </div>
            </div>
          </div>

          {/* Right: Look Breakdown & Shop the Look */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#9A5C32] mb-1.5">
                Inspiração de Estilo
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
                Compre o Look Completo:
                <span className="block italic text-[#87553B]">Alfaiataria Despretensiosa</span>
              </h2>
              <p className="text-sm sm:text-base text-[#61594F] mt-3 leading-relaxed">
                A combinação impecável do blazer em puro linho natural com o movimento leve da pantalona fluida e a tote bag estruturada. Peças coordenadas com perfeição para o dia a dia contemporâneo.
              </p>
            </div>

            {/* Look Items List */}
            <div className="space-y-3 pt-2">
              {lookProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs hover:border-[#CFC3B0] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-16 object-cover rounded-lg bg-[#FAF7F2]"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-[#1E1B18]">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#8B5A3E] mt-0.5">
                        {prod.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickView(prod)}
                    className="text-xs text-[#52493E] hover:text-[#1E1B18] font-medium px-3 py-1.5 rounded-md hover:bg-[#F2ECE3] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Ver Peça</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total of Look & Add All button */}
            <div className="p-5 bg-white rounded-2xl border border-[#DFD5C5] shadow-sm space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#70675C] block">Total do Look Completo</span>
                  <span className="font-serif text-2xl font-bold text-[#1E1B18]">
                    {lookTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#2E6A3B] bg-[#E8F3EB] px-2.5 py-1 rounded-full">
                  Frete Grátis Incluso
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddAll}
                className={`w-full py-3.5 px-6 rounded-lg text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-[#2E6A3B] text-white'
                    : 'bg-[#231F1C] hover:bg-[#3D3732] text-white shadow-md'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Todas as 3 Peças Adicionadas à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar as 3 Peças à Sacola</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
