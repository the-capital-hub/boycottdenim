"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import img1 from "../../../public/aanklefit.png";
import img2 from "../../../public/slimfit.png";
import img3 from "../../../public/relaxedfit.png";
import img4 from "../../../public/aanklefit.png";
import { PT_Mono } from "next/font/google";

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

 export const fits = [
  {
    id: 1,
    title: "ANKLE FIT",
    image: img1,
    bgColor: "#000000",
  },
  {
    id: 2,
    title: "SLIM FIT",
    image: img2,
    bgColor: "#ffe800",
  },
  {
    id: 3,
    title: "RELAXED FIT",
    image: img3,
    bgColor: "#3bd23d",
  },
  {
    id: 4,
    title: "STRAIGHT FIT",
    image: img4,
    bgColor: "#009ccd",
  },
];

type GenzFitsSectionProps = {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
};

const GenzFitsSection: React.FC<GenzFitsSectionProps> = ({ activeSlide, setActiveSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Drag states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const startDrag = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // scroll-fast
    if (sliderRef.current)
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % fits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + fits.length) % fits.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth / (window.innerWidth < 768 ? 1 : 3);
      sliderRef.current.scrollTo({
        left: currentSlide * cardWidth,
        behavior: "smooth",
      });
    }
  }, [activeSlide]);

  useEffect(() => {
    setCurrentSlide(activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    if (setActiveSlide) {
      setActiveSlide(currentSlide);
    }
  }, [currentSlide, setActiveSlide]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={`w-full bg-white py-8 md:py-12 px-4 ${ptMono.className}`}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseLeave={stopDrag}
            onMouseUp={stopDrag}
            className="flex gap-6 md:gap-8 text-black overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing transition-transform ease-in-out"
          >
            {fits.map((fit,index) => (
              <motion.div
                key={fit.id}
                onClick={() => setActiveSlide(index)}
                className="flex-shrink-0 rounded-lg shadow-lg relative"
                style={{
                  backgroundColor: fit.bgColor,
                  width: "80vw",
                  maxWidth: "340px",
                  height: "70vh",
                  minHeight: "500px",
                }}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex flex-col h-full">
                  <h3
                    className={`absolute top-[55%] left-8 rotate-[-90deg]  origin-left ${
                      fit.bgColor === "#000000" ? "text-white" : "text-black"
                    } text-xl md:text-3xl lg:text-[40px] font-bold`}
                  >
                    {fit.title}
                  </h3>

                  <div className="flex-1 flex items-end justify-center p-6">
                    <div className="relative w-full h-full max-w-[250px]">
                      <Image
                        src={fit.image}
                        alt={fit.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buttons for Mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 z-10 md:hidden"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 z-10 md:hidden"
          >
            ›
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 md:hidden gap-2">
          {fits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GenzFitsSection;
