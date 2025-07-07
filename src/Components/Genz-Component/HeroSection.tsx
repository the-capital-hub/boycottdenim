"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import banner from "../../../public/genzHeroimg.png"
import Image from 'next/image';
import { PT_Mono } from 'next/font/google';

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });
  

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6; // Assuming 4 slides based on the dots in the image

  const handleDotClick = (index:number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`${ptMono.className} w-full max-w-7xl px-3 mx-auto mt-24`}>
      {/* Main Banner Container */}
      <motion.div 
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <motion.div 
            className="w-full md:w-1/3 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Image 
              src={banner} 
              alt="Trendy black jeans"
              className="w-full h-64 md:h-80 lg:h-full object-cover"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="w-full md:w-2/3 p-6 md:p-8 lg:p-12 flex flex-col justify-center"
            style={{ backgroundColor: '#ffe800' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-[100px] font-bold text-black mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              TRENDY<br />TROUSERS
            </motion.h1>

            <motion.p 
              className="text-black text-sm md:text-base lg:text-[36px] mb-6 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Ankle Jeans & Slim Fit and many<br />more
            </motion.p>

            <motion.p 
              className="text-black text-lg md:text-xl lg:text-[40px] font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              STARTING ₹500
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Dots */}
      <motion.div 
        className="flex justify-center mt-6 space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 mb-8 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-[#ffe800] scale-110' 
                : 'bg-gray-200 hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 1.4 + (index * 0.1),
              type: "spring",
              stiffness: 200
            }}
          />
        ))}
      </motion.div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .text-3xl { font-size: 2rem; }
          .text-4xl { font-size: 2.5rem; }
          .text-5xl { font-size: 3rem; }
        }
        
        @media (max-width: 640px) {
          .text-3xl { font-size: 1.75rem; }
          .text-4xl { font-size: 2rem; }
          .text-5xl { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  );
}
export default HeroSection