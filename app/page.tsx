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

      {/* Full-bleed banner (safe, no layout hack) */}
      <div className="w-full">
        <div className="w-full">
          <Image
            src="/images/banner.jpg"
            alt="Ratnaasya Jewellery Banner"
            width={1920}
            height={700}
            priority
            sizes="100vw"
            className="w-full h-auto object-contain object-center"
          />
        </div>
      </div>

      {/* Centered page content continues */}
      <div className="w-full max-w-7xl px-4">
        <NewArrivals />
      </div>
    </main>
  );
}
