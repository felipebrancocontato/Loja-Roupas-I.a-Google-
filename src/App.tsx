import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, ProductColor, ProductSize, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { LookbookSection } from './components/LookbookSection';
import { BrandValues } from './components/BrandValues';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { VirtualFittingModal } from './components/VirtualFittingModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  // Local storage loaded initial state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('essencia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('essencia_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFittingGuideOpen, setIsFittingGuideOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('essencia_cart', JSON.stringify(cartItems));
    } catch {
      // safe fallback
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('essencia_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // safe fallback
    }
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: itemId, product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0], product.colors[0], 1);
    handleToggleWishlist(product);
    setIsCartOpen(true);
  };

  // Coupon handling
  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BEMVINDO10') {
      setAppliedCoupon({ code: 'BEMVINDO10', discountPercent: 10 });
      return true;
    }
    if (cleanCode === 'PRIMEIRA15') {
      setAppliedCoupon({ code: 'PRIMEIRA15', discountPercent: 15 });
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Lookbook "Compre o Look" all items
  const handleAddLookToCart = (productsToAdd: Product[]) => {
    productsToAdd.forEach((p) => {
      handleAddToCart(p, p.sizes[0], p.colors[0], 1);
    });
    setIsCartOpen(true);
  };

  // Scroll to catalog helper
  const handleExploreClick = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18] antialiased selection:bg-[#E2D4C3]">
      {/* Header & Sticky Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleExploreClick();
        }}
        onOpenFittingGuide={() => setIsFittingGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onOpenFittingGuide={() => setIsFittingGuideOpen(true)}
        />

        {/* Product Catalog Vitrine */}
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, size, col) => handleAddToCart(p, size, col, 1)}
        />

        {/* Lookbook / Shop the Look */}
        <LookbookSection
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddLookToCart={handleAddLookToCart}
        />

        {/* Brand Values & Pillars */}
        <BrandValues />

        {/* Verified Customer Reviews */}
        <CustomerReviews />

        {/* Newsletter & Club VIP */}
        <Newsletter
          onCouponGenerated={(code) => {
            setAppliedCoupon({ code, discountPercent: 15 });
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, sz, col, qty) => handleAddToCart(p, sz, col, qty)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenFittingGuide={() => {
          setQuickViewProduct(null);
          setIsFittingGuideOpen(true);
        }}
      />

      {/* Shopping Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Virtual Fitting Assistant Modal */}
      <VirtualFittingModal
        isOpen={isFittingGuideOpen}
        onClose={() => setIsFittingGuideOpen(false)}
        onApplySize={(size) => {
          handleExploreClick();
        }}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={() => {
          setCartItems([]);
          try {
            localStorage.removeItem('essencia_cart');
          } catch {
            // safe
          }
        }}
      />
    </div>
  );
}
