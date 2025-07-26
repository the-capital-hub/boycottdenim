"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { CartItem, ShippingAddress, Product } from "@/types";

export default function Checkout() {
	const searchParams = useSearchParams();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [processing, setProcessing] = useState(false);
	const [isDirectBuy, setIsDirectBuy] = useState(false);

	// Mock user ID - replace with actual user authentication
	const userId = "user123";

	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		fullName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "India",
	});

	const [paymentMethod, setPaymentMethod] = useState("card");

	useEffect(() => {
		// Check if this is a direct buy from URL params
		const productId = searchParams.get("productId");
		const quantity = searchParams.get("quantity");
		const size = searchParams.get("size");
		const color = searchParams.get("color");

		if (productId) {
			setIsDirectBuy(true);
			// For direct buy, you would fetch the specific product details
			// This is a simplified version
			fetchDirectBuyProduct(
				productId,
				Number.parseInt(quantity || "1"),
				size,
				color
			);
		} else {
			fetchCart();
		}
	}, [searchParams]);

	const fetchCart = async () => {
		try {
			const response = await fetch(`/api/cart?userId=${userId}`);
			const data = await response.json();
			setCartItems(data.items || []);
		} catch (error) {
			console.error("Error fetching cart:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchDirectBuyProduct = async (
		productId: string,
		quantity: number,
		size?: string | null,
		color?: string | null
	) => {
		try {
			// You would fetch the product details here
			// This is a mock implementation
			const mockProduct = {
				_id: productId,
				name: "Light Grey Ankle Jeans",
				price: 1299,
				images: ["/placeholder.svg?height=120&width=120"],
				gender: "men",
				categories: "ankle fit",
				stock: 10,
				description:
					"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
			};

			setCartItems([
				{
					productId,
					product: mockProduct,
					quantity,
					size: size || undefined,
					color: color || undefined,
					price: mockProduct.price,
				},
			]);
		} catch (error) {
			console.error("Error fetching product:", error);
		} finally {
			setLoading(false);
		}
	};

	const calculateSubtotal = () => {
		return cartItems.reduce((total, item) => {
			const price = item.product?.price || item.price || 0;
			return total + price * item.quantity;
		}, 0);
	};

	const calculateShipping = () => {
		return calculateSubtotal() > 2000 ? 0 : 99; // Free shipping over ₹2000
	};

	const calculateTotal = () => {
		return calculateSubtotal() + calculateShipping();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setProcessing(true);

		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					items: isDirectBuy ? cartItems : undefined,
					shippingAddress,
					paymentMethod,
					isDirectBuy,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Redirect to success page or show success message
				alert("Order placed successfully! Order ID: " + data.orderId);
				// You would typically redirect to an order confirmation page
				window.location.href = "/order-success";
			} else {
				alert("Error: " + data.error);
			}
		} catch (error) {
			console.error("Error processing checkout:", error);
			alert("An error occurred while processing your order");
		} finally {
			setProcessing(false);
		}
	};

	const handleInputChange = (field: keyof ShippingAddress, value: string) => {
		setShippingAddress((prev) => ({ ...prev, [field]: value }));
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (cartItems.length === 0) {
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
		<div className="min-h-screen bg-gray-50 pt-20 pb-12">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Checkout
					{/* {isDirectBuy && (
						<span className="text-lg font-normal text-gray-600">
							(Direct Buy)
						</span>
					)} */}
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Shipping Form */}
					<div className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Shipping Information
						</h2>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full Name *
									</label>
									<input
										type="text"
										required
										value={shippingAddress.fullName}
										onChange={(e) =>
											handleInputChange("fullName", e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email *
									</label>
									<input
										type="email"
										required
										value={shippingAddress.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Phone Number *
								</label>
								<input
									type="tel"
									required
									value={shippingAddress.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Address *
								</label>
								<textarea
									required
									rows={3}
									value={shippingAddress.address}
									onChange={(e) => handleInputChange("address", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										City *
									</label>
									<input
										type="text"
										required
										value={shippingAddress.city}
										onChange={(e) => handleInputChange("city", e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										State *
									</label>
									<input
										type="text"
										required
										value={shippingAddress.state}
										onChange={(e) => handleInputChange("state", e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										ZIP Code *
									</label>
									<input
										type="text"
										required
										value={shippingAddress.zipCode}
										onChange={(e) =>
											handleInputChange("zipCode", e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Country *
								</label>
								<select
									required
									value={shippingAddress.country}
									onChange={(e) => handleInputChange("country", e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
								>
									<option value="India">India</option>
									<option value="USA">USA</option>
									<option value="UK">UK</option>
								</select>
							</div>

							{/* <div className="pt-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Payment Method
								</h3>
								<div className="space-y-3">
									<label className="flex items-center">
										<input
											type="radio"
											name="payment"
											value="card"
											checked={paymentMethod === "card"}
											onChange={(e) => setPaymentMethod(e.target.value)}
											className="mr-3"
										/>
										<span className="text-black">Credit/Debit Card</span>
									</label>

									<label className="flex items-center">
										<input
											type="radio"
											name="payment"
											value="upi"
											checked={paymentMethod === "upi"}
											onChange={(e) => setPaymentMethod(e.target.value)}
											className="mr-3"
										/>
										<span className="text-black">UPI</span>
									</label>

									<label className="flex items-center">
										<input
											type="radio"
											name="payment"
											value="cod"
											checked={paymentMethod === "cod"}
											onChange={(e) => setPaymentMethod(e.target.value)}
											className="mr-3"
										/>
										<span className="text-black">Cash on Delivery</span>
									</label>
								</div>
							</div>

							<button
								type="submit"
								disabled={processing}
								className="w-full bg-yellow-400 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{processing
									? "Processing..."
									: `Place Order - ₹${calculateTotal().toLocaleString()}`}
							</button> */}
						</form>
					</div>

					{/* Order Summary */}
					<div className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Order Summary
						</h2>

						<div className="space-y-4 mb-6">
							{cartItems.map((item, index) => {
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
									₹{calculateSubtotal().toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span className="text-gray-600">Shipping</span>
								<span className="font-medium text-black">
									{calculateShipping() === 0
										? "Free"
										: `₹${calculateShipping()}`}
								</span>
							</div>

							<div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
								<span className="text-black">Total</span>
								<span className="text-black">
									₹{calculateTotal().toLocaleString()}
								</span>
							</div>
						</div>

						{calculateShipping() === 0 && (
							<div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
								<p className="text-sm text-green-800">
									🎉 You qualify for free shipping!
								</p>
							</div>
						)}

						{/* Payment Methods */}
						<div className="pt-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Payment Method
							</h3>
							<div className="space-y-3">
								<label className="flex items-center">
									<input
										type="radio"
										name="payment"
										value="card"
										checked={paymentMethod === "card"}
										onChange={(e) => setPaymentMethod(e.target.value)}
										className="mr-3"
									/>
									<span className="text-black">Credit/Debit Card</span>
								</label>

								<label className="flex items-center">
									<input
										type="radio"
										name="payment"
										value="upi"
										checked={paymentMethod === "upi"}
										onChange={(e) => setPaymentMethod(e.target.value)}
										className="mr-3"
									/>
									<span className="text-black">UPI</span>
								</label>

								<label className="flex items-center">
									<input
										type="radio"
										name="payment"
										value="cod"
										checked={paymentMethod === "cod"}
										onChange={(e) => setPaymentMethod(e.target.value)}
										className="mr-3"
									/>
									<span className="text-black">Cash on Delivery</span>
								</label>
							</div>
						</div>

						<button
							type="submit"
							disabled={processing}
							className="w-full bg-yellow-400 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{processing
								? "Processing..."
								: `Place Order - ₹${calculateTotal().toLocaleString()}`}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
