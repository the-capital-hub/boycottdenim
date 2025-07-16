"use client";
import React from "react";
import { motion } from "framer-motion";

const scrollingText = "UNITED BY DENIM + ";

const MarqueeRow = ({ reverse = false }) => (
  <div className="overflow-hidden whitespace-nowrap bg-[#ffe800] py-4">
    <motion.div
      className="flex gap-8"
      animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="text-black font-mono font-bold text-lg px-4 tracking-widest"
        >
          {scrollingText}
        </span>
      ))}
    </motion.div>
  </div>
);

const UnitedByDenim = () => {
  return (
    <div >

      <div className="text-black lg:py-0 my-0 font-bold italic bg-white text-5xl lg:text-[90px] text-center mb-0 pb-0 leading-none">
        <p>100% DENIM BRAND</p>
      </div>
      <div className="relative w-screen h-[20vh] z-[-1]">
          <div className="absolute w-screen h-[1rem] bg-yellow-400 rotate-[5deg] top-1/3 left-0 flex items-center justify-center shadow-md border-y-[1px] border-black text-black text-xs font-bold uppercase tracking-widest">
            {<MarqueeRow reverse={true}/>}
          </div>
          <div className="absolute w-screen h-[1rem] bg-yellow-400 rotate-[-5deg] top-[60%] left-0 flex items-center justify-center shadow-md border-y-[1px] border-black text-black text-xs font-bold uppercase tracking-widest">
            {<MarqueeRow reverse={false}/>}
          </div>
      </div>


    </div>
  );
};

export default UnitedByDenim;
