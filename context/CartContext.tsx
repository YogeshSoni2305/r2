"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  category?: string; // ✅ added
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  offerPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Calculate totals normally
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // ✅ Apply per-category combo offers
  let offerPrice = 0;

  // "Any 5 @ ₹499"
  const any5Items = cart.filter(
    (item) => item.category === "any-5-earrings"
  );
  if (any5Items.length >= 5) {
    const setsOf5 = Math.floor(any5Items.length / 5);
    const remainingItems = any5Items.length % 5;
    const remainingTotal = any5Items
      .slice(setsOf5 * 5)
      .reduce((sum, item) => sum + Number(item.price), 0);
    offerPrice += setsOf5 * 499 + remainingTotal;
  } else {
    offerPrice += any5Items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }

  // "Any 9 @ ₹999"
  const any9Items = cart.filter(
    (item) => item.category === "any-9-earrings"
  );
  if (any9Items.length >= 9) {
    const setsOf9 = Math.floor(any9Items.length / 9);
    const remainingItems = any9Items.length % 9;
    const remainingTotal = any9Items
      .slice(setsOf9 * 9)
      .reduce((sum, item) => sum + Number(item.price), 0);
    offerPrice += setsOf9 * 999 + remainingTotal;
  } else {
    offerPrice += any9Items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }

  // ✅ All other categories (normal pricing)
  const otherItems = cart.filter(
    (item) =>
      item.category !== "any-5-earrings" &&
      item.category !== "any-9-earrings"
  );
  offerPrice += otherItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // ✅ Add to Cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        offerPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used inside CartProvider");
  return context;
};
