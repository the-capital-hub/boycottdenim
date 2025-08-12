"use client";

import React from "react";
import { motion } from "framer-motion";

const scrollingText = "UNITED BY DENIM + ";

// const MarqueeRow = ({ reverse = false }) => (
// 	<div className="overflow-hidden whitespace-nowrap bg-[#ffe800] h-full w-full">
// 		<motion.div
// 			className="flex gap-6 sm:gap-8 lg:gap-12 w-max items-center h-full"
// 			animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
// 			transition={{
// 				duration: 60,
// 				repeat: Infinity,
// 				ease: "linear",
// 			}}
// 		>
// 			{Array.from({ length: 20 }).map((_, i) => (
// 				<span
// 					key={i}
// 					className="text-black font-mono font-bold text-lg sm:text-xl lg:text-2xl tracking-wider sm:tracking-widest flex-shrink-0 uppercase"
// 				>
// 					{scrollingText}
// 				</span>
// 			))}
// 		</motion.div>
// 	</div>
// );

const MarqueeRow = ({ reverse = false }) => (
	<div className="overflow-hidden whitespace-nowrap bg-[#ffe800] h-full w-full py-2 md:py-4 lg:py-6">
		<motion.div
			className="flex gap-8"
			animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
			transition={{
				duration: 30,
				repeat: Infinity,
				ease: "linear",
			}}
		>
			{Array.from({ length: 20 }).map((_, i) => (
				<span
					key={i}
					className="text-black font-mono font-bold text-lg px-4 tracking-widest"
				>
					{scrollingText}
				</span>
			))}
		</motion.div>
	</div>
);

const UnitedByDenim = () => {
	return (
		<div className="w-full max-w-full overflow-hidden">
			<div className="text-black py-4 sm:py-6 lg:py-0 my-0 font-bold italic bg-white text-2xl sm:text-4xl md:text-5xl lg:text-[90px] text-center mb-0 pb-0 leading-none px-4">
				<p className="break-words">Made for India, Made for you!</p>
			</div>
			<div className="relative w-full h-[20vh] sm:h-[40vh] overflow-hidden">
				<div className="absolute w-[160%] h-[3rem] sm:h-[4rem] lg:h-[5rem] bg-[#ffe800] rotate-[8deg] top-[20%] -left-[50%] flex items-center justify-center shadow-lg border-y-[2px] border-[#ffe800]">
					<div className="w-full h-full overflow-hidden">
						<MarqueeRow reverse={true} />
					</div>
				</div>
				<div className="absolute w-[160%] h-[3rem] sm:h-[4rem] lg:h-[5rem] bg-[#ffe800] rotate-[-8deg] top-[55%] -left-[50%] flex items-center justify-center shadow-lg border-y-[2px] border-[#ffe800]">
					<div className="w-full h-full overflow-hidden">
						<MarqueeRow reverse={false} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UnitedByDenim;
