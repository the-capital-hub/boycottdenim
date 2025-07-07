"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img from "../../../public/shop1.png";
import Image from 'next/image';
import { PT_Mono } from 'next/font/google';

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const JeanType = () => {
    const [activeType, setActiveType] = useState('SLIM FIT');

    const jeanTypes = [
        {
            id: 'ANKLE FIT',
            name: 'ANKLE FIT',
            count: '(289)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
        },
        {
            id: 'SLIM FIT',
            name: 'SLIM FIT',
            count: '(309)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
        },
        {
            id: 'RELAXED FIT',
            name: 'RELAXED FIT',
            count: '(348)',
            description: ''
        },
        {
            id: 'STRAIGHT FIT',
            name: 'STRAIGHT FIT',
            count: '(261)',
            description: ''
        }
    ];

    const activeTypeData = jeanTypes.find(type => type.id === activeType);

    return (
        <div className={`min-h-screen bg-gray-50 p-4 md:p-8 ${ptMono.className}`}>
            <div className="max-w-7xl mx-auto relative">
                  <div className="absolute inset-0 overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute h-full border-l border-dotted border-2 border-gray-300"
                                        style={{
                                            left: `${5 + i * 22}%`,
                                        }}
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        transition={{
                                            delay: i * 0.1,
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                ))}
                            </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Side - Type Selector */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-sm text-gray-500 mb-8 ml-8">
                            Tap and select what do you want
                        </div>

                        {/* Jean Types with Dotted Lines */}
                        <div className="relative w-full max-w-7xl">
                            {/* Vertical dotted line */}
                          

                            {/* Type Options */}
                            <div className="space-y-12 ml-8">
                                {jeanTypes.map((type, index) => (
                                    <motion.div
                                        key={type.id}
                                        className="relative cursor-pointer"
                                        onClick={() => setActiveType(type.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Type Name and Count */}
                                        <div className="space-y-4">
                                            <motion.h3
                                                className={`text-xl md:text-[48px] font-bold transition-colors duration-300 ${activeType === type.id ? 'text-black' : 'text-gray-400'
                                                    }`}
                                                animate={{ opacity: activeType === type.id ? 1 : 0.6 }}
                                            >
                                                {type.name} <span className="font-normal text-lg">{type.count}</span>
                                            </motion.h3>

                                            {/* Description - Only show for active type */}
                                            <AnimatePresence>
                                                {activeType === type.id && type.description && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-[18px] text-gray-600 leading-relaxed mb-4 pr-8">
                                                            {type.description}
                                                        </p>
                                                        <motion.button
                                                            className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            SHOP NOW
                                                        </motion.button>
                                                        <div className='border border-gray-500 mt-5'></div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Product Display */}
                    <div className="flex flex-col items-center lg:items-end">
                        <div className=" rounded-lg  overflow-hidden max-w-xl w-full">
                            <div className=" text-left  text-black">
                                <h2 className="text-[35px]  font-semibold mb-2">Light Grey Ankle Jeans</h2>
                                <p className="text-[28px] font-medium">Rs. 1,399.00</p>
                            </div>
                            {/* Product Header */}

                            {/* Product Image */}
                            <div className="relative bg-gray-100 aspect-square overflow-hidden">
                                <Image
                                    src={img}
                                    alt="Light Grey Ankle Jeans"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JeanType;