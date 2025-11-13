import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId, paymentId } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!;
    const key = process.env.NEXT_PUBLIC_WC_KEY!;
    const secret = process.env.NEXT_PUBLIC_WC_SECRET!;

    const res = await fetch(
      `${baseUrl}/wp-json/wc/v3/orders/${orderId}?consumer_key=${key}&consumer_secret=${secret}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set_paid: true,
          status: "processing",
          meta_data: [{ key: "razorpay_payment_id", value: paymentId }],
        }),
      }
    );

    if (!res.ok) throw new Error(`Failed to update order`);
    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Mark order paid error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
