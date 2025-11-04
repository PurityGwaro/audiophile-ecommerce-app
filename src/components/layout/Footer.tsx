import Link from "next/link";
import { Facebook, X, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container-custom py-16">
        <div className="h-1 w-24 bg-primary mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wider inline-block mb-8">
              audiophile
            </Link>
            <p className="text-white/50 text-body max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>

          <nav className="flex flex-col gap-4 lg:col-span-2 lg:items-end">
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
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-8">
          <p className="text-white/50 text-body">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <X size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
