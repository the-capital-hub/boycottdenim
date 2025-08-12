"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PT_Mono } from 'next/font/google'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
})

// Testimonial data
const testimonials = [
  {
    text: "FINALLY A BRAND THAT UNDERSTANDS MODERN ELEGANCE! THE QUALITY IS AMAZING",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/testimonialimg.png",
    collections: "450+",
    followers: "450k",
  },
  {
    text: "I'VE NEVER FELT SO CONFIDENT IN MY OUTFITS BEFORE. ABSOLUTELY LOVE THIS BRAND!",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/testimonialimg.png",
    collections: "320+",
    followers: "300k",
  },
  {
    text: "THE MATERIALS, THE FIT, THE VIBE — EVERYTHING IS PERFECT.",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "/testimonialimg.png",
    collections: "500+",
    followers: "500k",
  },
]

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <motion.div 
      className={`max-w-7xl mx-auto px-4 mt-28 py-8 md:py-1 ${ptMono.className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 w-full max-w-7xl mx-auto lg:flex-row lg:gap-10 lg:flex items-center">
        
        {/* Left Side */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex + "-image"}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="rounded-lg px-4 py-2 lg:absolute lg:-top-30 lg:-translate-y-[100%]">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{current.collections}</div>
              <div className="text-[20px] text-gray-600">Collections</div>
            </motion.div>

            <div className="relative">
              <Image 
                src={current.image}
                alt="Testimonial"
                className="mx-auto lg:mx-0 rounded-lg shadow-lg relative lg:top-65 lg:-translate-y-[100%]"
                width={700}
                height={500}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Side */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex + "-text"}
            className="space-y-2 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-black text-[24px] font-medium tracking-wide uppercase mb-2">
              TESTIMONIALS
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-thin text-black leading-tight mb-3">
              {current.text}
            </h2>
            
            <p className="text-gray-600 text-xs md:text-[18px] leading-relaxed mb-8">
              {current.description}
            </p>

            <div className='flex text-black items-center -mt-4 gap-8'>
              <button onClick={handlePrev} aria-label="Previous testimonial">
                <ArrowLeft/>
              </button>
              <button onClick={handleNext} aria-label="Next testimonial">
                <ArrowRight/>
              </button>
            </div>

            <motion.div className="rounded-lg p-6">
              <div className="flex items-end justify-end">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{current.followers}</div>
                  <div className="text-[20px] text-gray-600">Followers Customers</div>
                  <div className="text-[20px] text-gray-500">worldwide</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Testimonial
