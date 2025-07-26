"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { Product, CartItem } from "@/types";
import type { JSX } from "react/jsx-runtime";

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

	useEffect(() => {
		// Check if this is a direct buy from URL params
		const productId = searchParams.get("productId");
		const quantity = searchParams.get("quantity");

		if (productId) {
			// For direct buy, you would fetch the specific product details
			// This is a simplified version
			const mockProduct: Product = {
				_id: productId,
				name: "Light Grey Ankle Jeans",
				description: "Comfortable ankle fit jeans",
				price: 1299,
				stock: 10,
				images: ["/placeholder.svg?height=120&width=120"],
				gender: "men",
				categories: "ankle fit",
			};
			setCheckoutType("buyNow", mockProduct, Number.parseInt(quantity || "1"));
			initializeCheckout([], mockProduct, Number.parseInt(quantity || "1"));
		} else {
			setCheckoutType("cart");
			initializeCheckout(cartItems);
		}
	}, [searchParams, cartItems, setCheckoutType, initializeCheckout]);

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
		const result = await processOrder("687e2ef351b622a5b26d78d5");
		if (result.success && result.orderId && result.orderNumber) {
			router.push(
				`/order-success?orderId=${result.orderId}&orderNumber=${result.orderNumber}`
			);
		}
	};

	if (orderSummary.items.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
						<div className="bg-white rounded-lg shadow-sm p-12">
							<p className="text-xl text-gray-500">No items to checkout</p>
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
						{/* {checkoutType === "buyNow" && (
							<span className="text-lg font-normal text-gray-600">
								(Direct Buy)
							</span>
						)} */}
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
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
											<div className="text-sm text-gray-600">
												<p>{customerInfo.fullName}</p>
												<p>{customerInfo.email}</p>
												<p>{customerInfo.phone}</p>
											</div>
										</div>

										<div>
											<h3 className="font-medium text-gray-900 mb-2">
												Delivery Address
											</h3>
											<div className="text-sm text-gray-600">
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
											<div className="text-sm text-gray-600">
												<p>Cash on Delivery (COD)</p>
											</div>
										</div>
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
													product?.images?.[0] ||
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
											</div>

											<div className="text-right">
												<div className="font-medium text-gray-900">
													₹{(price * item.quantity).toLocaleString()}
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
											: `₹${orderSummary.shipping}`}
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
