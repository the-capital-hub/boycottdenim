"use client";

import React from "react";
import Image from "next/image";
import pants from "../../../public/twopants.png"; // Replace with your actual image path

const LastComponentSection = () => {
  const scrollToCalc = () => {
    const section = document.getElementById("scroll-calc");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center mb">
      {/* Background Image */}
      <Image
        src={pants}
        alt="Fit Guide Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Fit</h1>
        <p className="text-lg mb-6">Use our size guide to shop confidently.</p>
        <button
          onClick={scrollToCalc}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          SHOP BY SIZE
        </button>
      </div>
    </section>
  );
};

export default LastComponentSection;
