import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing category ID" }, { status: 400 });

    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
    const key = process.env.NEXT_PUBLIC_WC_KEY!;
    const secret = process.env.NEXT_PUBLIC_WC_SECRET!;

    console.log("🔍 Fetching products for category ID:", id);

    const prodUrl = `${baseUrl}/wp-json/wc/v3/products?category=${id}&status=publish&per_page=20&consumer_key=${key}&consumer_secret=${secret}`;
    const prodRes = await fetch(prodUrl, { cache: "no-store" });

    if (!prodRes.ok) throw new Error(`WooCommerce fetch failed: ${prodRes.status}`);

    const products = await prodRes.json();
    console.log(`✅ Woo returned ${products.length} products for ID ${id}`);

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("❌ Woo API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
