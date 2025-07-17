"use client";

import { useRef } from "react";
import Image from "next/image";
import left from "../../../public/left.png";
import right from "../../../public/right.png";

export default function ImageComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !sliderRef.current || !afterRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;

    sliderRef.current.style.left = `${percent}%`;
    afterRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  };

  return (
    <div
      ref={containerRef}
     // onClick={handleMove}
     onMouseMove={handleMove}
      className="relative h-[600px] w-[600px] overflow-hidden cursor-ew-resize select-none border-2 border-white shadow-lg"
    >
      {/* Before Image */}
      <Image
        src={left}
        alt="Before"
        fill
        className="object-cover"
        sizes="800px"
        priority
      />

      {/* After Image with clipping */}
      <div
        ref={afterRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <Image
          src={right}
          alt="After"
          fill
          className="object-cover"
          sizes="800px"
          priority
        />
      </div>

      {/* White Center Line */}
      <div
  ref={sliderRef}
  className="absolute top-0 left-1/2 h-full z-20 flex items-center justify-center transition-all duration-500 ease-in-out"
>
  <div className="w-[3px] h-full bg-white"></div>
</div>
    </div>
  );
}
