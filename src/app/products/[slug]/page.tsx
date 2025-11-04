"use client";

import { use, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import CategoryCard from "@/components/home/CategoryCard";
import BestGear from "@/components/home/BestGear";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useQuery(api.products.getBySlug, { slug: resolvedParams.slug });

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.categoryImage.mobile,
    });

    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      icon: '🛒',
    });

    setQuantity(1);
  };

  if (!product) {
    return (
      <div className="container-custom py-24 text-center">
        <p className="text-body text-dark-gray">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="container-custom pt-16 pb-8">
        <button
          onClick={() => router.back()}
          className="text-dark-gray hover:text-primary transition-colors text-body opacity-50 hover:opacity-100"
        >
          Go Back
        </button>
      </section>

      <section className="container-custom pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 lg:h-[560px] bg-light-gray rounded-lg overflow-hidden">
            <Image
              src={product.categoryImage.desktop}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
          <div>
            {product.new && (
              <p className="text-overline uppercase tracking-[10px] text-primary mb-4">
                New Product
              </p>
            )}
            <h1 className="text-h2 md:text-h3 font-bold uppercase mb-6">
              {product.name}
            </h1>
            <p className="text-body text-dark-gray opacity-75 mb-8 leading-relaxed">
              {product.description}
            </p>
            <p className="text-h6 font-bold mb-10">
              $ {product.price.toLocaleString()}
            </p>

            <div className="flex gap-4">
              <div className="flex items-center bg-light-gray">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-4 hover:text-primary transition-colors font-bold text-subtitle"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-bold text-subtitle">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-4 hover:text-primary transition-colors font-bold text-subtitle"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="lg:col-span-2">
            <h2 className="text-h3 md:text-h2 font-bold uppercase mb-8">
              Features
            </h2>
            <div className="text-body text-dark-gray opacity-75 leading-relaxed whitespace-pre-line">
              {product.features}
            </div>
          </div>
          <div>
            <h2 className="text-h3 md:text-h2 font-bold uppercase mb-8">
              In The Box
            </h2>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex gap-6">
                  <span className="text-primary font-bold">{item.quantity}x</span>
                  <span className="text-body text-dark-gray opacity-75">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-custom pb-16 md:pb-24">
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <div className="space-y-4 lg:space-y-8">
            <div className="relative h-64 lg:h-80 bg-light-gray rounded-lg overflow-hidden">
              <Image
                src={product.gallery.first.desktop}
                alt={`${product.name} gallery image 1`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 lg:h-80 bg-light-gray rounded-lg overflow-hidden">
              <Image
                src={product.gallery.second.desktop}
                alt={`${product.name} gallery image 2`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative h-full min-h-[536px] lg:min-h-[672px] bg-light-gray rounded-lg overflow-hidden">
            <Image
              src={product.gallery.third.desktop}
              alt={`${product.name} gallery image 3`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-custom pb-16 md:pb-24">
        <h2 className="text-h3 md:text-h2 font-bold uppercase text-center mb-12">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {product.others.map((related) => (
            <div key={related.slug} className="text-center">
              <div className="relative h-80 bg-light-gray rounded-lg overflow-hidden mb-8">
                <Image
                  src={related.image.desktop}
                  alt={related.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <h3 className="text-h5 font-bold uppercase mb-8">
                {related.name}
              </h3>
              <Link href={`/products/${related.slug}`} className="btn-primary">
                See Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <CategoryCard
            title="Headphones"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
            link="/category/headphones"
          />
          <CategoryCard
            title="Speakers"
            image="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop"
            link="/category/speakers"
          />
          <CategoryCard
            title="Earphones"
            image="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop"
            link="/category/earphones"
          />
        </div>
      </section>

      <BestGear />
    </div>
  );
}
