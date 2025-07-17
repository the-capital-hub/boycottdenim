'use client'
import { useState } from "react";
import man from "../../../public/man.png"
import Image from "next/image";
import shorter from "../../../public/shorter.png"
import proptionate from "../../../public/proportionate.png"
import perfect from "../../../public/perfect.png"
import { a } from "motion/react-m";

const carouselData = [
  {
    title: "Perfect Rise",
    text: "Most pants have a tapered leg. So when shortened, they lose taper—resulting in oversized leg openings. Not here!",
    image: perfect,
  },
  {
    title: "Shorter Inseams",
    text: "Our pants are designed with a rise that fits a shorter torso perfectly.",
    image: shorter,
  },
  {
    title: "Proportionate Leg Opening",
    text: "No need to hem! Our inseams are made to fit your height right out of the box.",
    image: proptionate,
  },
];

export default function FitGuide() {
    const [current, setCurrent] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const nextSlide = () => {
      const next = (activeIndex + 1) % carouselData.length;
    //   setCurrent(next);
      setActiveIndex(next);
    };
    
    const prevSlide = () => {
      const prev = activeIndex === 0 ? carouselData.length - 1 : activeIndex - 1;
    //   setCurrent(prev);
      setActiveIndex(prev);
    };
  return (
    <div className="px-12 py-12 md:px-16 bg-white mt-12">
      <h1 className="text-5xl font-semibold mb-4 text-center font-leMonde">Fit Guide</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 font-stock">
        At Peter Manning, we developed a size system based on height, weight and body type, so you can find a fit that’s right for you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Image with Labels */}
        <div className="relative">
          <Image src={man} alt={"FitGuideModel"} className="w-full" />
          {/* <div className={`absolute right-66 top-[14%] w-4 h-4 rounded-full border-1 ${activeIndex === 0 ? 'bg-blue-900 border-blue-900' : 'border-black-200 bg-white'}`}/>
            <div className={`absolute right-16 top-[13%] text-m ${activeIndex === 0 ? 'font-bold' : 'font-medium text-gray-800'}`} >
                Properly Scaled Details
            </div> */}
           
           {/* <div className={`absolute right-36 top-[25%] w-4 h-4 rounded-full border-1 ${activeIndex === 1 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`}/>
            <div className={`absolute right-0 top-[24.5%] text-m ${activeIndex === 1 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                No Pirate Arms
           </div>
           <div className={`absolute right-83 top-[42%] w-4 h-4 rounded-full border-1 ${activeIndex === 2 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`}/>
            <div className={`absolute right-36 top-[41.5%] text-m ${activeIndex === 2 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                Shorter Body Length
           </div>
           <div className={`absolute right-118 top-[48%] w-4 h-4 rounded-full border-1 ${activeIndex === 3 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`}/>
            <div className={`absolute right-124 top-[47.8%] text-sm ${activeIndex === 3 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                Proper Sleeve Length
           </div> */}
           <div className={`absolute right-80 top-[53%] w-4 h-4 rounded-full border-1 ${activeIndex === 0 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`} onClick={()=>setActiveIndex(0)}/>
            <div className={`absolute right-46 top-[52.5%] text-m ${activeIndex === 0 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                Perfect Rise
           </div>
           <div className={`absolute right-89 top-[83%] w-4 h-4 rounded-full border-1 ${activeIndex === 1 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`} onClick={()=>setActiveIndex(1)}/>
            <div className={`absolute right-96 top-[82.5%] text-m ${activeIndex === 1 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                Shorter Inseams
           </div>
           <div className={`absolute right-42 top-[88%] w-4 h-4 rounded-full border-1 ${activeIndex === 2 ? 'bg-blue-900 border-blue-900' : 'border-black-400 bg-white'}`} onClick={()=>setActiveIndex(2)}/>
            <div className={`absolute left-130 top-[87.5%] text-m ${activeIndex === 2 ? 'font-bold' : 'font-bold text-gray-800'}`} >
                Proportionate Leg Opening
           </div>
    </div>

        {/* Right Side: Carousel */}
        <div className="relative w-full max-w-3xl mx-auto">
  {/* Carousel Image */}
  <Image
    src={carouselData[activeIndex].image}
    alt={carouselData[activeIndex].title}
    className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-6"
  />

  {/* Controls - Positioned inside the image */}
  <div className="absolute top-[38%] left-0 right-0 flex justify-between px-4 -translate-y-1/2">
    <button
      onClick={prevSlide}
      className="bg-white/80 text-black px-3 py-1 rounded-full shadow hover:bg-white transition"
    >
      ←
    </button>
    <button
      onClick={nextSlide}
      className="bg-white/80 text-black px-3 py-1 rounded-full shadow hover:bg-white transition"
    >
      →
    </button>
  </div>

  {/* Title and Text */}
  <h2 className="text-xl font-semibold mb-2">{carouselData[activeIndex].title}</h2>
  <p className="text-gray-600 mb-6">{carouselData[activeIndex].text}</p>
</div>

      </div>
    </div>
  );
}
