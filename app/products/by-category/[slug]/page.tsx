"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  images: { src: string; alt?: string }[];
};

export default function CategoryProducts() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      try {
       const categoryIdMap: Record<string, number> = {
        "special-drops": 185,
        "earrings": 20,
        "gift-box": 21,
        "chain-pendant": 184,
        "any-9-earrings": 181,
        "any-5-earrings": 182,
        "any-12-earrings": 183,
        };


        const categoryId = categoryIdMap[slug as string];
        const res = await fetch(`/api/products/by-category?id=${categoryId}`);

        const data = await res.json();
        console.log("Fetched products:", data); // ✅ check in console

        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Loading products...
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </main>
    );

  if (!products.length)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        No products found in this category.
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">{slug}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-sm hover:shadow-md p-4 transition"
          >
            <img
              src={p.images?.[0]?.src || "/placeholder.png"}
              alt={p.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-sm font-medium line-clamp-2">{p.name}</h2>
            <p className="text-[#c22757] font-bold mt-1">₹{p.price}</p>
            <button
              onClick={() => addToCart({ ...p, category: slug as string })}
              className="bg-[#c22757] text-white w-full rounded-full py-2 text-sm mt-2 hover:bg-[#a01e48] transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
