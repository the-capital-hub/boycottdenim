"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Heart, List } from "lucide-react";
import { useRouter } from "next/navigation";
import img1 from "../../../public/view-prod-1.png";
import img2 from "../../../public/viewprod2.png";
import img3 from "../../../public/viewprod3.png";
import img4 from "../../../public/viewprod-3.png";
import Image from "next/image";
import { PT_Mono } from "next/font/google";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { Product, Category } from "@/types";

const ptMono = PT_Mono({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});

type ViewSectionProps = {
        product: {
                _id: string;
                name: string;
                price: number;
                discount?: number;
                image?: string;
                description?: string;
                color?: string;
                size?: string[];
                stock: number;
                images: string[];
                gender: "men" | "women";
                categories: Category;
        };
};

const ViewSection: React.FC<ViewSectionProps> = ({ product }) => {
	const router = useRouter();
	const { addItem, isLoading: cartLoading } = useCartStore();
	const { setCheckoutType, initializeCheckout } = useCheckoutStore();

	const [selectedColor, setSelectedColor] = useState("Black");
	const [selectedWaistSize, setSelectedWaistSize] = useState("32");
	const [selectedInseamSize, setSelectedInseamSize] = useState("32");
	const [quantity, setQuantity] = useState(1);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [viewMode, setViewMode] = useState("grid");
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [isBuyingNow, setIsBuyingNow] = useState(false);

	// Using your imported images
	const smallImages = [img1, img2, img3, img4];

	// Convert the product to match our Product interface
        const convertedProduct: Product = {
                _id: product._id,
                name: product.name,
                description: product.description || "Premium quality product",
                price: product.price,
                stock: product.stock,
                images: product.images,
                gender: product.gender,
                categories: product.categories,
                favorites: [],
                createdAt: new Date(),
                updatedAt: new Date(),
        };

	// Handle Add to Cart functionality
	const handleAddToCart = async () => {
		if (isAddingToCart || cartLoading) return;

		setIsAddingToCart(true);
		try {
			// Create size string combining waist and inseam
			const sizeString = `W${selectedWaistSize}/L${selectedInseamSize}`;

			await addItem(convertedProduct, quantity, sizeString, selectedColor);
		} catch (error) {
			console.error("Error adding to cart:", error);
		} finally {
			setIsAddingToCart(false);
		}
	};

	// Handle Buy Now functionality
	const handleBuyNow = async () => {
		if (isBuyingNow) return;

		setIsBuyingNow(true);
		try {
			// Set checkout type to buy now
			setCheckoutType("buyNow", convertedProduct, quantity);

			// Create cart item for direct buy
			const sizeString = `W${selectedWaistSize}/L${selectedInseamSize}`;
			const directBuyItem = {
				id: convertedProduct._id,
				productId: convertedProduct._id,
				product: convertedProduct,
				quantity: quantity,
				price: convertedProduct.price,
				size: sizeString,
				color: selectedColor,
			};

			// Initialize checkout with the single item
			initializeCheckout([directBuyItem], convertedProduct, quantity);

			// Navigate to checkout page with product details
                        const searchParams = new URLSearchParams({
                                productId: convertedProduct._id.toString(),
                                quantity: quantity.toString(),
                                size: sizeString,
                                color: selectedColor,
                        });

			router.push(`/checkout?${searchParams.toString()}`);
		} catch (error) {
			console.error("Error with buy now:", error);
		} finally {
			setIsBuyingNow(false);
		}
	};

	return (
		<div
			className={`${ptMono.className} min-h-screen mx-auto w-full max-w-7xl bg-white mt-22`}
		>
			{/* Header */}
			<div className="flex items-center justify-between p-4 text-black">
				<h1 className="text-lg font-medium">{product.name}</h1>
				<div className="flex items-center gap-4">
					{/* <div className="flex items-center  text-white px-3 py-1 rounded-full text-sm">
          <FilterDropdown isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
          </div> */}
					{/* <button className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-black transition-colors">
                <ArrowUpDown size={16} />
                SORT BY
              </button> */}

					<div className="flex items-center gap-2">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-1 transition-colors ${
								viewMode === "grid"
									? "text-black"
									: "text-gray-400 cursor-pointer hover:text-gray-600"
							}`}
						>
							<Grid size={18} />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-1 transition-colors ${
								viewMode === "list"
									? "text-black"
									: "text-gray-400 cursor-pointer hover:text-gray-600"
							}`}
						>
							<List size={18} />
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 lg:p-8 gap-8">
				{/* Left Side - Images */}
				<motion.div
					className="flex-1 lg:max-w-2xl"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="grid grid-cols-2 gap-4">
						{smallImages.map((img, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="cursor-pointer"
							>
								<Image
									src={img || "/placeholder.svg"}
									alt={`Product view ${index + 1}`}
									className="w-full h-50 lg:h-[80vh] object-cover rounded-lg"
								/>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Right Side - Product Details */}
				<motion.div
					className="flex-1 lg:max-w-lg"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{/* Trending Badge */}
					<div className="mb-4">
						<span className="text-sm lg:text-[48px] text-black font-medium">
							Trending
						</span>
					</div>

					{/* Product Title */}
					<h2 className="text-2xl lg:text-[38px] text-black font-bold mb-4">
						{product.name}
					</h2>

					{/* Price */}
					<div className="flex items-center gap-2 mb-6">
						<span className="text-2xl lg:text-[28px] text-black  font-bold">
							Rs. {product.price}
						</span>
						<span className="bg-yellow-400 text-black px-2 py-1 text-xs font-medium rounded">
							40% OFF
						</span>
					</div>

					{/* Stock Status */}
					<div className="mb-4">
						{product.stock > 0 ? (
							<span className="text-green-600 text-sm font-medium">
								In Stock ({product.stock} available)
							</span>
						) : (
							<span className="text-red-600 text-sm font-medium">
								Out of Stock
							</span>
						)}
					</div>

					{/* Color Selection */}
					<div className="mb-6">
						<h3 className="font-medium text-black mb-3">Color</h3>
						<div className="flex gap-3">
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className={`w-18 h-18 rounded-lg cursor-pointer border-2 ${
									selectedColor === "Black" ? "border-black" : "border-gray-200"
								}`}
								onClick={() => setSelectedColor("Black")}
							>
								<Image
									src={img2 || "/placeholder.svg"}
									alt="Black"
									className="w-full h-full object-cover rounded-lg"
								/>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className={`w-18 h-18 rounded-lg cursor-pointer border-2 ${
									selectedColor === "Brown" ? "border-black" : "border-gray-200"
								}`}
								onClick={() => setSelectedColor("Brown")}
							>
								<Image
									src={img3 || "/placeholder.svg"}
									alt="Brown"
									className="w-full h-full object-cover rounded-lg"
								/>
							</motion.div>
						</div>
						<div className="flex gap-12 mt-2 text-sm">
							<span className="text-black">Black</span>
							<span className="text-black">Brown</span>
						</div>
					</div>

					{/* Waist Size */}
					<div className="mb-6 text-black">
						<h3 className="font-medium mb-3 lg:text-[24px]">Waist Size</h3>
						<div className="flex gap-2">
							{["28", "30", "32", "34", "36"].map((size) => (
								<motion.button
									key={size}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`w-12 h-12 border rounded-lg ${
										selectedWaistSize === size
											? "bg-black text-white"
											: "border-gray-300"
									}`}
									onClick={() => setSelectedWaistSize(size)}
								>
									{size}
								</motion.button>
							))}
						</div>
					</div>

					{/* Inseam Size */}
					<div className="mb-6 text-black">
						<h3 className="font-medium mb-3 lg:text-[24px]">Inseam Size</h3>
						<div className="flex gap-2">
							{["28", "30", "32", "34", "36"].map((size) => (
								<motion.button
									key={size}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`w-12 h-12 border rounded-lg ${
										selectedInseamSize === size
											? "bg-black text-white"
											: "border-gray-300"
									}`}
									onClick={() => setSelectedInseamSize(size)}
								>
									{size}
								</motion.button>
							))}
						</div>
					</div>

					{/* Quantity */}
					<div className="mb-6 flex ">
						<div className="flex items-center gap-4 w-30 rounded-full border text-black border-black">
							<motion.button
								className="w-10 h-10  flex items-center cursor-pointer justify-center"
								onClick={() => setQuantity(Math.max(1, quantity - 1))}
								disabled={quantity <= 1}
							>
								-
							</motion.button>
							<span className="font-medium">{quantity}</span>
							<motion.button
								className="w-10 h-10  text-black flex items-center cursor-pointer justify-center"
								onClick={() =>
									setQuantity(Math.min(product.stock, quantity + 1))
								}
								disabled={quantity >= product.stock}
							>
								+
							</motion.button>
						</div>
						<motion.button className="w-10 h-10 ml-3 bg-black text-white rounded-full cursor-pointer ">
							<Heart className="mx-auto" />
						</motion.button>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3 mb-8 text-black">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="px-6 py-2 border border-black rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleAddToCart}
							disabled={product.stock === 0 || isAddingToCart || cartLoading}
						>
							{isAddingToCart ? "Adding..." : "Add to Cart"}
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="px-6 py-2 bg-[#ffe800] text-black rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleBuyNow}
							disabled={product.stock === 0 || isBuyingNow}
						>
							{isBuyingNow ? "Processing..." : "Buy Now"}
						</motion.button>
					</div>

					{/* Product Description */}
					<div>
						<h3 className="font-medium mb-3 text-black text-[20px]">
							Product Description
						</h3>
						<p className="text-gray-600 lg:text-[18px] text-sm leading-relaxed">
							{product.description}
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ViewSection;
