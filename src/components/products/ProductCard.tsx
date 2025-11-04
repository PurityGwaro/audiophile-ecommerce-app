import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  reversed?: boolean;
}

export default function ProductCard({ product, reversed = false }: ProductCardProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? "lg:grid-flow-dense" : ""}`}>
      <div className={`relative h-80 lg:h-[560px] bg-light-gray rounded-lg overflow-hidden ${reversed ? "lg:col-start-2" : ""}`}>
        <Image
          src={product.categoryImage.desktop}
          alt={product.name}
          fill
          className="object-contain p-8"
        />
      </div>
      <div className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
        {product.new && (
          <p className="text-overline uppercase tracking-[10px] text-primary mb-4">
            New Product
          </p>
        )}
        <h2 className="text-h2 md:text-h3 font-bold uppercase mb-6">
          {product.name}
        </h2>
        <p className="text-body text-dark-gray opacity-75 mb-10 leading-relaxed">
          {product.description}
        </p>
        <Link href={`/products/${product.slug}`} className="btn-primary">
          See Product
        </Link>
      </div>
    </div>
  );
}
