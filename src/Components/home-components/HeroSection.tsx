"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PT_Mono } from "next/font/google";
import bg from "../../../public/Hero-img.png";
import person1 from "../../../public/person1.jpg";
import person2 from "../../../public/person2.jpg";

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const HeroSection = () => {
  const [selectedFit, setSelectedFit] = useState("SLIM FIT");
  const fits = ["SLIM FIT", "ANKIL FIT", "RELAXED FIT", "STRAIGHT FIT"];

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="Hero background denim texture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/*DESKTOP VIEW*/}
      <div className="hidden sm:block relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                className={`text-5xl sm:text-6xl lg:text-[70px] font-extrabold text-white ${ptMono.className}`}
              >
                CONFIDENCE-IN
                <br />
                EVERY STITCH.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xs px-2 text-gray-400">
                Tap and select what do you wantTap and select what do you want
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {fits.map((fit, index) => (
                  <motion.button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`px-2 py-2 text-lg font-mono transition-all duration-300 ${
                      selectedFit === fit ? "text-white" : " text-gray-500 "
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {fit}
                  </motion.button>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-300 text-sm max-w-md font-mono"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 border border-gray-400  text-white rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 border border-gray-400 rounded-full text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-[#ffe800] rounded-full text-black font-mono font-bold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2"
              >
                BUY NOW
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="relative flex flex-col items-center justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-[0%] sm:right-8 text-right"
            >
              <div className="text-gray-400 text-left relative -left-[6%] text-2xl font-thin">
                #FASHION
              </div>
              <div className="text-white text-4xl relative -left-[6%] font-medium">
                BOYCOTT DENIM
              </div>
            </motion.div>

            {/* Explore More (Hidden in Mobile) */}
            <div className="relative top-44 right-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black"
                >
                  <line
                    x1="7"
                    y1="17"
                    x2="17"
                    y2="7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="17"
                    y1="7"
                    x2="17"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="11"
                    y1="7"
                    x2="17"
                    y2="7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-[220px] h-[220px] -m-9"
              >
                <svg className="w-full h-full" viewBox="0 0 160 160">
                  <defs>
                    <path
                      id="circle-path"
                      d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    />
                  </defs>
                  <text className="text-xs font-mono font-bold fill-white">
                    <textPath
                      className="text-xl"
                      href="#circle-path"
                      startOffset="0%"
                    >
                      EXPLORE MORE •
                    </textPath>
                  </text>
                  <text className="text-xs font-mono font-bold fill-white">
                    <textPath
                      className="text-xl"
                      href="#circle-path"
                      startOffset="50%"
                    >
                      EXPLORE MORE •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="relative flex items-center gap-1"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={person1}
                  alt="Profile 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden -ml-9">
                <Image
                  src={person2}
                  alt="Profile 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div className="w-16 h-16 bg-[#ffe800]  rounded-full flex items-center justify-center -ml-9">
                <span className="text-black text-xs font-bold">+</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-left"
            >
              <div className="text-4xl font-bold text-white">450k</div>
              <div className="text-gray-400 my-3 text-sm">
                Trending Followers
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 text-center"
        >
          <div className="text-4xl sm:text-6xl lg:text-8xl mx font-bold text-white/10 font-mono tracking-wider">
            TRY IT ONCE, <span className="text-white/20">YOU LOVE</span>
          </div>
        </motion.div>
      </div>

{/*Mobile view*/}
      <div className="block sm:hidden relative z-10 px-6 py-16 min-h-screen bg-transparent">
        <h1 className={`text-4xl font-bold text-white ${ptMono.className}`}>
          CONFIDENCE-IN <br /> EVERY STITCH.
        </h1>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">
          Tap and select what do you wantTap and select what do you want
          </p>
          <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-300 mb-8 text-sm max-w-md font-mono"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </motion.p>
          <div className="flex flex-wrap gap-2">
            {fits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`px-3 py-2 text-sm rounded-full ${
                  selectedFit === fit
                    ? "bg-[#ffe800] text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full py-3 bg-[#ffe800] rounded-full text-black font-bold">
            BUY NOW
          </button>
        </div>

        <div className="mt-8 flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={person1}
              alt="Profile 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden -ml-4">
            <Image
              src={person2}
              alt="Profile 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-12 h-12 bg-[#ffe800] rounded-full flex items-center justify-center -ml-4">
            <span className="text-black text-sm font-bold">+</span>
          </div>

          <div className="ml-4">
            <div className="text-2xl font-bold text-white">450k</div>
            <div className="text-gray-400 text-xs">Trending Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
