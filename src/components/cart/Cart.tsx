"use client";

import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { items, itemCount, subtotal, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    // Prevent body scroll when cart is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-[120px] right-6 md:right-10 lg:right-[165px] bg-white z-50 rounded-lg shadow-xl w-[90%] md:w-[380px] p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-h6 uppercase tracking-wider">
            Cart ({itemCount})
          </h2>
          <button
            onClick={clearCart}
            className="text-dark-gray hover:text-primary transition-colors underline text-body opacity-50 hover:opacity-100"
          >
            Remove all
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-gray text-body mb-4">Your cart is empty</p>
            <button
              onClick={onClose}
              className="text-primary hover:text-primary-light font-bold underline"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-light-gray rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-body">
                      {item.name.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <p className="text-dark-gray opacity-50 text-sm font-bold">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center bg-light-gray">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-2 hover:text-primary transition-colors font-bold text-subtitle"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 font-bold text-subtitle">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-2 hover:text-primary transition-colors font-bold text-subtitle"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-dark-gray opacity-50 uppercase text-body">
                Total
              </span>
              <span className="font-bold text-h6">
                $ {subtotal.toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary w-full block text-center"
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
}
