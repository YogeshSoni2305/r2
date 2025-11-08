"use client";

import React, { useEffect, useState } from "react";
import { Heart, Eye } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link"; 

type Product = {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  on_sale: boolean;
  images: { src: string; alt?: string }[];
};

const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({
  product,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[280px] flex flex-col mx-auto transition-all hover:shadow-md"
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
          <Image
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            sizes="(max-width: 768px) 100vw, 25vw"
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

      <div className="space-y-2 px-1 text-center">
        <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          {product.on_sale && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.regular_price}
            </span>
          )}
          <span className="text-base font-semibold text-[#c22757]">
            ₹{product.price}
          </span>
        </div>

        <button
          onClick={onAddToCart}
          className="w-full bg-[#c22757] text-white text-sm font-semibold py-2 rounded-full hover:bg-[#a01e48] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/products", { cache: "no-store" });
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

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading products...
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </main>
    );

  return (
    <main className="min-h-screen bg-[#fafafa] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          All Products
        </h1>

        {/* ✅ 4 products per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
