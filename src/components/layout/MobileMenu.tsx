"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed top-[89px] left-0 right-0 bg-white z-50 lg:hidden rounded-b-lg shadow-xl">
        <nav className="container-custom py-8 flex flex-col gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-subtitle uppercase tracking-widest font-bold hover:text-primary transition-colors py-3"
          >
            Home
          </Link>
          <Link
            href="/category/headphones"
            onClick={onClose}
            className="text-subtitle uppercase tracking-widest font-bold hover:text-primary transition-colors py-3"
          >
            Headphones
          </Link>
          <Link
            href="/category/speakers"
            onClick={onClose}
            className="text-subtitle uppercase tracking-widest font-bold hover:text-primary transition-colors py-3"
          >
            Speakers
          </Link>
          <Link
            href="/category/earphones"
            onClick={onClose}
            className="text-subtitle uppercase tracking-widest font-bold hover:text-primary transition-colors py-3"
          >
            Earphones
          </Link>
        </nav>
      </div>
    </>
  );
}
