'use client'

import React from "react";
// import Image from "next/image";
// import pants from "../../../public/twopants.png"
import ImageComparisonSlider from "./comparison";
import { useRouter } from "next/navigation";

const FitGuideSection = () => {
    const router = useRouter()

    const handleClick = () => {
        // Example: Navigate to a fit guide page
        router.push("/Shop");
      };


  return (
    <section className="px-8 md:px-16 py-16 bg-white">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Static Image */}
        <ImageComparisonSlider/>

        {/* Right Side: Text + Buttons over background image */}
        <div
          className="relative bg-cover bg-center text-white rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/twopants.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Content */}
          <div className="relative p-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-leMonde">
              Pants
            </h2>
            <p className="text-lg uppercase tracking-wide">
              Casual, Denim, Dress
            </p>
            <p className="text-white">
              Our pants are designed with shorter inseams, a proper rise and proportionate leg opening.
              With 50 sizes, including inseams starting at 25 inches, we’ve got you covered. No alterations needed!
            </p>
            <div className="space-y-4 pt-2">
              <button className="w-full bg-white text-[#112240] font-semibold py-2 rounded hover:bg-gray-100 transition">
                FIND YOUR SIZE
              </button>
              <button className="w-full bg-white text-[#112240] font-semibold py-2 rounded hover:bg-gray-100 transition" onClick={handleClick}>
                SHOP ALL PANTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitGuideSection;
