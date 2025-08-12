"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PT_Mono } from 'next/font/google';
import banner1 from "../../../public/shop1.png";
import banner2 from "../../../public/shop2.png";
import banner3 from "../../../public/shop3.png";

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const slides = [
  {
    img: banner1,
    title: "RELAXED FIT",
    subtitle: "Ankle Jeans & Slim Fit and many more",
    price: "STARTING @ Rs.500",
    bgColor: "#ffe800"
  },
  {
    img: banner2,
    title: "ANKLE FIT",
    subtitle: "Linen & Cotton for Hot Days",
    price: "STARTING @ Rs.700",
    bgColor: "#d0f0c0"
  },
  {
    img: banner3,
    title: "SLIM FIT",
    subtitle: "Leather, Denim & More",
    price: "STARTING @ Rs.1500",
    bgColor: "#f0d0ff"
  },
  {
    img: banner3,
    title: "STRAIGHT FIT",
    subtitle: "Leather, Denim & More",
    price: "STARTING @ Rs.1500",
    bgColor: "#f0d0ff"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  // Auto-play every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`${ptMono.className} w-full max-w-7xl px-3 mx-auto mt-24`}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <motion.div
                className="w-full md:w-1/3 relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src={slides[currentSlide].img}
                  alt={slides[currentSlide].title}
                  className="w-full h-64 md:h-80 lg:h-full object-cover"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className="w-full md:w-2/3 p-6 md:p-8 lg:p-12 flex flex-col justify-center"
                style={{ backgroundColor: slides[currentSlide].bgColor }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-[100px] font-bold text-black mb-4 leading-tight">
                  {slides[currentSlide].title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h1>
                <p className="text-black text-sm md:text-base lg:text-[36px] mb-6 opacity-90">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-black text-lg md:text-xl lg:text-[40px] font-semibold">
                  {slides[currentSlide].price}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mb-8 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-black scale-110'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
