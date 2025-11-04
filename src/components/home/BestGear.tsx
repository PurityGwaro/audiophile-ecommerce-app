import Image from "next/image";

export default function BestGear() {
  return (
    <section className="container-custom mb-20 lg:mb-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-h2 md:text-h3 font-bold uppercase mb-8">
            Bringing you the <span className="text-primary">best</span> audio gear
          </h2>
          <p className="text-body text-dark-gray opacity-75 leading-relaxed">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <div className="order-1 lg:order-2 relative h-80 lg:h-[560px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop"
            alt="Person listening to audio"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
