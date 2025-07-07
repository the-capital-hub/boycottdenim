"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import img from "../../../public/testimonialimg.png"
import { PT_Mono } from 'next/font/google'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const Testimonial = () => {
  return (
    <motion.div 
      className={`max-w-7xl mx-auto px-4 mt-28 py-8 md:py-1 ${ptMono.className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 w-full max-w-7xl mx-auto lg:flex-row lg:gap-10 lg:flex items-center">
        {/* Left Side - Image and Stats */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Collections Badge */}
          <motion.div 
            className=" rounded-lg px-4 py-2 lg:absolute lg:-top-30 lg:-translate-y-[100%] "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="text-2xl md:text-3xl font-bold text-gray-900">450+</div>
            <div className="text-[20px] text-gray-600">Collections</div>
          </motion.div>

          {/* Main Image */}
          <div className="relative ">
            <Image 
              src={img}
              alt="Testimonial"
              className="mx-auto lg:mx-0 rounded-lg shadow-lg relative lg:top-65 lg:-translate-y-[100%]"
              width={700}
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div 
          className="space-y-2 w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Testimonials Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-black text-[24px] font-medium tracking-wide uppercase mb-2">
              TESTIMONIALS
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-thin text-black leading-tight mb-3">
              FINALLY A BRAND THAT UNDERSTANDS MODERN ELEGANCE! THE QUALITY IS AMAZING
            </h2>
            
            <p className="text-gray-600 text-xs md:text-[18px] leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className='flex text-black items-center -mt-4 gap-8'>
                <ArrowLeft/>
                <ArrowRight/>
            </div>
          </motion.div>

          <motion.div 
            className=" rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-end justify-end">
              <div className="flex items-center space-x-3">
               
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">450k</div>
                  <div className="text-[20px] text-gray-600">Followers Customers</div>
                  <div className="text-[20px] text-gray-500">worldwide</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Testimonial