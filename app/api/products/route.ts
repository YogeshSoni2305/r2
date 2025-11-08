import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
const consumerKey = process.env.NEXT_PUBLIC_WC_KEY!;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET!;

export async function GET() {
  const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return NextResponse.json(data);
}
