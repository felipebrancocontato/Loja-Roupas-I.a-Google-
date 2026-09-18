import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';

interface NewsletterProps {
  onCouponGenerated: (code: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onCouponGenerated }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const couponCode = 'PRIMEIRA15';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubmitted(true);
    onCouponGenerated(couponCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-[#231F1C] text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Clube de Membros Essência
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
          Receba 15% OFF no Seu Primeiro Pedido
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-[#C4BCB3] max-w-xl mx-auto leading-relaxed">
          Assine nossa newsletter para receber em primeira mão o lançamento das coleções sazonais, editoriais de estilo e acesso antecipado às nossas vendas privadas.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 bg-[#347A46] text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-white">Bem-vindo(a) ao Clube!</h4>
            <p className="text-xs text-[#DDD6CE]">
              Utilize o cupom abaixo na sua sacola de compras para garantir 15% de desconto imediato:
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="px-4 py-2 bg-white text-[#1E1B18] font-mono font-bold tracking-widest text-sm rounded-lg">
                {couponCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer"
                title="Copiar cupom"
              >
                {copied ? <Check className="w-4 h-4 text-[#75DF91]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-[#9C948B] rounded-lg border border-white/20 focus:outline-hidden focus:border-white text-xs sm:text-sm"
              />
              <Mail className="w-4 h-4 text-[#9C948B] absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#1E1B18] hover:bg-[#F2ECE3] font-medium text-xs sm:text-sm tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Garantir 15% OFF
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-[#8C8377]">
          Sem spam. Você pode cancelar sua inscrição a qualquer instante com um clique.
        </p>

      </div>
    </section>
  );
};
