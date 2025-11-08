"use client";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Any 9 @ ₹499",
    image: "/images/any9.jpg",
  },
  {
    id: 2,
    name: "Earrings",
    image: "/images/rings.jpg",
  },
  {
    id: 3,
    name: "Finger Rings",
    image: "/images/finger.jpg",
  },
  {
    id: 4,
    name: "NosePins",
    image: "/images/noseppin.jpg",
  },
  {
    id: 5,
    name: "Any 5 @ ₹1500",
    image: "/images/any5.jpg",
  },
  {
    id: 6,
    name: "Mangtikka",
    image: "/images/tika.jpg",
  },
];

export default function CategoryCarousel() {
  return (
    <section className="w-full py-10">
      <div className="flex overflow-x-auto no-scrollbar justify-center gap-8 px-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center min-w-[120px]"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md hover:scale-105 transition-all duration-300">
              <Image
                src={cat.image}
                alt={cat.name}
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 text-sm md:text-base font-medium text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
