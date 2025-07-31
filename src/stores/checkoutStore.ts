"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import type {
	CartItem,
	Product,
	CustomerInfo,
	DeliveryAddress,
	OrderSummary,
	OrderResponse,
	CheckoutType,
	ObjectId,
} from "@/types";

interface CheckoutState {
	// State
	checkoutType: CheckoutType;
	buyNowProduct: Product | null;
	buyNowQuantity: number;

	// Customer Information
	customerInfo: CustomerInfo;

	// Delivery Address
	deliveryAddress: DeliveryAddress;

	// Order Summary
	orderSummary: OrderSummary;

	// UI State
	isLoading: boolean;
	currentStep: number; // 1: Info, 2: Address, 3: Review

	// Actions
	setCheckoutType: (
		type: CheckoutType,
		product?: Product | null,
		quantity?: number
	) => void;
	setCustomerInfo: (info: Partial<CustomerInfo>) => void;
	setDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
	setCurrentStep: (step: number) => void;
	initializeCheckout: (
		cartItems?: CartItem[],
		product?: Product | null,
		quantity?: number
	) => void;
	processOrder: (userId: ObjectId) => Promise<OrderResponse>;
	resetCheckout: () => void;
	validateStep: (step: number) => boolean;
}

interface CheckoutPersistState {
	customerInfo: CustomerInfo;
	deliveryAddress: DeliveryAddress;
}

export const useCheckoutStore = create<CheckoutState>()(
	persist(
		(set, get) => ({
			// State
			checkoutType: "cart",
			buyNowProduct: null,
			buyNowQuantity: 1,

			// Customer Information
			customerInfo: {
				fullName: "",
				email: "",
				phone: "",
			},

			// Delivery Address
			deliveryAddress: {
				address: "",
				city: "",
				state: "",
				zipCode: "",
				country: "India",
				fullAddress: "",
			},

			// Order Summary
			orderSummary: {
				items: [],
				subtotal: 0,
				shipping: 0,
				total: 0,
			},

			// UI State
			isLoading: false,
			currentStep: 1,

			// Actions
			setCheckoutType: (
				type: CheckoutType,
				product: Product | null = null,
				quantity = 1
			) => {
				set({
					checkoutType: type,
					buyNowProduct: product,
					buyNowQuantity: quantity,
				});
			},

			setCustomerInfo: (info: Partial<CustomerInfo>) => {
				set((state) => ({
					customerInfo: { ...state.customerInfo, ...info },
				}));
			},

			setDeliveryAddress: (address: Partial<DeliveryAddress>) => {
				set((state) => ({
					deliveryAddress: { ...state.deliveryAddress, ...address },
				}));
			},

			setCurrentStep: (step: number) => {
				set({ currentStep: step });
			},

			// Initialize checkout data
			initializeCheckout: (
				cartItems: CartItem[] = [],
				product: Product | null = null,
				quantity = 1
			) => {
				const { checkoutType } = get();

				let items: CartItem[] = [];

				if (checkoutType === "buyNow" && product) {
					items = [
						{
							id: product._id,
							productId: product._id,
							product: product,
							quantity: quantity,
							price: product.price,
							size: undefined,
							color: undefined,
						},
					];
				} else {
					items = cartItems;
				}

				const subtotal = items.reduce((sum, item) => {
					const price = item.product?.price || item.price || 0;
					return sum + price * item.quantity;
				}, 0);

				const shipping = subtotal > 2000 ? 0 : 99; // Free shipping over ₹2000
				const total = subtotal + shipping;

				set({
					orderSummary: {
						items,
						subtotal,
						shipping,
						total,
					},
				});
			},

			// Process order
			processOrder: async (userId: ObjectId): Promise<OrderResponse> => {
				const { customerInfo, deliveryAddress, orderSummary, checkoutType } =
					get();

				// Validate required fields
				if (
					!customerInfo.fullName ||
					!customerInfo.email ||
					!customerInfo.phone
				) {
					toast.error("Please fill in all customer information");
					return { success: false, error: "Missing customer information" };
				}

				if (
					!deliveryAddress.address ||
					!deliveryAddress.city ||
					!deliveryAddress.state ||
					!deliveryAddress.zipCode
				) {
					toast.error("Please fill in complete delivery address");
					return { success: false, error: "Missing delivery address" };
				}

				set({ isLoading: true });

				try {
					const orderData = {
						userId,
						customerName: customerInfo.fullName,
						customerEmail: customerInfo.email,
						customerMobile: customerInfo.phone,
						products: orderSummary.items.map((item) => ({
							productId: item.productId,
							productName: item.product?.name || "Product",
							productImage: item.product?.images?.[0] || "",
							quantity: item.quantity,
							price: item.product?.price || item.price || 0,
							totalPrice:
								(item.product?.price || item.price || 0) * item.quantity,
							size: item.size,
							color: item.color,
						})),
						subtotal: orderSummary.subtotal,
						shippingCost: orderSummary.shipping,
						totalAmount: orderSummary.total,
						paymentMethod: "cod" as const,
						paymentStatus: "pending" as const,
						deliveryAddress: {
							...deliveryAddress,
							fullAddress: `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.zipCode}`,
						},
						isDirectBuy: checkoutType === "buyNow",
					};

					const response = await fetch("/api/orders", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(orderData),
					});

					const data = await response.json();

					if (response.ok) {
						toast.success("Order placed successfully!");
						return {
							success: true,
							orderId: data.orderId,
							orderNumber: data.orderNumber,
						};
					} else {
						toast.error(data.error || "Failed to place order");
						return {
							success: false,
							error: data.error || "Failed to place order",
						};
					}
				} catch (error) {
					console.error("Order processing error:", error);
					const errorMessage =
						error instanceof Error ? error.message : "Failed to place order";
					toast.error(errorMessage);
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			// Reset checkout
			resetCheckout: () => {
				set({
					checkoutType: "cart",
					buyNowProduct: null,
					buyNowQuantity: 1,
					orderSummary: {
						items: [],
						subtotal: 0,
						shipping: 0,
						total: 0,
					},
					currentStep: 1,
				});
			},

			// Validate step
			validateStep: (step: number): boolean => {
				const { customerInfo, deliveryAddress } = get();

				switch (step) {
					case 1:
						return !!(
							customerInfo.fullName &&
							customerInfo.email &&
							customerInfo.phone
						);
					case 2:
						return !!(
							deliveryAddress.address &&
							deliveryAddress.city &&
							deliveryAddress.state &&
							deliveryAddress.zipCode
						);
					default:
						return true;
				}
			},
		}),
		{
			name: "checkout-storage",
			partialize: (state): CheckoutPersistState => ({
				customerInfo: state.customerInfo,
				deliveryAddress: state.deliveryAddress,
			}),
		}
	)
);
