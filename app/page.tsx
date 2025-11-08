import Image from "next/image";
import CategoryCarousel from "../components/CategoryCarousel";
import NewArrivals from "../components/newarrivals";



export default function HomePage() {
  return (
   <main className="min-h-screen bg-white flex flex-col items-center">

     
     

      {/* 🔹 Categories Section */}
      <CategoryCarousel />

      {/* 🔹 Add more sections below */}
      <NewArrivals />
      {/* e.g., Featured products, Testimonials, Footer, etc. */}
    </main>
  );
}
