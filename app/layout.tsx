


// import "./globals.css";
// import { ReactNode } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { CartProvider } from "@/context/CartContext";

// export const metadata = {
//   title: "Ratnaasya – Buy Any 5 for ₹999",
//   description: "Jewellery that celebrates you — Buy 5 for ₹999, 10 for ₹1500.",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-white text-gray-900 flex flex-col min-h-screen">
//         <CartProvider>
//           <Header />
//           <main className="flex-1 w-full">

//             {children}
//           </main>
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import { ReactNode } from "react";
import ClientWrapper from "../components/ClientWrapper";

export const metadata = {
  title: "Ratnaasya – Buy Any 5 for ₹999",
  description: "Jewellery that celebrates you — Buy 5 for ₹999, 10 for ₹1500.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
