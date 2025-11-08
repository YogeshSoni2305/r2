"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  images: { src: string; alt?: string }[];
  price: string;
  regular_price: string;
  on_sale: boolean;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[280px] snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-4 aspect-square group">
        {product.on_sale && (
          <span className="absolute top-3 left-3 z-10 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Sale
          </span>
        )}
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0]?.src || "/placeholder.png"}
            alt={product.images[0]?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          />
        </Link>
        <div
          className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <button className="h-10 w-10 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:scale-110 transition-all">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
          <button className="h-10 w-10 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:scale-110 transition-all">
            <Eye className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="space-y-2 px-1">
        <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.on_sale && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {product.regular_price}
            </span>
          )}
          <span className="text-base font-semibold text-red-600">
            Rs. {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

const NewArrivals: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/new-arrivals", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrowVisibility);
      updateArrowVisibility();
      return () => container.removeEventListener("scroll", updateArrowVisibility);
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-center text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <div className="h-1 w-24 bg-gray-900 mt-2" />
        </div>
        <a
          href="/products"
          className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-4 transition-colors"
        >
          View All
        </a>
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] snap-start animate-pulse"
                >
                  <div className="bg-gray-200 rounded-lg aspect-square mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
