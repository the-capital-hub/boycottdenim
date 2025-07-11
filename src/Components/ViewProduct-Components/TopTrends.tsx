"use client"
import React from 'react'
import { motion,Variants } from 'framer-motion'
import Image from 'next/image'
import img1 from "../../../public/toptren1.png"
import img2 from "../../../public/viewprod1.png"
import img3 from "../../../public/toptrend3.png"
import { PT_Mono } from 'next/font/google'

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const TopTrends = () => {
  const trendData = [
    {
      id: 1,
      image: img1,
      title: "COTT TREND",
      description: "BUY COTT 1ST WEEK CONSECUTIVE PARTNERSHIP, 48 SEARCH RANKING, LOOKS GOOD AT CHEAP & BEST PRICE",
      badge: "BUY 1 GET 1",
   
    },
    {
      id: 2,
      image: img2,
      title: "BOY COTT TREND",
      description: "LOOSE DENIM STILL IN BEST, COLLECTION SATISFYING, AFTER LAST 30 YEARS BEST BRAND SATISFYING & MODERN COLLECTION",
      badge: "UPTO 80% OFF",
  
    },
    {
      id: 3,
      image: img3,
      title: "BOY COTT TREND",
      description: "LOOSE DENIM DULL IN BEST, CONSECUTIVE SATISFYING, ALSO CUT AN CHOOSE NEWER INGREDIENTS ON FASHION MAKES THIS CAT FRESH",
      badge: "BUY 1 GET",
     
     
    }
  ]

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants:Variants = {
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

  const textVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  }

  const badgeVariants:Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  }

  return (
    <div className={`${ptMono.className} w-full px-4 py-8 mt-20  mx-auto  max-w-7xl `}>
        <div>
            <h1 className='text-black text-[64px] text-center font-bold mb-4'>Top Trends</h1>
        </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[2rem] overflow-x-hidden mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {trendData.map((trend) => (
          <motion.div
            key={trend.id}
            className="relative group cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Main Card Container */}
            <div className="relative h-80 lg:w-[100%] lg:h-[67%] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={trend.image}
                alt={trend.title}
                className=''
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                {/* Top Section - Title */}
                <motion.div 
                  className="text-left"
                  variants={textVariants}
                >
                  <h2 className={`text-white text-lg md:text-[36px] font-bold tracking-wide drop-shadow-md`}>
                    {trend.title}
                  </h2>
                </motion.div>

                {/* Middle Section - Description */}
                <motion.div 
                  className="flex-1 flex justify-center px-1"
                  variants={textVariants}
                >
                    
                  
                  <p className="text-white text-xs md:text-[16px] leading-tight drop-shadow-md opacity-90">
                    {trend.description.toLowerCase()}
                  </p>
                </motion.div>

                {/* Bottom Section - Badge */}
                <motion.div 
                  className="flex justify-center relative"
                  variants={badgeVariants}
                >
                  <div className={`bg-black text-white px-4 py-2 rounded-md text-xs md:text-[20px] -right-5 -top-10  absolute font-bold tracking-wide shadow-md`}>
                    {trend.badge}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default TopTrends