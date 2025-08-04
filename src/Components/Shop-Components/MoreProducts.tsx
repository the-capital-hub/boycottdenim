"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import img1 from "../../../public/shop3.png";
import img2 from "../../../public/shop4.png";
import img3 from "../../../public/shop4.png";
import img4 from "../../../public/shop4.png";
import img5 from "../../../public/shop4.png";
import img6 from "../../../public/shop3.png";
import { PT_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

const ptMono = PT_Mono({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});

type Product = {
	_id?: string;
	name: string;
	price: number;
	discount?: number;
	image?: string;
	// Add any other fields as needed
};

interface Props {
	products: Product[];
}

const MoreProducts: React.FC<Props> = ({ products }) => {
	const router = useRouter();

	const handleClick = () => {
		// router.push("/ViewProduct")
	};

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const cardVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
		hover: {
			y: -5,
			scale: 1.02,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	const paginationVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.8,
				duration: 0.5,
			},
		},
	};

	return (
		<div className={`${ptMono.className} w-full max-w-7xl mx-auto px-4 py-5`}>
			{/* Product Grid */}
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{products.map((product) => (
					<motion.div
						key={product._id}
						className="bg-white group cursor-pointer"
						variants={cardVariants}
						whileHover="hover"
						onClick={handleClick}
					>
						{/* Product Image Container */}
						<div className="relative aspect-[3/4]  bg-gray-100 overflow-hidden mb-3">
							<Image
								src={img1}
								alt={product.name}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300 pb-12"
							/>
							<div className="space-y-1 top-[90%] relative left-4">
								<h3 className="text-sm text-gray-800 font-normal">
									{product.name}
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

			{/* Pagination */}
			<motion.div
				className="flex justify-center items-center gap-2 "
				variants={paginationVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.button
					className="w-8 h-8 bg-[#ffe800] text-black font-bold cursor-pointer rounded flex items-center justify-center hover:bg-yellow-500 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					1
				</motion.button>
				<motion.button
					className="w-8 h-8 bg-gray-200 text-gray-600 font-bold rounded cursor-pointer flex items-center justify-center hover:bg-gray-300 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					2
				</motion.button>
				<motion.button
					className="w-8 h-8 bg-gray-200 text-gray-600 font-bold rounded cursor-pointer flex items-center justify-center hover:bg-gray-300 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					3
				</motion.button>
				<motion.button
					className="w-8 h-8 bg-gray-200 text-gray-600 font-bold rounded cursor-pointer flex items-center justify-center hover:bg-gray-300 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					4
				</motion.button>
				<motion.button
					className="w-8 h-8 bg-gray-200 text-gray-600 font-bold rounded cursor-pointer flex items-center justify-center hover:bg-gray-300 transition-colors"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					5
				</motion.button>
			</motion.div>
		</div>
	);
};

export default MoreProducts;
