"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/CartContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import OrderSuccessModal from "@/components/checkout/OrderSuccessModal";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  paymentMethod: z.enum(["cash", "emoney"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "emoney") {
    return data.eMoneyNumber && data.eMoneyPin;
  }
  return true;
}, {
  message: "e-Money details are required",
  path: ["eMoneyNumber"],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const createOrder = useMutation(api.orders.create);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "emoney",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const shipping = 50;
  const vat = subtotal * 0.2;
  const grandTotal = subtotal + shipping + vat;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing your order...");

    try {
      const orderId = `ORD-${Date.now()}`;

      await createOrder({
        orderId,
        status: "pending",
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        shippingAddress: {
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        vat,
        grandTotal,
        createdAt: Date.now(),
      });

      const emailResponse = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: data.name,
          customerEmail: data.email,
          items,
          grandTotal,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success === false) {
        toast.success("Order placed successfully! (Email notification failed)", {
          id: loadingToast,
          duration: 3000
        });
      } else {
        toast.success("Order placed successfully!", { id: loadingToast, duration: 2000 });
      }

      setShowSuccessModal(true);
    } catch (error) {
      toast.error("Failed to create order. Please try again.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 text-center">
        <h1 className="text-h2 font-bold uppercase mb-8">Your cart is empty</h1>
        <Link href="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light-gray min-h-screen py-16">
      <div className="container-custom">
        <button
          onClick={() => router.back()}
          className="text-dark-gray hover:text-primary transition-colors text-body opacity-50 hover:opacity-100 mb-8"
        >
          Go Back
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg p-8 lg:p-12">
              <h1 className="text-h3 md:text-h2 font-bold uppercase mb-10">
                Checkout
              </h1>

              <div className="mb-12">
                <h2 className="text-subtitle uppercase text-primary font-bold mb-6">
                  Billing Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2">Name</label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Alexei Ward"
                      className={`input-field ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && (
                      <p className="error-message">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="alexei@mail.com"
                      className={`input-field ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 202-555-0136"
                      className={`input-field ${errors.phone ? "input-error" : ""}`}
                    />
                    {errors.phone && (
                      <p className="error-message">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-subtitle uppercase text-primary font-bold mb-6">
                  Shipping Info
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2">
                      Address
                    </label>
                    <input
                      {...register("address")}
                      type="text"
                      placeholder="1137 Williams Avenue"
                      className={`input-field ${errors.address ? "input-error" : ""}`}
                    />
                    {errors.address && (
                      <p className="error-message">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold mb-2">
                        ZIP Code
                      </label>
                      <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="10001"
                        className={`input-field ${errors.zipCode ? "input-error" : ""}`}
                      />
                      {errors.zipCode && (
                        <p className="error-message">{errors.zipCode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">City</label>
                      <input
                        {...register("city")}
                        type="text"
                        placeholder="New York"
                        className={`input-field ${errors.city ? "input-error" : ""}`}
                      />
                      {errors.city && (
                        <p className="error-message">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">
                        Country
                      </label>
                      <input
                        {...register("country")}
                        type="text"
                        placeholder="United States"
                        className={`input-field ${errors.country ? "input-error" : ""}`}
                      />
                      {errors.country && (
                        <p className="error-message">{errors.country.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-subtitle uppercase text-primary font-bold mb-6">
                  Payment Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-4">
                      Payment Method
                    </label>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 border border-medium-gray rounded-lg p-4 cursor-pointer hover:border-primary">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="emoney"
                        className="w-5 h-5 accent-primary"
                      />
                      <span className="font-bold text-sm">e-Money</span>
                    </label>
                    <label className="flex items-center gap-4 border border-medium-gray rounded-lg p-4 cursor-pointer hover:border-primary">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="cash"
                        className="w-5 h-5 accent-primary"
                      />
                      <span className="font-bold text-sm">Cash on Delivery</span>
                    </label>
                  </div>

                  {paymentMethod === "emoney" && (
                    <>
                      <div>
                        <label className="block text-xs font-bold mb-2">
                          e-Money Number
                        </label>
                        <input
                          {...register("eMoneyNumber")}
                          type="text"
                          placeholder="238521993"
                          className={`input-field ${errors.eMoneyNumber ? "input-error" : ""}`}
                        />
                        {errors.eMoneyNumber && (
                          <p className="error-message">
                            {errors.eMoneyNumber.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-2">
                          e-Money PIN
                        </label>
                        <input
                          {...register("eMoneyPin")}
                          type="text"
                          placeholder="6891"
                          className={`input-field ${errors.eMoneyPin ? "input-error" : ""}`}
                        />
                        {errors.eMoneyPin && (
                          <p className="error-message">
                            {errors.eMoneyPin.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {paymentMethod === "cash" && (
                  <div className="mt-6 flex gap-6">
                    <div className="flex-shrink-0">
                      <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.407-1.406h-5.404a17.658 17.658 0 0 1 9.606-2.813h4.33a1.406 1.406 0 0 0 0-2.812h-4.33c-5.277 0-10.33 2.02-14.142 5.625h-8.34c-.777 0-1.407.63-1.407 1.406v9.938H9.844c-.777 0-1.406.63-1.406 1.406v15.6a14.053 14.053 0 0 0-7.824 3.089 1.406 1.406 0 1 0 1.772 2.185 11.226 11.226 0 0 1 7.048-2.499h3.129c.775 0 1.406.63 1.406 1.406 0 .776-.631 1.407-1.406 1.407H8.436a1.406 1.406 0 0 0 0 2.812h4.13c2.179 0 3.96-1.556 4.218-3.616h21.903c.26 2.059 2.039 3.616 4.218 3.616h4.129a1.406 1.406 0 0 0 0-2.813h-4.13c-.774 0-1.406-.63-1.406-1.406 0-.776.632-1.407 1.407-1.407h3.129c2.876 0 5.548.997 7.048 2.499a1.406 1.406 0 1 0 1.772-2.185 14.053 14.053 0 0 0-7.824-3.089v-15.6c0-.776-.63-1.406-1.407-1.406h-9.984V9.844h4.33c.178.001.355.03.53.085l-2.558 3.608a1.406 1.406 0 0 0 .327 1.962c.162.115.353.18.548.186a1.406 1.406 0 0 0 1.134-.588l2.694-3.674h-2.846c-.777 0-1.407-.63-1.407-1.406 0-.777.63-1.407 1.407-1.407h9.938c.777 0 1.407.63 1.407 1.407 0 .776-.63 1.406-1.407 1.406h-2.846l2.694 3.674a1.406 1.406 0 0 0 2.136-.186 1.406 1.406 0 0 0 .327-1.962l-2.558-3.608c.174-.056.352-.085.53-.085h4.33a1.406 1.406 0 0 0 0-2.813ZM33.61 17.969v15.6H14.39v-15.6h19.219Z"
                          fill="#D87D4A"
                          fillRule="nonzero"
                        />
                      </svg>
                    </div>
                    <p className="text-body text-dark-gray opacity-75 leading-relaxed">
                      The `Cash on Delivery` option enables you to pay in cash when
                      our delivery courier arrives at your residence. Just make sure
                      your address is correct so that your order will not be
                      cancelled.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 h-fit">
              <h2 className="text-h6 uppercase font-bold mb-8">Summary</h2>

              <div className="space-y-6 mb-8">
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
                    <p className="text-dark-gray opacity-50 text-body font-bold">
                      x{item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-dark-gray opacity-50 uppercase text-body">
                    Total
                  </span>
                  <span className="font-bold text-h6">
                    $ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-gray opacity-50 uppercase text-body">
                    Shipping
                  </span>
                  <span className="font-bold text-h6">
                    $ {shipping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-gray opacity-50 uppercase text-body">
                    VAT (Included)
                  </span>
                  <span className="font-bold text-h6">
                    $ {Math.round(vat).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-dark-gray opacity-50 uppercase text-body">
                  Grand Total
                </span>
                <span className="font-bold text-h6 text-primary">
                  $ {Math.round(grandTotal).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Continue & Pay"}
              </button>
            </div>
          </div>
        </form>

        <OrderSuccessModal
          isOpen={showSuccessModal}
          items={items}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
