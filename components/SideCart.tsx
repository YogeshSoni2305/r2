"use client";
import Link from "next/link"; // add at top
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";

export default function SideCart({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex gap-3 items-center border-b pb-3">
              <img src={item.images[0]?.src} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-gray-600 text-sm">₹{item.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span>Total:</span>
            <span className="font-semibold">₹{totalPrice}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-[#c22757] text-white py-2 rounded-full font-semibold hover:bg-[#a01e48] transition"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
