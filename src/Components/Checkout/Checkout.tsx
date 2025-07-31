"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { toast } from "react-hot-toast";
import type { Product, CartItem, ObjectId } from "@/types";
import type { JSX } from "react/jsx-runtime";

// Product fetching function
async function fetchProductById(productId: ObjectId): Promise<Product | null> {
	try {
		const response = await fetch(`/api/product/${productId}`);
		const data = await response.json();

		if (response.ok && data.success) {
			return data.data;
		} else {
			console.error("Failed to fetch product:", data.error);
			toast.error(data.error || "Failed to fetch product");
			return null;
		}
	} catch (error) {
		console.error("Error fetching product:", error);
		toast.error("Failed to fetch product details");
		return null;
	}
}

export default function CheckoutPage(): JSX.Element {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { items: cartItems } = useCartStore();
	const {
		checkoutType,
		customerInfo,
		deliveryAddress,
		orderSummary,
		currentStep,
		isLoading,
		setCheckoutType,
		setCustomerInfo,
		setDeliveryAddress,
		setCurrentStep,
		initializeCheckout,
		processOrder,
		validateStep,
	} = useCheckoutStore();

	const [isLoadingProduct, setIsLoadingProduct] = useState(false);

	useEffect(() => {
		const initializeCheckoutData = async () => {
			// Check if this is a direct buy from URL params
			const productId = searchParams.get("productId");
			const quantity = searchParams.get("quantity");
			const size = searchParams.get("size");
			const color = searchParams.get("color");

			if (productId) {
				// Direct buy flow - fetch product details
				setIsLoadingProduct(true);
				try {
					const product = await fetchProductById(productId);
					console.log("product", product);

					if (product) {
						const parsedQuantity = Number.parseInt(quantity || "1");

						// Validate stock availability
						if (product.stock < parsedQuantity) {
							toast.error(`Only ${product.stock} items available in stock`);
							// router.push("/Shop");
							return;
						}

						setCheckoutType("buyNow", product, parsedQuantity);

						// Create a cart item for direct buy with size and color
						const directBuyItem: CartItem = {
							id: product._id,
							productId: product._id,
							product: product,
							quantity: parsedQuantity,
							price: product.price,
							size: size || undefined,
							color: color || undefined,
						};

						initializeCheckout([directBuyItem], product, parsedQuantity);
					} else {
						// Product not found, redirect to products page
						toast.error("Product not found");
						// router.push("/Shop");
					}
				} catch (error) {
					console.error("Error initializing direct buy:", error);
					toast.error("Failed to load product details");
					// router.push("/Shop");
				} finally {
					setIsLoadingProduct(false);
				}
			} else {
				// Cart checkout flow
				if (cartItems.length === 0) {
					toast.error("Your cart is empty");
					router.push("/cart");
					return;
				}

				setCheckoutType("cart");
				initializeCheckout(cartItems);
			}
		};

		initializeCheckoutData();
	}, [searchParams, cartItems, setCheckoutType, initializeCheckout, router]);

	const handleCustomerInfoChange = (
		field: keyof typeof customerInfo,
		value: string
	): void => {
		setCustomerInfo({ [field]: value });
	};

	const handleAddressChange = (
		field: keyof typeof deliveryAddress,
		value: string
	): void => {
		setDeliveryAddress({ [field]: value });
	};

	const handleNextStep = (): void => {
		if (validateStep(currentStep)) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = (): void => {
		setCurrentStep(currentStep - 1);
	};

	const handlePlaceOrder = async (): Promise<void> => {
		const result = await processOrder("687e2ef351b622a5b26d78d5"); // Replace with actual user ID from auth
		if (result.success && result.orderId && result.orderNumber) {
			router.push(
				`/order-success?orderId=${result.orderId}&orderNumber=${result.orderNumber}`
			);
		}
	};

	// Loading state while fetching product
	if (isLoadingProduct) {
		return (
			<div className="min-h-screen bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Loading Product Details...
						</h1>
						<p className="text-gray-600">
							Please wait while we fetch the product information.
						</p>
					</div>
				</div>
			</div>
		);
	}

	// No items to checkout
	if (orderSummary.items.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
						<div className="bg-white rounded-lg shadow-sm p-12">
							<div className="text-gray-500 mb-6">
								<svg
									className="mx-auto h-24 w-24 mb-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1}
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
								<p className="text-xl">No items to checkout</p>
							</div>
							<button
								onClick={() => router.push("/products")}
								className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
							>
								Continue Shopping
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Checkout
						{checkoutType === "buyNow" && (
							<span className="text-lg font-normal text-gray-600 ml-2">
								(Direct Buy)
							</span>
						)}
					</h1>

					{/* Progress Steps */}
					<div className="mt-6 flex items-center">
						{[1, 2, 3].map((step: number) => (
							<div key={step} className="flex items-center">
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
										step <= currentStep
											? "bg-yellow-400 text-black"
											: "bg-gray-200 text-gray-500"
									}`}
								>
									{step}
								</div>
								<div
									className={`ml-2 text-sm ${
										step <= currentStep ? "text-gray-900" : "text-gray-500"
									}`}
								>
									{step === 1 && "Customer Info"}
									{step === 2 && "Delivery Address"}
									{step === 3 && "Review & Place Order"}
								</div>
								{step < 3 && <div className="mx-4 w-8 h-0.5 bg-gray-200"></div>}
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm p-6">
							{/* Step 1: Customer Information */}
							{currentStep === 1 && (
								<div>
									<h2 className="text-xl font-semibold text-gray-900 mb-6">
										Customer Information
									</h2>
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Full Name *
											</label>
											<input
												type="text"
												required
												value={customerInfo.fullName}
												onChange={(e) =>
													handleCustomerInfoChange("fullName", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
												placeholder="Enter your full name"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Email *
											</label>
											<input
												type="email"
												required
												value={customerInfo.email}
												onChange={(e) =>
													handleCustomerInfoChange("email", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
												placeholder="Enter your email address"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Phone Number *
											</label>
											<input
												type="tel"
												required
												value={customerInfo.phone}
												onChange={(e) =>
													handleCustomerInfoChange("phone", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
												placeholder="Enter your 10-digit phone number"
												maxLength={10}
											/>
										</div>
									</div>
								</div>
							)}

							{/* Step 2: Delivery Address */}
							{currentStep === 2 && (
								<div>
									<h2 className="text-xl font-semibold text-gray-900 mb-6">
										Delivery Address
									</h2>
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Address *
											</label>
											<textarea
												required
												rows={3}
												value={deliveryAddress.address}
												onChange={(e) =>
													handleAddressChange("address", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
												placeholder="Enter your complete address"
											/>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													City *
												</label>
												<input
													type="text"
													required
													value={deliveryAddress.city}
													onChange={(e) =>
														handleAddressChange("city", e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
													placeholder="Enter city"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													State *
												</label>
												<input
													type="text"
													required
													value={deliveryAddress.state}
													onChange={(e) =>
														handleAddressChange("state", e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
													placeholder="Enter state"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													ZIP Code *
												</label>
												<input
													type="text"
													required
													value={deliveryAddress.zipCode}
													onChange={(e) =>
														handleAddressChange("zipCode", e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
													placeholder="Enter 6-digit ZIP code"
													maxLength={6}
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Country *
												</label>
												<select
													required
													value={deliveryAddress.country}
													onChange={(e) =>
														handleAddressChange("country", e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
												>
													<option value="India">India</option>
													<option value="USA">USA</option>
													<option value="UK">UK</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Step 3: Review & Place Order */}
							{currentStep === 3 && (
								<div>
									<h2 className="text-xl font-semibold text-gray-900 mb-6">
										Review Your Order
									</h2>

									<div className="space-y-6">
										<div>
											<h3 className="font-medium text-gray-900 mb-2">
												Customer Information
											</h3>
											<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
												<p>
													<strong>Name:</strong> {customerInfo.fullName}
												</p>
												<p>
													<strong>Email:</strong> {customerInfo.email}
												</p>
												<p>
													<strong>Phone:</strong> {customerInfo.phone}
												</p>
											</div>
										</div>

										<div>
											<h3 className="font-medium text-gray-900 mb-2">
												Delivery Address
											</h3>
											<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
												<p>{deliveryAddress.address}</p>
												<p>
													{deliveryAddress.city}, {deliveryAddress.state} -{" "}
													{deliveryAddress.zipCode}
												</p>
												<p>{deliveryAddress.country}</p>
											</div>
										</div>

										<div>
											<h3 className="font-medium text-gray-900 mb-2">
												Payment Method
											</h3>
											<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
												<p>💰 Cash on Delivery (COD)</p>
												<p className="text-xs text-gray-500 mt-1">
													Pay when your order is delivered to your doorstep
												</p>
											</div>
										</div>

										{checkoutType === "buyNow" && (
											<div>
												<h3 className="font-medium text-gray-900 mb-2">
													Order Type
												</h3>
												<div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
													<p>🚀 Direct Buy - Express Checkout</p>
													<p className="text-xs text-blue-600 mt-1">
														This item will be processed immediately without
														affecting your cart
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
								{currentStep > 1 && (
									<button
										onClick={handlePrevStep}
										className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
									>
										Previous
									</button>
								)}

								{currentStep < 3 ? (
									<button
										onClick={handleNextStep}
										disabled={!validateStep(currentStep)}
										className="ml-auto px-6 py-2 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Next
									</button>
								) : (
									<button
										onClick={handlePlaceOrder}
										disabled={isLoading}
										className="ml-auto px-6 py-2 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isLoading ? "Processing..." : "Place Order"}
									</button>
								)}
							</div>
						</div>
					</div>

					{/* Order Summary Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-6">
								Order Summary
							</h2>

							<div className="space-y-4 mb-6">
								{orderSummary.items.map((item: CartItem, index: number) => {
									const product = item.product;
									const price = product?.price || item.price || 0;

									return (
										<div
											key={`${item.productId}-${index}`}
											className="flex items-center space-x-4"
										>
											<Image
												src={
													// product?.images?.[0] ||
													"/placeholder.svg?height=60&width=60"
												}
												alt={product?.name || "Product"}
												width={60}
												height={60}
												className="rounded-md object-cover"
											/>

											<div className="flex-1">
												<h3 className="font-medium text-gray-900">
													{product?.name || "Product Name"}
												</h3>
												<div className="text-sm text-gray-500">
													Qty: {item.quantity}
													{item.size && ` • Size: ${item.size}`}
													{item.color && ` • Color: ${item.color}`}
												</div>
												{product?.stock && product.stock < 10 && (
													<div className="text-xs text-orange-600 mt-1">
														Only {product.stock} left in stock
													</div>
												)}
											</div>

											<div className="text-right">
												<div className="font-medium text-gray-900">
													₹{(price * item.quantity).toLocaleString()}
												</div>
												<div className="text-xs text-gray-500">
													₹{price.toLocaleString()} each
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="border-t border-gray-200 pt-4 space-y-2">
								<div className="flex justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-medium text-black">
										₹{orderSummary.subtotal.toLocaleString()}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">Shipping</span>
									<span className="font-medium text-black">
										{orderSummary.shipping === 0
											? "Free"
											: `₹${orderSummary.shipping.toLocaleString()}`}
									</span>
								</div>

								<div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
									<span className="text-gray-600">Total</span>
									<span className="text-black">
										₹{orderSummary.total.toLocaleString()}
									</span>
								</div>
							</div>

							{orderSummary.shipping === 0 && (
								<div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
									<p className="text-sm text-green-800">
										🎉 You qualify for free shipping!
									</p>
								</div>
							)}

							{checkoutType === "buyNow" && (
								<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
									<p className="text-sm text-blue-800">⚡ Express checkout</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
