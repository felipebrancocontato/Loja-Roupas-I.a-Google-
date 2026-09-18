import React from 'react';
import { Feather, Scissors, Leaf, Sparkles } from 'lucide-react';

export const BrandValues: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: 'Fibras Naturais Nobres',
      description: 'Priorizamos linho europeu puro, algodão Pima peruano e cupro sustentável. Fibras respiráveis com toque aveludado que proporcionam conforto térmico absoluto em qualquer estação.'
    },
    {
      icon: Scissors,
      title: 'Modelagem Autoral Precisa',
      description: 'Nossas peças são desenhadas no Brasil com estudos milimétricos de caimento. Acabamentos em costura francesa, botões naturais e ombreiras discretas que valorizam a silhueta.'
    },
    {
      icon: Leaf,
      title: 'Cadeia Ética e Transparente',
      description: 'Produção consciente com ateliês parceiros certificados, remuneração justa e embalagens 100% biodegradáveis ou recicladas, reduzindo o impacto no meio ambiente.'
    },
    {
      icon: Sparkles,
      title: 'Primeira Troca Grátis por Nossa Conta',
      description: 'Se o caimento não for exatamente como você sonhou, realizamos a troca ou devolução sem nenhum custo extra em até 30 dias, direto pela sua casa.'
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9A5C32] mb-2">
            Por Trás da Nossa Etiqueta
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            O Padrão Essência de Alfaiataria
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#61594F]">
            Acreditamos no consumo consciente: menos peças no armário, mas com matéria-prima nobre e durabilidade para acompanhar você por anos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-white rounded-2xl border border-[#E9E1D5] shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] text-[#785E47] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#615A50] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
