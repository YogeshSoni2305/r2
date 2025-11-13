"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    city: "",
    state: "",
    postcode: "",
  });

  // ✅ Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError("Failed to load Razorpay SDK");
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Razorpay flow
  const handlePayment = async () => {
    if (!razorpayLoaded) {
      setError("Razorpay SDK not loaded yet. Please wait a moment.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create Razorpay order from backend
      const orderRes = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      if (!orderRes.ok) throw new Error("Failed to create Razorpay order");

      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Ratnaasya Jewellery",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response: any) {
          // ✅ Verify payment on backend
          const verify = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verify.json();

          if (verifyData.success) {
            // ✅ Mark WooCommerce order as paid
            await fetch(
              `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3/orders/${verifyData.order_id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Basic " +
                    btoa(
                      `${process.env.NEXT_PUBLIC_WC_KEY}:${process.env.NEXT_PUBLIC_WC_SECRET}`
                    ),
                },
                body: JSON.stringify({ set_paid: true }),
              }
            );

            clearCart();
            router.push(`/checkout/success?order_id=${verifyData.order_id}`);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#c22757" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-3">
              {[
                "first_name",
                "last_name",
                "email",
                "address_1",
                "city",
                "state",
                "postcode",
              ].map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={(form as any)[key]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-rose-200"
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{Number(item.price) * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#c22757] text-white font-semibold py-3 rounded-full hover:bg-[#a01e48] transition mt-4"
              >
                {loading ? "Processing..." : "Pay with Razorpay"}
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
