import Link from "next/link";
import Image from "next/image";
import CategoryCard from "@/components/home/CategoryCard";
import BestGear from "@/components/home/BestGear";

export default function Home() {
  return (
    <div>
      <section className="bg-[#121212] text-white">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-overline uppercase tracking-[10px] text-white/50 mb-6">
                New Product
              </p>
              <h1 className="text-4xl md:text-h1 font-bold uppercase mb-6 leading-tight">
                XX99 Mark II Headphones
              </h1>
              <p className="text-body text-white/75 mb-10 leading-relaxed">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Link href="/products/xx99-mark-two-headphones" className="btn-primary">
                See Product
              </Link>
            </div>
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src="/images/heroimage.png"
                alt="XX99 Mark II Headphones"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
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

      <section className="container-custom mb-16 md:mb-24">
        <div className="bg-primary rounded-lg overflow-hidden mb-8 lg:mb-12 p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 relative w-full h-64 lg:h-96">
            <Image
              src="/images/zx9-speaker.png"
              alt="ZX9 Speaker"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-h2 md:text-h1 font-bold uppercase mb-6 text-white">
              ZX9 Speaker
            </h2>
            <p className="text-body text-white/75 mb-10 max-w-sm mx-auto lg:mx-0">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link href="/products/zx9-speaker" className="btn-secondary bg-secondary text-white hover:bg-dark-gray inline-block">
              See Product
            </Link>
          </div>
        </div>

        <div className="bg-[#a4a4a4] rounded-lg overflow-hidden mb-8 lg:mb-12 relative min-h-[320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            <div className="p-12 lg:p-24">
              <h2 className="text-h4 font-bold uppercase mb-8">ZX7 Speaker</h2>
              <Link href="/products/zx7-speaker" className="btn-secondary">
                See Product
              </Link>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src="/images/speaker-zx7.png"
                alt="ZX7 Speaker"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-light-gray rounded-lg h-64 relative overflow-hidden">
            <Image
              src="/images/YX1-earphones.png"
              alt="YX1 Earphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-[#f1f1f1] rounded-lg p-12 flex flex-col justify-center">
            <h2 className="text-h4 font-bold uppercase mb-8">YX1 Earphones</h2>
            <Link href="/products/yx1-earphones" className="btn-secondary inline-block w-fit">
              See Product
            </Link>
          </div>
        </div>
      </section>

      <BestGear />
    </div>
  );
}
