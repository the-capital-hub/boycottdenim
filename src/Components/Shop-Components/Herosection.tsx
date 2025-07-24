"use client"
import React, { useState, useEffect } from 'react';
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
import MoreProducts from './MoreProducts';
import { image } from 'motion/react-m';


type Product = {
  _id?: string;
  name: string;
  price: number;
  discount?: number;
  images?: string;
  // Add any other fields as needed
};




const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  products: Product[];
}

const Herosection: React.FC<Props> = ({ products }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeFilter = fits[activeSlide].title;
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const page = 1;
  const limit = 8;


  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch(`/api/product/getAllProducts?page=${page}&limit=${limit}`);
  //     const data = await res.json();
  //     console.log("data is ",data);
      
  //     setProducts(data.products);
  //   } catch (err) {
  //     console.error("Failed to fetch products:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // console.log("pro",products);


  const firstTwoProducts = products.slice(0, 2);
  const remainingProducts = products.slice(2);
  

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  

  const handleClick = (id: string | undefined) => {
    console.log(id);
    
    router.push(`/api/product/${id}/getProductById`);
  };

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
      
  <div>     
  <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-[15rem]">
    {firstTwoProducts.map((product, index) => (
      <div key={index} className="group cursor-pointer relative" onClick={() => handleClick(product._id)}>
        <div className="bg-gray-100 aspect-[4/5] w-full md:w-[40vw] h-[50vh] md:h-[60vh] overflow-hidden mb-4 relative">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Image
              src={img1} // Replace with product.image if available
              alt={product.name || 'product'}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-2 absolute left-4 md:left-2 bottom-4 md:bottom-5">
          <h3 className="text-[14px] font-normal text-black">
            {product.name || "Untitled"}
          </h3>
          <div className="text-[14px] font-medium text-black">
            Rs .{product.price || "0.00"}
          </div>
          {/* {product.discount && ( */}
            <div className="inline-block">
              <span className="bg-[#ffe800] text-black text-xs font-semibold px-2 py-1 rounded-full">
                {product.discount || "40% off" }  
              </span>
            </div>
          {/* // )} */}
        </div>
      </div>
    ))}
  </div>
</div>
</div>

</div>  
    
  );
};





export default Herosection;
