// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const categories = [
//   {
//     id: 1,
//     name: "Any 5 @ ₹499",
//     slug: "any-5-earrings",
//     image: "/images/any5.jpg",
//   },
//   {
//     id: 2,
//     name: "Any 9 @ ₹999",
//     slug: "any-9-earrings",
//     image: "/images/any9.jpg",
//   },
//   {
//     id: 3,
//     name: "Gift Box",
//     slug: "gift-box",
//     image: "/images/finger.jpg",
//   },
//   {
//     id: 4,
//     name: "Earrings",
//     slug: "earrings",
//     image: "/images/noseppin.jpg",
//   },
//   {
//     id: 5,
//     name: "Chain Pendants",
//     slug: "chain-pendant",
//     image: "/images/finger.jpg",
//   },
//   {
//     id: 6,
//     name: "Special Drops",
//     slug: "special-drops",
//     image: "/images/tika.jpg",
//   },
// ];

// export default function CategoryCarousel() {
//   const router = useRouter();

//   return (
//     <section className="w-full py-10">
//       <div className="flex overflow-x-auto no-scrollbar justify-center gap-8 px-6">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => router.push(`/products/by-category/${cat.slug}`)} // ✅ redirect to category page
//             className="flex flex-col items-center min-w-[120px] focus:outline-none"
//           >
//             <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md hover:scale-105 transition-all duration-300">
//               <Image
//                 src={cat.image}
//                 alt={cat.name}
//                 width={144}
//                 height={144}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <p className="mt-2 text-sm md:text-base font-medium text-center">
//               {cat.name}
//             </p>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: 1,
    name: "Any 5 @ ₹499",
    slug: "any-5-earrings",
    image: "/images/any5.jpg",
  },
  {
    id: 2,
    name: "Any 9 @ ₹999",
    slug: "any-9-earrings",
    image: "/images/any9.jpg",
  },
  {
    id: 3,
    name: "Gift Box",
    slug: "gift-box",
    image: "/images/finger.jpg",
  },
  {
    id: 4,
    name: "Earrings",
    slug: "earrings",
    image: "/images/noseppin.jpg",
  },
  {
    id: 5,
    name: "Chain Pendants",
    slug: "chain-pendant",
    image: "/images/finger.jpg",
  },
  {
    id: 6,
    name: "Special Drops",
    slug: "special-drops",
    image: "/images/tika.jpg",
  },
];

export default function CategoryCarousel() {
  const router = useRouter();

  return (
    <section className="w-full py-6"> {/* Reduced py-10 to py-6 to decrease vertical gaps */}
      <div className="flex overflow-x-auto no-scrollbar gap-8 px-4 sm:px-6 lg:px-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => router.push(`/products/by-category/${cat.slug}`)}
            className="flex flex-col items-center min-w-[110px] sm:min-w-[130px] focus:outline-none flex-shrink-0" // Adjusted min-w slightly for larger images
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md hover:scale-105 transition-all duration-300"> {/* Increased image sizes across breakpoints */}
              <Image
                src={cat.image}
                alt={cat.name}
                width={160} // Increased width for the Image component
                height={160} // Increased height for the Image component
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-medium text-center whitespace-nowrap">
              {cat.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}