"use client"
import React, { useState } from 'react';
import { ArrowUpDown, Grid, List } from 'lucide-react';
import Image from 'next/image';
import { fits } from '../Genz-Component/GenzFitsSection';
import { PT_Mono } from 'next/font/google';
import FilterDropdown from '../Common/Filter';
import GenzFitsSection from '../Genz-Component/GenzFitsSection';
import img1 from "../../../public/aanklefit.png";
import img2 from "../../../public/slimfit.png";
import img3 from "../../../public/relaxedfit.png";
import img4 from "../../../public/aanklefit.png";
import { useRouter } from 'next/navigation';

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const Herosection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeFilter = fits[activeSlide].title;
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const router = useRouter()

  // const jeanTypes = [
  //   { name: 'ANKLE FIT', count: 289, isActive: false },
  //   { name: 'SLIM FIT', count: 309, isActive: true },
  //   { name: 'RELAXED FIT', count: 348, isActive: false },
  //   { name: 'STRAIGHT FIT', count: 261, isActive: false }
  // ];

  const handleClick = () => {
    router.push("/ViewProduct")
  }

  return (
    <div className={`${ptMono.className} bg-white mt-20`}>
      {/* Top Navigation */}
      {/* <GenzFitsSection/> */}

      <GenzFitsSection activeSlide={activeSlide} setActiveSlide={setActiveSlide}/>
      {/* <h1>{fits[activeSlide].title}</h1> */}
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
          <div className="group cursor-pointer relative" onClick={handleClick}>
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
          <div className="group cursor-pointer relative" onClick={handleClick}>
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
