import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181614] text-[#DDD6CE] pt-16 pb-12 border-t border-[#2B2724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2723]">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-white">
              ESSÊNCIA
            </span>
            <p className="text-xs text-[#A89F95] leading-relaxed max-w-sm">
              Alfaiataria contemporânea e moda atemporal confeccionada no Brasil com fibras 100% nobres. Peças pensadas para vestir com autenticidade, durabilidade e elegância natural.
            </p>
            <div className="pt-2 text-xs text-[#7A7268] space-y-1">
              <p>Ateliê & Showroom: Alameda Santos, 1200 - Jardins, São Paulo - SP</p>
              <p>Segunda a Sexta das 9h às 19h | Sábados das 10h às 16h</p>
            </div>
          </div>

          {/* Links: Navegação */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Coleções
            </h4>
            <ul className="space-y-2 text-[#A89F95]">
              <li><a href="#catalogo" className="hover:text-white transition-colors">Linho Europeu Puro</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Alfaiataria Masculina</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Vestidos & Chemises</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Tricot & Meia-Estação</a></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Lookbook 2026</a></li>
            </ul>
          </div>

          {/* Links: Atendimento */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Atendimento
            </h4>
            <ul className="space-y-2 text-[#A89F95]">
              <li><a href="#hero" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Trocas & Devoluções (Grátis)</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Rastreamento de Pedido</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Guia de Cuidados com o Linho</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Fale Conosco (WhatsApp)</a></li>
            </ul>
          </div>

          {/* Links: Segurança e Pagamento */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Segurança & Selos
            </h4>
            <div className="space-y-2 text-[#A89F95]">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#388E3C]" />
                <span>Certificado SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#388E3C]" />
                <span>Compra 100% Protegida</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#388E3C]" />
                <span>1ª Troca Grátis em 30 Dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#388E3C]" />
                <span>Entrega Rastreável</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8177]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#696259]">Formas de Pagamento:</span>
            <span className="px-2 py-0.5 bg-[#25221F] rounded text-[10px] text-[#DDD6CE]">Pix (5% OFF)</span>
            <span className="px-2 py-0.5 bg-[#25221F] rounded text-[10px] text-[#DDD6CE]">Visa</span>
            <span className="px-2 py-0.5 bg-[#25221F] rounded text-[10px] text-[#DDD6CE]">Mastercard</span>
            <span className="px-2 py-0.5 bg-[#25221F] rounded text-[10px] text-[#DDD6CE]">Elo</span>
            <span className="px-2 py-0.5 bg-[#25221F] rounded text-[10px] text-[#DDD6CE]">Boleto Bancário</span>
          </div>

          <p className="text-center sm:text-right text-[11px]">
            © {new Date().getFullYear()} Essência Moda & Alfaiataria Ltda. CNPJ: 45.291.890/0001-34. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};
