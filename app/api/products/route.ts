import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
    const key = process.env.NEXT_PUBLIC_WC_KEY!;
    const secret = process.env.NEXT_PUBLIC_WC_SECRET!;

    const res = await fetch(
      `${baseUrl}/wp-json/wc/v3/products?status=publish&per_page=30&consumer_key=${key}&consumer_secret=${secret}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error(`WooCommerce fetch failed: ${res.status}`);

    const products = await res.json();
    console.log(`✅ Woo returned ${products.length} products`);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("❌ WooCommerce API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
