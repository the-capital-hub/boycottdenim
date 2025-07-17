// components/HomeBannerGrid.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import AboutImg from "../../../public/about us image.png";
import menImg from "../../../public/men.png";
import womenImg from "../../../public/women.png"
import denimImg from "../../../public/denim.png";
import iconImg from "../../../public/icon.png";
import summerLover from "../../../public/summerlovers.png";

export default function HomeBannerGrid() {
  const router = useRouter();

  const topRow = [
    { name: "MEN", img: menImg, link: "/men" },
    { name: "WOMEN", img: womenImg, link: "/women" },
    { name: "DENIM", img: denimImg, link: "/denim" },
  ];

  const bottomRow = [
    { name: "ICONIC", img: iconImg, link: "/iconimg" },
    { name: "D2WORLD", img: summerLover, link: "/summerLover" },
  ];

  return (
    <div className="w-full">
      {/* Top 3-grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {topRow.map((item, i) => (
          <div
            key={i}
            // onClick={() => router.push(item.link)}
            className="relative group cursor-pointer h-[70vh]"
          >
            <Image
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              priority
            />
            <div className="absolute bottom-4 w-full text-center">
              <span className="text-white text-lg font-semibold tracking-widest">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 2-grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {bottomRow.map((item, i) => (
          <div
            key={i}
            // onClick={() => router.push(item.link)}
            className="relative group cursor-pointer h-[70vh]"
          >
            <Image
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              priority
            />
            <div className="absolute bottom-4 w-full text-center">
              <span className="text-white text-lg font-semibold tracking-widest">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
