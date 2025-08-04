"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PT_Mono } from "next/font/google";
import brownjean from "../../../public/brownjean.png";
import bluejean from "../../../public/bluejean.png";
import grayjean from "../../../public/grayishjean.png";

const ptMono = PT_Mono({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});

const ItsAboutBoycottSection = () => {
	return (
		<div className="relative bg-white px-4 sm:px-6 lg:px-8 py-10">
			{/* Vertical Dotted Lines */}
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute h-full border-l border-dotted border-2 border-gray-300"
						style={{
							left: `${6 + i * 22}%`,
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

			{/* Main Content */}
			<div className="relative z-10 max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Left Side - Main Product */}
					<motion.div
						className="lg:w-1/2 w-full h-auto"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="p-4 rounded-lg">
							<div className="aspect-[3/4] rounded-lg mb-4 overflow-hidden">
								<Image
									src={brownjean}
									alt="Light Grey Ankle Jeans"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="text-sm text-gray-600 mb-1 text-center">
								Light Grey Ankle Jeans
							</div>
							<div className="flex items-center justify-center gap-2">
								<span className="text-lg font-semibold text-black">
									Rs. 1,399.00
								</span>
								<span className="bg-[#ffe800] text-black text-xs px-2 py-1 rounded-full font-bold">
									40% OFF
								</span>
							</div>
						</div>
					</motion.div>

					{/* Right Side */}
					<div className="lg:w-2/3 w-full">
						{/* Header */}
						<motion.div
							className="mb-8"
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							<div
								className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 ${ptMono.className}`}
							>
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
									IT&apos;S ABOUT <br className="sm:hidden" />
									BOYCOTT @ 25
								</h1>
								<motion.button
									className="hover:bg-[#ffe800] hover:border-[#ffe800] cursor-pointer border h-8 rounded-3xl w-20 mx-auto border-black transition-colors"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<ArrowRight className="w-6 h-6 mx-auto text-black" />
								</motion.button>
							</div>
							<p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mt-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation.
							</p>
						</motion.div>

						{/* Product Grid */}
						<div className="p-4 sm:p-6 rounded-lg">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Product 1 */}
								<motion.div
									className="text-center"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									whileHover={{ y: -10 }}
								>
									<div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
										<Image
											src={grayjean}
											alt="Light Grey Ankle Jeans"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="text-sm text-gray-600 mb-1">
										Light Grey Ankle Jeans
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="text-lg font-semibold text-black">
											Rs. 1,399.00
										</span>
										<span className="bg-[#ffe800] text-black rounded-full text-xs px-2 py-1 font-bold">
											40% OFF
										</span>
									</div>
								</motion.div>

								{/* Product 2 */}
								<motion.div
									className="text-center"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									whileHover={{ y: -10 }}
								>
									<div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
										<Image
											src={bluejean}
											alt="Light Grey Ankle Jeans"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="text-sm text-gray-600 mb-1">
										Light Grey Ankle Jeans
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="text-lg font-semibold text-black">
											Rs. 1,599.00
										</span>
										<span className="bg-[#ffe800] text-black rounded-full text-xs px-2 py-1 font-bold">
											40% OFF
										</span>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>

				{/* Explore Button */}
				<motion.div
					className="mt-6 flex justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<motion.button
						className="bg-[#ffe800] hover:bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Explore more on this shop
						<ArrowRight className="w-4 h-4" />
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
};

export default ItsAboutBoycottSection;
