'use client'

import React from 'react'
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import img1 from "../../../public/exclusive1.png"
import img2 from "../../../public/exclusive2.png"
import img3 from "../../../public/exclusive3.png"
import { PT_Mono } from 'next/font/google'
import { ArrowRight } from 'lucide-react'

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const ExclusiveSection = () => {
  const containerVariants :Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const cardVariants :Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.3 }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, delay: 0.5 }
    },
    hover: {
      scale: 1.1,
     
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className={`${ptMono.className} bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white mb-6 tracking-wide">
            BOY COTT <span className="font-medium">EXCLUSIVES</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-[20px] max-w-6xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Card 1 - Buy 1 Get 1 */}
          <motion.div 
            className="relative group cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-900">
              <div className="aspect-[3/4] relative">
                <Image
                  src={img1}
                  alt="Boy Cott Exclusive Jeans - Buy 1 Get 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-[60.5%] lg:[57.5%] right-0 w-44">
                <motion.div
                  className="bg-black bg-opacity-90 backdrop-blur-sm rounded-l-lg px-4 py-3 text-left"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-bold text-lg tracking-wide">
                    BUY 1 GET 1
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Up to 80% Off */}
          <motion.div 
            className="relative group cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-900">
              <div className="aspect-[3/4] relative">
                <Image
                  src={img2}
                  alt="Boy Cott Exclusive Jeans - Up to 80% Off"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-[61%] lg:[57%] right-0 w-44">
                <motion.div
                  className="bg-black bg-opacity-90 backdrop-blur-sm rounded-l-lg px-4 py-3 text-center"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-bold text-lg tracking-wide">
                    UPTO 80% OFF
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Buy 1 Get 1 */}
          <motion.div 
            className="relative group cursor-pointer md:col-span-2 lg:col-span-1"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-900">
              <div className="aspect-[3/4] relative">
                <Image
                  src={img3}
                  alt="Boy Cott Exclusive Jeans - Buy 1 Get 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 33vw"
                />
               
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 lg:left-[57.5%] left-[61%] right-0 w-44">
                <motion.div
                  className="bg-black bg-opacity-90 backdrop-blur-sm rounded-l-lg px-4 py-3 text-center"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-bold text-lg tracking-wide">
                    BUY 1 GET 1
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Shop Now Button */}
        <motion.div 
          className="text-center"
         
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={buttonVariants}
        >
          <motion.button
            className="bg-[#ffe800] flex justify-center items-center gap-4 mx-auto hover:bg-yellow-400 cursor-pointer text-black font-bold py-4 px-12 rounded-full text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            SHOP NOW
            <ArrowRight/>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ExclusiveSection