"use client";

import { use, Suspense } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const order = useQuery(
    api.orders.getByOrderId,
    orderId ? { orderId } : "skip"
  );

  if (!orderId) {
    return (
      <div className="container-custom py-24 text-center">
        <h1 className="text-h2 font-bold uppercase mb-8">Order Not Found</h1>
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-24 text-center">
        <p className="text-body text-dark-gray">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="bg-light-gray min-h-screen py-16">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg p-8 lg:p-12">
          <div className="mb-8">
            <CheckCircle size={64} className="text-primary mx-auto" />
          </div>

          <h1 className="text-h3 md:text-h2 font-bold uppercase mb-4">
            Thank You <br /> For Your Order
          </h1>
          <p className="text-body text-dark-gray opacity-75 mb-8">
            You will receive an email confirmation shortly.
          </p>

          <div className="bg-light-gray rounded-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-dark-gray opacity-50 uppercase text-subtitle">
                  Order ID
                </span>
                <span className="font-bold text-body">{order.orderId}</span>
              </div>

              {order.items.length > 0 && (
                <div className="flex items-center gap-4 py-4">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.items[0].image}
                      alt={order.items[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-body">
                      {order.items[0].name.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <p className="text-dark-gray opacity-50 text-sm font-bold">
                      $ {order.items[0].price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-dark-gray opacity-50 text-body font-bold">
                    x{order.items[0].quantity}
                  </p>
                </div>
              )}

              {order.items.length > 1 && (
                <div className="pt-4 border-t border-white">
                  <p className="text-center text-dark-gray opacity-50 text-xs font-bold">
                    and {order.items.length - 1} other item(s)
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-secondary text-white">
              <p className="text-white/50 uppercase text-body mb-2">
                Grand Total
              </p>
              <p className="font-bold text-h6">
                $ {Math.round(order.grandTotal).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-light-gray rounded-lg">
            <h2 className="text-subtitle uppercase font-bold mb-4">
              Shipping Address
            </h2>
            <p className="text-body text-dark-gray">
              {order.customerName}
              <br />
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-subtitle uppercase font-bold mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 p-4 bg-light-gray rounded-lg">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-body">
                      {item.name}
                    </h3>
                    <p className="text-dark-gray opacity-50 text-sm font-bold">
                      $ {item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-body">
                    $ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-8 p-6 bg-light-gray rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-dark-gray opacity-50 uppercase text-body">
                Subtotal
              </span>
              <span className="font-bold text-body">
                $ {order.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray opacity-50 uppercase text-body">
                Shipping
              </span>
              <span className="font-bold text-body">
                $ {order.shipping.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray opacity-50 uppercase text-body">
                VAT (Included)
              </span>
              <span className="font-bold text-body">
                $ {Math.round(order.vat).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white">
              <span className="text-dark-gray opacity-50 uppercase text-body">
                Grand Total
              </span>
              <span className="font-bold text-h6 text-primary">
                $ {Math.round(order.grandTotal).toLocaleString()}
              </span>
            </div>
          </div>

          <Link href="/" className="btn-primary w-full block text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-24 text-center">
        <p className="text-body text-dark-gray">Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
