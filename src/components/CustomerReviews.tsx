import React from 'react';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-[#9A5C32] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#2E6A3B]" />
            Experiência Verificada
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-[#E5A93C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#1E1B18]">4.9 de 5 estrelas</span>
            <span className="text-xs text-[#70685E]">(Mais de 3.400 compras avaliadas)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 bg-white rounded-2xl border border-[#E9E1D5] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E5A93C]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C8377]">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A433A] leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Product Reference */}
                <div className="pt-2">
                  <span className="text-[11px] text-[#70685E] block">
                    Peça adquirida:
                  </span>
                  <span className="text-xs font-medium text-[#1E1B18]">
                    {rev.productName}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#EFEAE2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#E0D7C9]"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1E1B18]">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-[#7D756A]">{rev.city}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] text-[#2E6A3B] font-medium bg-[#EBF5ED] px-2 py-0.5 rounded-full">
                  <ThumbsUp className="w-3 h-3" />
                  Compra Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
