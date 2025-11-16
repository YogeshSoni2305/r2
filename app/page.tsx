import React from "react";
import Image from "next/image";
import CategoryCarousel from "../components/CategoryCarousel";
import NewArrivals from "../components/newarrivals";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center overflow-x-hidden">

      {/* Categories (centered) */}
      <div className="w-full max-w-7xl px-4">
        <CategoryCarousel />
      </div>

      {/* Full-width responsive banner */}
      <div className="w-full">
        <Image
          src="/images/banner.jpg"
          alt="Ratnaasya Jewellery Banner"
          width={1920}
          height={700}
          priority
          sizes="100vw"
          className="
            w-full 
            h-[220px]          /* mobile */
            sm:h-[300px]       /* tablets */
            md:h-auto          /* desktop uses natural ratio */
            object-cover 
            object-center
          "
        />
      </div>

      {/* Centered content */}
      <div className="w-full max-w-7xl px-4">
        <NewArrivals />
      </div>

    </main>
  );
}
