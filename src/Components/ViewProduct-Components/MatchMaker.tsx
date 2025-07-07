"use client"
import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import img1 from "../../../public/shop3.png"
import img2 from "../../../public/shop4.png"
import img3 from "../../../public/shop4.png"
import img4 from "../../../public/shop4.png"
import img5 from "../../../public/shop4.png"
import img6 from "../../../public/shop3.png"
import { PT_Mono } from 'next/font/google'
import { ArrowRight } from 'lucide-react'

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const MatchMaker = () => {
  const products = [
    {
      id: 1,
      image: img1,
      title: "Light Grey Ankle Jeans",
      price: "Rs. 1,399.00",
      discount: "40% OFF"
    },
    {
      id: 2,
      image: img2,
      title: "Light Grey Ankle Jeans",
     price: "Rs. 1,399.00",
      discount: "40% OFF"
    },
    {
      id: 3,
      image: img3,
      title: "Light Grey Ankle Jeans",
     price: "Rs. 1,399.00",
      discount: "40% OFF"
    },
    {
      id: 4,
      image: img4,
      title: "Light Grey Ankle Jeans",
       price: "Rs. 1,399.00",
      discount: "40% OFF"
    },
    {
      id: 5,
      image: img5,
      title: "Light Skinny Ankle Jeans",
      price: "Rs. 1,399.00",
      discount: "40% OFF"
    },
    {
      id: 6,
      image: img6,
      title: "Light Grey Ankle Jeans",
     price: "Rs. 1,399.00",
      discount: "40% OFF"
    }
  ]

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }


  return (
    <div className={`${ptMono.className} w-full max-w-7xl mx-auto px-4 py-5` }>
        <div className='w-full mx-auto my-5'>
            <h1 className='text-[40px] text-left font-bold text-black'>Match Maker</h1>
        </div>
      {/* Product Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white group cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-3">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300 pb-12"
              />
            <div className="space-y-1 top-[90%] relative left-4">
              <h3 className="text-sm text-gray-800 font-normal">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2 ">
                <span className="text-sm font-medium text-black">
                  {product.price}
                </span>
                <span className="bg-[#ffe800] text-black text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {product.discount}
                </span>
              </div>
            </div>
            </div>
            
           
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default MatchMaker