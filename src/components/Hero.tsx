import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import heroImage from '../assets/images/clothing_store_hero_1789769589125.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenFittingGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenFittingGuide }) => {
  return (
    <section id="hero" className="pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DF] text-[#785E47] text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C32]" />
              Coleção Primavera / Verão 2026
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#1E1B18] tracking-tight">
                Elegância sem esforço.
                <span className="block font-italic italic text-[#8B5A3E]">
                  Roupas feitas para durar.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5E574E] leading-relaxed max-w-xl">
                Alfaiataria contemporânea e peças essenciais tecidas exclusivamente em linho puro, algodão egípcio e fibras nobres. Um guarda-roupa pensado para quem valoriza sofisticação, caimento perfeito e conforto autêntico.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-explore-button"
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#231F1C] hover:bg-[#3D3732] text-white text-sm font-medium tracking-wide rounded-md shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Explorar Coleção Completa</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-fitting-button"
                type="button"
                onClick={onOpenFittingGuide}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-[#EDE6DC] text-[#2C2723] text-sm font-medium tracking-wide rounded-md border border-[#D5C9BA] transition-colors cursor-pointer"
              >
                Descobrir Meu Tamanho
              </button>
            </div>

            {/* Metrics & Highlights */}
            <div className="pt-6 border-t border-[#E8E1D5] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1B18]">100%</p>
                <p className="text-xs text-[#70685E] mt-0.5">Fibras Naturais Certificadas</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1B18]">4.9 / 5</p>
                <p className="text-xs text-[#70685E] mt-0.5">+3.400 Avaliações 5 Estrelas</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1B18]">30 Dias</p>
                <p className="text-xs text-[#70685E] mt-0.5">Primeira Troca Grátis</p>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#EBE4D8] border border-[#E0D7C9]">
                <img
                  src={heroImage}
                  alt="Campanha Editorial - Loja de Roupas Coleção 2026"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[500px] object-cover object-center"
                />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/60 max-w-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-[#EFE8DC] text-[#7A5B3E]">
                      <Award className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#1E1B18]">Acabamento de Alta Costura</p>
                      <p className="text-[11px] text-[#696258]">Costuras francesas e botões artesanais</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-[#EDE5D8]/50 rounded-3xl -z-10 blur-xs" />
            </div>
          </div>

        </div>

        {/* Feature Badges Banner */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#EAE2D5] grid grid-cols-2 md:grid-cols-4 gap-6 text-[#474138]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#EAE2D5] text-[#2C2723]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1E1B18]">Frete Seguro Rápido</p>
              <p className="text-xs text-[#70685E]">Grátis acima de R$ 299</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#EAE2D5] text-[#2C2723]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1E1B18]">Troca Descomplicada</p>
              <p className="text-xs text-[#70685E]">Até 30 dias por nossa conta</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#EAE2D5] text-[#2C2723]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1E1B18]">Pagamento 100% Seguro</p>
              <p className="text-xs text-[#70685E]">Em até 6x s/ juros ou Pix</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#EAE2D5] text-[#2C2723]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1E1B18]">Fibras Naturais Puras</p>
              <p className="text-xs text-[#70685E]">Linho Europeu e Algodão Pima</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
