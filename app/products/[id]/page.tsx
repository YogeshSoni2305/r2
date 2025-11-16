import { notFound } from "next/navigation";
import ProductClient from "../../..//components/ProductClient";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  images: { src: string; alt?: string }[];
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
  const key = process.env.NEXT_PUBLIC_WC_KEY!;
  const secret = process.env.NEXT_PUBLIC_WC_SECRET!;

  const res = await fetch(
    `${baseUrl}/wp-json/wc/v3/products/${id}?consumer_key=${key}&consumer_secret=${secret}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return <ProductClient product={product} />;
}
