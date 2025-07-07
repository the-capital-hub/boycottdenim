"use client";
import React from "react";
import { motion } from "framer-motion";

const scrollingText =
  "UNITED BY DENIM + UNITED BY DENIM + UNITED BY DENIM + UNITED BY DENIM + ";

const UnitedByDenim = () => {
  return (
    <div>
      <div className="bg-[#ffe800] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          {/* Double blocks for seamless loop */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex"
          >
            <span className="text-black font-mono font-bold text-lg px-4">
              {scrollingText}
            </span>
            <span className="text-black font-mono font-bold text-lg px-4">
              {scrollingText}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="text-black lg:py-4 font-bold italic bg-white text-5xl lg:text-[90px] text-center">
        <p>100% DENIM BRAND</p>
      </div>
    </div>
  );
};

export default UnitedByDenim;
