"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  images: { src: string; alt?: string }[];
};

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(
    product.images?.[0]?.src || "/placeholder.png"
  );

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:w-24 no-scrollbar">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt || product.name}
                className="w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-[#c22757]"
                onClick={() => setMainImage(img.src)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            {product.regular_price && (
              <span className="text-gray-500 line-through">
                ₹{product.regular_price}
              </span>
            )}
            <span className="text-2xl font-bold text-[#c22757]">
              ₹{product.price}
            </span>
          </div>

          <div
            className="mt-4 text-gray-700 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <button
            onClick={() => addToCart(product)}
            className="bg-[#c22757] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a01e48] transition w-full mt-6"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
