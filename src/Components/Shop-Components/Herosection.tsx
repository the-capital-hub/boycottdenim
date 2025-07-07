"use client"
import React, { useState } from 'react';
import { Filter, ArrowUpDown, Grid, List } from 'lucide-react';
import Image from 'next/image';
import img1 from "../../../public/shop1.png"
import img2 from "../../../public/shop2.png"
import { PT_Mono } from 'next/font/google';
import FilterDropdown from '../Common/Filter';


const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const Herosection = () => {
  const [activeFilter, setActiveFilter] = useState('SLIM FIT');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const jeanTypes = [
    { name: 'ANKLE FIT', count: 289, isActive: false },
    { name: 'SLIM FIT', count: 309, isActive: true },
    { name: 'RELAXED FIT', count: 348, isActive: false },
    { name: 'STRAIGHT FIT', count: 261, isActive: false }
  ];

  return (
    <div className={`${ptMono.className} bg-white mt-20`}>
      {/* Top Navigation */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Jeans Types Navigation */}
            <div className="flex flex-wrap items-center gap-0">
              {jeanTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => setActiveFilter(type.name)}
                  className={`px-4 sm:px-6 py-2 sm:py-4 text-[18px] sm:text-[25px] font-medium transition-all duration-200 relative ${
                    type.isActive || activeFilter === type.name
                      ? 'text-black font-semibold'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {type.name} ({type.count})
                  {(type.isActive || activeFilter === type.name) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Section Title */}
      <div className="max-w-7xl flex flex-col sm:flex-row justify-between items-start sm:items-center mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-4 sm:gap-0">
        <h1 className="text-[20px] sm:text-[24px] font-medium text-black">{activeFilter}</h1>
        <div className="flex items-center gap-4 py-4">
          <div className="relative">
            <FilterDropdown isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-black transition-colors">
            <ArrowUpDown size={16} />
            SORT BY
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 transition-colors ${
                viewMode === 'grid' ? 'text-black' : 'text-gray-400 cursor-pointer hover:text-gray-600'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 transition-colors ${
                viewMode === 'list' ? 'text-black' : 'text-gray-400 cursor-pointer hover:text-gray-600'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-[15rem]">
          {/* Product 1 */}
          <div className="group cursor-pointer relative">
            <div className="bg-gray-100 aspect-[4/5] w-full md:w-[50vw] h-[50vh] md:h-[60vh] overflow-hidden mb-4 relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Image src={img1} alt='product 1' className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="space-y-2 absolute left-4 md:left-2 bottom-4 md:bottom-5">
              <h3 className="text-[14px] font-normal text-black">
                Light Grey Ankle Jeans
              </h3>
              <div className="text-[14px] font-medium text-black">
                Rs. 1,399.00
              </div>
              <div className="inline-block">
                <span className="bg-[#ffe800] text-black text-xs font-semibold px-2 py-1 rounded-full">
                  40% off
                </span>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group cursor-pointer relative">
            <div className="bg-gray-100 aspect-[4/5] w-full md:w-[35vw] h-[50vh] md:h-[60vh] overflow-hidden mb-4 relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Image src={img2} alt='product 2' className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="space-y-2 absolute right-4 md:right-[60%] bottom-4 md:bottom-5">
              <h3 className="text-[14px] font-normal text-black">
                Light Grey Ankle Jeans
              </h3>
              <div className="text-[14px] font-medium text-black">
                Rs. 1,399.00
              </div>
              <div className="inline-block">
                <span className="bg-[#ffe800] text-black text-xs font-semibold px-2 py-1 rounded-full">
                  40% off
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
