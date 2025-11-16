"use client";

export const dynamic = "force-dynamic";  // ← FIX FOR VERCEL BUILD

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("order_id");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-gray-700 mb-2">Your order has been placed successfully.</p>
      <p className="text-gray-500">Order ID: {orderId}</p>
      <a
        href="/account"
        className="mt-6 px-6 py-3 bg-[#c22757] text-white rounded-full hover:bg-[#a01e48]"
      >
        View My Orders
      </a>
    </main>
  );
}
