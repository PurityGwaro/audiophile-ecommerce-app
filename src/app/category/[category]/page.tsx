"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ProductCard from "@/components/products/ProductCard";
import CategoryCard from "@/components/home/CategoryCard";
import BestGear from "@/components/home/BestGear";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const category = resolvedParams.category as "headphones" | "speakers" | "earphones";

  const products = useQuery(api.products.getByCategory, { category });

  return (
    <div>
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-h2 md:text-h1 font-bold uppercase text-center">
            {category}
          </h1>
        </div>
      </section>

      <section className="container-custom py-16 md:py-24">
        {!products ? (
          <div className="text-center py-12">
            <p className="text-body text-dark-gray">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-body text-dark-gray">No products found in this category.</p>
          </div>
        ) : (
          <div className="space-y-24 lg:space-y-32">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        )}
      </section>

      <section className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <CategoryCard
            title="Headphones"
            image="/images/product1-headphones.png"
            link="/category/headphones"
          />
          <CategoryCard
            title="Speakers"
            image="/images/product2-speaker.png"
            link="/category/speakers"
          />
          <CategoryCard
            title="Earphones"
            image="/images/product3-speaker.png"
            link="/category/earphones"
          />
        </div>
      </section>

      <BestGear />
    </div>
  );
}
