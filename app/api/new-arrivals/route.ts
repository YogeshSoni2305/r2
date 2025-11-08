import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WC_URL;
    const consumerKey = process.env.NEXT_PUBLIC_WC_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET;

    if (!baseUrl || !consumerKey || !consumerSecret) {
      throw new Error("Missing WooCommerce environment variables");
    }

    // IDs of your “New Arrival” products
    const newArrivalIDs = [629, 627, 625, 623];

    const url = `${baseUrl}/wp-json/wc/v3/products?include=${newArrivalIDs.join(
      ","
    )}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("WooCommerce Fetch Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch new arrivals" },
      { status: 500 }
    );
  }
}
