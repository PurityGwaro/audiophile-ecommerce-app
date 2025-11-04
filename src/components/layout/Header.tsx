"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Cart from "@/components/cart/Cart";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-secondary text-white relative z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between py-8 border-b border-white/10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="text-2xl font-bold tracking-wider">
              audiophile
            </Link>

            <nav className="hidden lg:flex gap-8">
              <Link
                href="/"
                className="text-subtitle uppercase tracking-widest hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/category/headphones"
                className="text-subtitle uppercase tracking-widest hover:text-primary transition-colors"
              >
                Headphones
              </Link>
              <Link
                href="/category/speakers"
                className="text-subtitle uppercase tracking-widest hover:text-primary transition-colors"
              >
                Speakers
              </Link>
              <Link
                href="/category/earphones"
                className="text-subtitle uppercase tracking-widest hover:text-primary transition-colors"
              >
                Earphones
              </Link>
            </nav>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
      )}

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
