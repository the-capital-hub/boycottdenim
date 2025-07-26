"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { OrderDetails } from "@/types/orderDetails";
import type { JSX } from "react/jsx-runtime";

export default function OrderSuccessPage(): JSX.Element {
	const searchParams = useSearchParams();
	const { clearCart } = useCartStore();
	const { resetCheckout } = useCheckoutStore();
	const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

	const orderId = searchParams.get("orderId");
	const orderNumber = searchParams.get("orderNumber");

	useEffect(() => {
		// Clear cart and reset checkout on success
		clearCart();
		resetCheckout();

		// You could fetch order details here if needed
		if (orderId && orderNumber) {
			setOrderDetails({
				orderId,
				orderNumber,
				estimatedDelivery: new Date(
					Date.now() + 7 * 24 * 60 * 60 * 1000
				).toLocaleDateString(), // 7 days from now
			});
		}
	}, [orderId, orderNumber, clearCart, resetCheckout]);

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow-sm p-8 text-center">
					{/* Success Icon */}
					<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
						<svg
							className="h-8 w-8 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>

					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Order Placed Successfully!
					</h1>

					<p className="text-lg text-gray-600 mb-8">
						Thank you for your order. We'll send you a confirmation email
						shortly.
					</p>

					{orderDetails && (
						<div className="bg-gray-50 rounded-lg p-6 mb-8">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Order Details
							</h2>

							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-600">Order Number:</span>
									<span className="font-medium text-gray-900">
										{orderDetails.orderNumber}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">Order ID:</span>
									<span className="font-medium text-gray-900">
										{orderDetails.orderId}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">Payment Method:</span>
									<span className="font-medium text-gray-900">
										Cash on Delivery
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">Estimated Delivery:</span>
									<span className="font-medium text-gray-900">
										{orderDetails.estimatedDelivery}
									</span>
								</div>
							</div>
						</div>
					)}

					<div className="space-y-4">
						<div className="bg-blue-50 border border-blue-200 rounded-md p-4">
							<p className="text-sm text-blue-800">
								📧 A confirmation email has been sent to your registered email
								address with order details and tracking information.
							</p>
						</div>

						<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
							<p className="text-sm text-yellow-800">
								📦 Your order will be processed within 1-2 business days. You'll
								receive tracking details once shipped.
							</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 mt-8">
						<Link
							href="/orders"
							className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
						>
							View My Orders
						</Link>

						<Link
							href="/Shop"
							className="flex-1 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
