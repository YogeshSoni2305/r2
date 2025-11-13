import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { customer, cart } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
    const key = process.env.NEXT_PUBLIC_WC_KEY!;
    const secret = process.env.NEXT_PUBLIC_WC_SECRET!;

    const orderData = {
      payment_method: "razorpay",
      payment_method_title: "Razorpay",
      set_paid: false,
      billing: customer,
      shipping: customer,
      line_items: cart.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    const res = await fetch(
      `${baseUrl}/wp-json/wc/v3/orders?consumer_key=${key}&consumer_secret=${secret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }
    );

    if (!res.ok) throw new Error(`WooCommerce API error: ${res.statusText}`);
    const data = await res.json();

    return NextResponse.json({ id: data.id });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
