"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { useCart } from "@/contexts/CartContext";

interface OrderSuccessModalProps {
  isOpen: boolean;
  items: CartItem[];
  grandTotal: number;
}

export default function OrderSuccessModal({
  isOpen,
  items,
  grandTotal,
}: OrderSuccessModalProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  if (!isOpen) return null;

  const firstItem = items[0];
  const otherItemsCount = items.length - 1;

  const handleBackToHome = () => {
    clearCart();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-md w-full p-8 md:p-12">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
          THANK YOU
          <br />
          FOR YOUR ORDER
        </h2>

        <p className="text-dark-gray text-sm mb-6">
          You will receive an email confirmation shortly.
        </p>

        <div className="mb-8 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#F1F1F1] p-6 flex-1">
              {firstItem && (
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={firstItem.image}
                      alt={firstItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-6">
                      <p className="font-bold text-sm uppercase">
                        {firstItem.name.split(" ")[0]}
                      </p>
                      <p className="text-dark-gray font-bold text-sm opacity-50 flex-shrink-0">
                        x{firstItem.quantity}
                      </p>
                    </div>
                    <p className="text-dark-gray text-sm opacity-50 font-bold whitespace-nowrap">
                      $ {firstItem.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {otherItemsCount > 0 && (
                <>
                  <hr className="border-dark-gray/20 my-3" />
                  <p className="text-dark-gray text-xs text-center font-bold opacity-50">
                    and {otherItemsCount} other item(s)
                  </p>
                </>
              )}
            </div>

            <div className="bg-black p-6 flex flex-col justify-center md:min-w-[200px]">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                GRAND TOTAL
              </p>
              <p className="text-white font-bold text-lg">
                $ {Math.round(grandTotal).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleBackToHome}
          className="w-full bg-primary text-white font-bold text-sm tracking-wider py-4 hover:bg-primary-hover transition-colors"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}
