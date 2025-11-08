"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SideCart from "@/components/SideCart";

// simple icon placeholders
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const Header = () => {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 5%",
      backgroundColor: "#fff",
      borderBottom: "1px solid #eee",
      fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 50,
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
    },
    nav: {
      display: "flex",
      gap: "2rem",
    },
    navLink: {
      textDecoration: "none",
      color: "#333",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "color 0.2s ease",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    actionButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "center",
    },
    cartWrapper: { position: "relative" },
    cartBadge: {
      position: "absolute",
      top: "-8px",
      right: "-10px",
      backgroundColor: "red",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "11px",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <Link href="/" style={styles.logoContainer}>
          <Image
            src="/images/Ratnaasyalogo.png"
            alt="Ratnaasya Logo"
            width={140}
            height={40}
            priority
          />
        </Link>

        <nav style={styles.nav}>
          <Link href="/" style={styles.navLink}>Home</Link>
          <Link href="/offers" style={styles.navLink}>Offers</Link>
          <Link href="/jewellery-collection" style={styles.navLink}>Jewellery Collection</Link>
          <Link href="/products" style={styles.navLink}>All Products</Link>
        </nav>

        <div style={styles.actions}>
          <button style={styles.actionButton} aria-label="Search">
            <SearchIcon />
          </button>
          <button style={styles.actionButton} aria-label="User Account">
            <UserIcon />
          </button>
          <button style={styles.actionButton} aria-label="Wishlist">
            <HeartIcon />
          </button>
          <button
            onClick={() => setCartOpen(true)}
            style={{ ...styles.actionButton, ...styles.cartWrapper }}
            aria-label="Shopping Cart"
          >
            <CartIcon />
            {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </header>

      <SideCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
