"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import img from "../../../public/boycott-ex.png";
import genzLogo from "../../../public/boycotGenz.png";
import { PT_Mono } from "next/font/google";
import { ArrowRight } from "lucide-react";

const ptMono = PT_Mono({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});

const containerVariants: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			staggerChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, x: -30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6 },
	},
};

const buttonVariants: Variants = {
	initial: { scale: 1 },
	hover: {
		scale: 1.05,
		transition: { duration: 0.2 },
	},
	tap: { scale: 0.95 },
};

const imageVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.8, delay: 0.3 },
	},
};

const NewStyle = () => {
	return (
		<div
			className={`${ptMono.className} min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8`}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto"
			>
				{/* Header */}
				<motion.div variants={itemVariants} className="text-left mb-8 sm:mb-12">
					<h1 className="text-3xl sm:text-4xl lg:text-[64px] font-bold text-black tracking-wide">
						NEW STYLE NEW TRENDS
					</h1>
				</motion.div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
					{/* Left Panel */}
					<motion.div
						variants={itemVariants}
						className="bg-black text-white p-6 sm:p-8 lg:p-10 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl 
            h-[450px] sm:h-[500px] lg:h-[600px] flex flex-col justify-between"
					>
						<div>
							<div className="relative w-[200px] sm:w-[300px]">
								<Image
									src={genzLogo}
									alt="Genz Boycott Logo"
									className="object-contain"
								/>
							</div>
						</div>

						<motion.div
							variants={itemVariants}
							className="flex-1 flex flex-col justify-center"
						>
							<h3 className="text-2xl sm:text-4xl lg:text-[48px] pl-2 sm:pl-4 font-bold mb-4">
								EXCLUSIVE MENSWEAR
							</h3>
							<div className="pl-2 sm:pl-4">
								<p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam.
								</p>
							</div>
						</motion.div>

						<motion.div variants={itemVariants}>
							<h3 className="text-2xl sm:text-3xl lg:text-[40px] pl-2 sm:pl-4 font-bold mb-4">
								GET UPTO 50% OFF
							</h3>
							<motion.button
								variants={buttonVariants}
								initial="initial"
								whileHover="hover"
								whileTap="tap"
								className="bg-[#ffe800] text-black px-6 py-3 rounded-full flex justify-center items-center gap-2 sm:gap-4 font-bold text-sm sm:text-base 
                         hover:bg-yellow-400 transition-colors duration-200 shadow-lg cursor-pointer"
							>
								Shop Now <ArrowRight size={18} />
							</motion.button>
						</motion.div>
					</motion.div>

					{/* Right Panel */}
					<motion.div
						variants={imageVariants}
						className="relative h-[450px] sm:h-[500px] lg:h-[600px] rounded-lg lg:rounded-r-lg lg:rounded-l-none overflow-hidden shadow-2xl"
					>
						<Image
							src={img}
							alt="Denim jeans collection"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					</motion.div>
				</div>

				{/* Bottom Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2, duration: 0.6 }}
					className="flex justify-center mt-8 sm:mt-12"
				>
					<div className="flex space-x-2">
						<div className="w-8 h-2 bg-gray-800 rounded-full"></div>
						<div className="w-8 h-2 bg-gray-400 rounded-full"></div>
						<div className="w-8 h-2 bg-gray-400 rounded-full"></div>
						<div className="w-8 h-2 bg-gray-400 rounded-full"></div>
						<div className="w-8 h-2 bg-gray-400 rounded-full"></div>
						<div className="w-8 h-2 bg-gray-400 rounded-full"></div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default NewStyle;
