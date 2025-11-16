// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   regular_price: string;
//   images: { src: string; alt?: string }[];
// };

// export default function ProductClient({ product }: { product: Product }) {
//   const { addToCart } = useCart();
//   const [mainImage, setMainImage] = useState(
//     product.images?.[0]?.src || "/placeholder.png"
//   );

//   return (
//     <main className="max-w-6xl mx-auto py-10 px-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Product Images */}
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="flex md:flex-col gap-2 overflow-x-auto md:w-24 no-scrollbar">
//             {product.images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img.src}
//                 alt={img.alt || product.name}
//                 className="w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-[#c22757]"
//                 onClick={() => setMainImage(img.src)}
//               />
//             ))}
//           </div>
//           <div className="flex-1">
//             <img
//               src={mainImage}
//               alt={product.name}
//               className="w-full rounded-lg shadow"
//             />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
//           <div className="flex items-center gap-3 mb-4">
//             {product.regular_price && (
//               <span className="text-gray-500 line-through">
//                 ₹{product.regular_price}
//               </span>
//             )}
//             <span className="text-2xl font-bold text-[#c22757]">
//               ₹{product.price}
//             </span>
//           </div>

//           <div
//             className="mt-4 text-gray-700 leading-relaxed prose max-w-none"
//             dangerouslySetInnerHTML={{ __html: product.description }}
//           />

//           <button
//             onClick={() => addToCart(product)}
//             className="bg-[#c22757] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a01e48] transition w-full mt-6"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // For navigation arrows

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  images: { src: string; alt?: string }[];
};

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleNextImage = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const currentMainImageSrc =
    product.images?.[mainImageIndex]?.src || "/placeholder.png";

  return (
    <main className="max-w-screen-2xl mx-auto font-sans antialiased text-gray-800 bg-gray-50 lg:bg-white">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:py-12 lg:px-6">
        {/* Product Images Section */}
        <div className="relative bg-white lg:rounded-xl lg:shadow-lg overflow-hidden">
          {/* Main Image with Navigation for Mobile/Desktop */}
          <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] bg-gray-100 flex items-center justify-center">
            <img
              src={currentMainImageSrc}
              alt={product.name}
              className="w-full h-full object-contain object-center transition-transform duration-300 ease-in-out"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-md hover:bg-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#c22757]/50"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-gray-700 text-lg md:text-xl" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-md hover:bg-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#c22757]/50"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-gray-700 text-lg md:text-xl" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery - Below Main Image for Desktop, Hidden on Mobile */}
          {product.images.length > 0 && (
            <div className="hidden lg:flex justify-center gap-3 p-4 bg-white border-t border-gray-100">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt || product.name}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                    i === mainImageIndex
                      ? "border-[#c22757] shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setMainImageIndex(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="p-5 md:p-8 lg:p-0 flex flex-col justify-between bg-white lg:rounded-xl lg:shadow-lg lg:pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4 mb-6">
              {product.regular_price &&
                parseFloat(product.regular_price) > parseFloat(product.price) && (
                  <span className="text-gray-500 text-xl md:text-2xl line-through font-medium">
                    ₹{product.regular_price}
                  </span>
                )}
              <span className="text-3xl md:text-4xl font-bold text-[#c22757]">
                ₹{product.price}
              </span>
            </div>

            <div
              className="mt-6 text-gray-700 leading-relaxed prose prose-base md:prose-lg max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => addToCart(product)}
              className="bg-[#c22757] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#a01e48] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#c22757]/50 w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}