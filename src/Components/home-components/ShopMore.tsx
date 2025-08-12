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

const ShopMore = () => {
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

  const paginationVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.8,
        duration: 0.5 
      }
    }
  }

  return (
    <div className={`${ptMono.className} w-full max-w-7xl mx-auto px-4 py-5`} >
        <div className='w-full max-w-5xl mx-auto my-5'>
            <h1 className='text-[64px] text-center text-black'>See all products</h1>
            <p className='text-[18px] text-gray-700 text-center'>We built Boy Cott for people who know who they are. People who don't need loud logos or fancy hype to stand out. People who believe in quality over quantity, style over noise, and real over fake.</p>
        </div>
      {/* Product Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white group cursor-pointer flex flex-col items-center w-auto max-w-xs mx-auto"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Product Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden mb-3 w-auto">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 pb-12"
              />
            <div className="space-y-1 top-[90%] relative text-left px-2 w-full">
              <h3 className="text-sm text-gray-800 font-normal">
                {product.title}
              </h3>
              
              {/* Price Section */}
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
      <motion.div 
        className="flex justify-center items-center gap-2 "
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="w-60 h-12  bg-[#ffe800] gap-3 text-black font-bold cursor-pointer rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          See All products
          <ArrowRight />
        </motion.button>
       
      </motion.div>
    </div>
  )
}

export default ShopMore