import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

export default function CategoryCard({ title, image, link }: CategoryCardProps) {
  return (
    <Link
      href={link}
      className="bg-light-gray rounded-lg p-6 pt-20 text-center group hover:scale-105 transition-transform duration-200 relative"
    >
      <div className="relative w-32 h-32 mx-auto -mt-24 mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-h6 uppercase font-bold mb-4">{title}</h3>
      <div className="flex items-center justify-center gap-2 text-dark-gray group-hover:text-primary transition-colors">
        <span className="text-subtitle uppercase font-bold">Shop</span>
        <ChevronRight size={16} className="text-primary" />
      </div>
    </Link>
  );
}
