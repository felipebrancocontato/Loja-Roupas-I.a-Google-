import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenFittingGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenFittingGuide
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Coleção', href: '#catalogo', category: 'todos' },
    { label: 'Feminino', href: '#catalogo', category: 'feminino' },
    { label: 'Masculino', href: '#catalogo', category: 'masculino' },
    { label: 'Linho Puro', href: '#catalogo', category: 'linho' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Depoimentos', href: '#depoimentos' }
  ];

  const handleLinkClick = (href: string, category?: string) => {
    setIsMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Announcement Bar */}
      <div id="announcement-bar" className="bg-[#231F1C] text-[#EFEBE6] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          Frete grátis para todo o Brasil em compras a partir de R$ 299
        </span>
        <span className="hidden md:inline text-[#7D766F]">|</span>
        <span className="hidden md:inline">1ª troca grátis em até 30 dias</span>
        <span className="hidden lg:inline text-[#7D766F]">|</span>
        <span className="hidden lg:inline">Parcele em até 6x sem juros ou ganhe 5% no Pix</span>
      </div>

      {/* Main Navbar */}
      <nav
        id="main-navigation"
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-[#E8E2D9] py-3.5'
            : 'bg-[#FAF8F5] border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-button"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#231F1C] hover:bg-[#EFEAE2] rounded-md transition-colors"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              id="mobile-search-toggle"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#231F1C] hover:bg-[#EFEAE2] rounded-md transition-colors"
              aria-label="Buscar produtos"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <a
            id="brand-logo"
            href="#hero"
            className="flex flex-col items-center group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#1E1B18] group-hover:text-[#634832] transition-colors">
              ESSÊNCIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A7269] -mt-0.5">
              Moda & Alfaiataria
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#403B35]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href, link.category)}
                className="hover:text-[#9A5C32] transition-colors py-1 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9A5C32] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Buscar linho, camisa, vestido..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 lg:w-64 pl-8 pr-3 py-1.5 text-xs bg-[#F2ECE4] text-[#1E1B18] placeholder-[#8A8177] rounded-full border border-transparent focus:border-[#B5A593] focus:bg-white focus:outline-hidden transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#8A8177] absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-[#8A8177] hover:text-[#1E1B18] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Provador Virtual Quick button */}
            <button
              id="virtual-fitting-nav-button"
              type="button"
              onClick={onOpenFittingGuide}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4E3F30] bg-[#EBE3D7] hover:bg-[#DFD5C6] rounded-full transition-colors cursor-pointer"
              title="Descubra seu tamanho ideal"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Provador</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-button"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#231F1C] hover:bg-[#EFEAE2] rounded-full transition-colors cursor-pointer"
              aria-label={`Favoritos (${wishlistCount})`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#A85542] text-[#A85542]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#A85542] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Sacola Button */}
            <button
              id="cart-toggle-button"
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-[#231F1C] hover:bg-[#EFEAE2] rounded-full transition-colors flex items-center gap-1 cursor-pointer"
              aria-label={`Sacola de compras (${cartCount} itens)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#231F1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Field */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pt-3 pb-2 border-t border-[#EAE3D8] mt-2">
            <div className="relative">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Buscar por nome, tecido ou categoria..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#D5C9B8] rounded-md focus:outline-hidden focus:border-[#9A5C32]"
              />
              <Search className="w-4 h-4 text-[#8A8177] absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-[#8A8177] hover:text-[#1E1B18]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-black/40 backdrop-blur-xs z-30 flex">
          <div className="bg-[#FAF8F5] w-4/5 max-w-sm h-full p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#8C847B]">Navegação</p>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href, link.category)}
                    className="text-left text-base font-medium text-[#231F1C] hover:text-[#9A5C32] py-2 border-b border-[#EAE3D8]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFittingGuide();
                  }}
                  className="w-full py-2.5 px-4 bg-[#EBE3D7] text-[#2C241D] text-sm font-medium rounded-md flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Provador Virtual Interativo
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE3D8] text-xs text-[#7A7269] space-y-2">
              <p>Atendimento: seg a sex, das 9h às 18h</p>
              <p>WhatsApp: (11) 98765-4321</p>
              <p>contato@essenciamoda.com.br</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
