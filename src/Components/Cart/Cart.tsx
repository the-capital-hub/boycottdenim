"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem } from "@/types";
import type { JSX } from "react";
import cart from "../../../public/Cart 2.svg";
import { Minus, Plus } from "lucide-react";

export default function CartPage(): JSX.Element {
	const {
		items,
		isLoading,
		totals,
		fetchCart,
		updateQuantity,
		removeItem,
		getTotalItems,
	} = useCartStore();

	console.log("Items in cart:", items);

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
						<div className="bg-white rounded-lg shadow-sm p-12">
							<div className="text-gray-500 mb-6">
								<Image
									src={cart}
									alt="cart icon"
									width={50}
									className="w-40 h-40 mx-auto"
								/>
								<p className="text-xl">Your cart is empty</p>
							</div>
							<Link
								href="/Shop"
								className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-20 text-black">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-lg font-medium text-gray-900">
							{getTotalItems()} {getTotalItems() === 1 ? "Item" : "Items"}
						</h2>
					</div>

					<div className="divide-y divide-gray-200">
						{items.map((item, index: number) => {
							const product = item.product;
							const price = item?.price || 0;

							return (
								<div
									key={`${item.productId}-${item.size}-${item.color}-${index}`}
									className="p-6"
								>
									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0">
											<Image
												src={
													"/" + product?.images?.[0] ||
													"/placeholder.svg?height=120&width=120"
												}
												alt={product?.name || "Product"}
												width={120}
												height={120}
												className="rounded-md object-cover"
											/>
										</div>

										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-medium text-gray-900 mb-2">
												{product?.name || "Product Name"}
											</h3>

											<div className="text-sm text-gray-500 mb-2">
												{item.size && (
													<span className="mr-4">Size: {item.size}</span>
												)}
												{item.color && <span>Color: {item.color}</span>}
											</div>

											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity - 1,
																item.size,
																item.color
															)
														}
														disabled={isLoading || item.quantity <= 1}
														className="w-8 h-8 rounded-full border border-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
													>
														<Minus className="w-4 h-4 text-gray-500 cursor-pointer" />
													</button>

													<span className="text-lg text-black font-medium min-w-[2rem] text-center">
														{item.quantity}
													</span>

													<button
														onClick={() =>
															updateQuantity(
																item.productId,
																item.quantity + 1,
																item.size,
																item.color
															)
														}
														disabled={isLoading}
														className="w-8 h-8 rounded-full border border-black flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
													>
														<Plus className="w-4 h-4 text-black" />
													</button>
												</div>

												<div className="text-right">
													<div className="text-lg font-bold text-gray-900">
														₹{(price * item.quantity).toLocaleString()}
													</div>
													<div className="text-sm text-gray-500">
														₹{price.toLocaleString()} each
													</div>
												</div>
											</div>

											<button
												onClick={() =>
													removeItem(item.productId, item.size, item.color)
												}
												className="mt-3 text-sm text-red-600 hover:text-red-800"
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
						<div className="space-y-2 mb-4">
							<div className="flex items-center justify-between">
								<span className="text-gray-600">Subtotal</span>
								<span className="font-medium text-black">
									₹{totals.subtotal.toLocaleString()}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600">Shipping</span>
								<span className="font-medium text-black">
									{totals.shipping === 0
										? "Free"
										: `₹${totals.shipping.toLocaleString()}`}
								</span>
							</div>
							<div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-gray-200">
								<span className="text-gray-600">Total</span>
								<span className="font-medium text-black">
									₹{totals.total.toLocaleString()}
								</span>
							</div>
						</div>

						{totals.shipping === 0 && (
							<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
								<p className="text-sm text-green-800">
									🎉 You qualify for free shipping!
								</p>
							</div>
						)}

						<div className="flex space-x-4">
							<Link
								href="/products"
								className="flex-1 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-50 transition-colors"
							>
								Continue Shopping
							</Link>

							<Link
								href="/checkout"
								className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-md font-medium text-center hover:bg-yellow-500 transition-colors"
							>
								Proceed to Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
