"use client";

import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { toast } from "react-hot-toast";
 
import type {
	CartItem,
	Product,
	CartTotals,
	ObjectId,
	PopulatedCart,
	ApiResponse,
} from "@/types";

interface CartAPI {
	fetchCart: (userId: ObjectId) => Promise<PopulatedCart>;
	addToCart: (
		userId: ObjectId,
		productId: ObjectId,
		quantity?: number,
		size?: string,
		color?: string
	) => Promise<PopulatedCart>;
	updateQuantity: (
		userId: ObjectId,
		productId: ObjectId,
		quantity: number,
		size?: string,
		color?: string
	) => Promise<PopulatedCart>;
	removeItem: (
		userId: ObjectId,
		productId: ObjectId,
		size?: string,
		color?: string
	) => Promise<PopulatedCart>;
	clearCart: (userId: ObjectId) => Promise<ApiResponse>;
}

// Cart API functions
const cartAPI: CartAPI = {
	async fetchCart(userId: ObjectId): Promise<PopulatedCart> {
		const response = await fetch(`/api/cart?userId=${userId}`);
		if (!response.ok) throw new Error("Failed to fetch cart");
		return response.json();
	},

	async addToCart(
		userId: ObjectId,
		productId: ObjectId,
		quantity = 1,
		size?: string,
		color?: string
	): Promise<PopulatedCart> {
		const response = await fetch("/api/cart", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId, productId, quantity, size, color }),
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to add to cart");
		}
		return response.json();
	},

	async updateQuantity(
		userId: ObjectId,
		productId: ObjectId,
		quantity: number,
		size?: string,
		color?: string
	): Promise<PopulatedCart> {
		const response = await fetch("/api/cart", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId, productId, quantity, size, color }),
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to update cart");
		}
		return response.json();
	},

	async removeItem(
		userId: ObjectId,
		productId: ObjectId,
		size?: string,
		color?: string
	): Promise<PopulatedCart> {
                const params = new URLSearchParams({
                        userId: userId.toString(),
                        productId: productId.toString(),
                        ...(size && { size }),
                        ...(color && { color }),
                });
		const response = await fetch(`/api/cart?${params}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to remove item");
		}
		return response.json();
	},

	async clearCart(userId: ObjectId): Promise<ApiResponse> {
		const response = await fetch(`/api/cart/clear?userId=${userId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to clear cart");
		}
		return response.json();
	},
};

interface CartState {
	// State
	items: CartItem[];
	isLoading: boolean;
	isOpen: boolean;
	userId: ObjectId;
	totals: CartTotals;

	// Actions
	setUserId: (id: ObjectId) => void;
	fetchCart: () => Promise<void>;
	addItem: (
		product: Product,
		quantity?: number,
		size?: string,
		color?: string
	) => Promise<void>;
	updateQuantity: (
		productId: ObjectId,
		quantity: number,
		size?: string,
		color?: string
	) => Promise<void>;
	removeItem: (
		productId: ObjectId,
		size?: string,
		color?: string
	) => Promise<void>;
	clearCart: () => Promise<void>;
	calculateTotals: () => void;

	// UI state management
	toggleCart: () => void;
	openCart: () => void;
	closeCart: () => void;

	// Getters
	getTotalItems: () => number;
	getItemById: (productId: ObjectId) => CartItem | undefined;
	isItemInCart: (productId: ObjectId) => boolean;
}

interface CartPersistState {
	userId: ObjectId;
}

export const useCartStore = create<CartState>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				// State
				items: [],
				isLoading: false,
				isOpen: false,
				userId: "687e2ef351b622a5b26d78d5", // This should be set from auth context
				totals: {
					subtotal: 0,
					shipping: 0,
					total: 0,
				},

				// Actions
				setUserId: (id: ObjectId) => {
					set({ userId: id });
					if (id) {
						get().fetchCart();
					}
				},

				// Fetch cart from server
				fetchCart: async () => {
					const { userId } = get();
					if (!userId) return;

					set({ isLoading: true });
					try {
						const data = await cartAPI.fetchCart(userId);
                                                const items: CartItem[] =
                                                        data.items?.map((item) => ({
                                                                id: item.productId,
                                                                productId: item.productId,
                                                                product: item.product,
                                                                quantity: item.quantity,
                                                                price: item.price,
                                                                size: item.size,
                                                                color: item.color,
                                                        })) || [];

						set({ items });
						get().calculateTotals();
					} catch (error) {
						console.error("Error fetching cart:", error);
						toast.error("Failed to load cart");
					} finally {
						set({ isLoading: false });
					}
				},

				// Add item to cart
				addItem: async (
					product: Product,
					quantity = 1,
					size?: string,
					color?: string
				) => {
					const { userId } = get();
					if (!userId) {
						toast.error("Please login to add items to cart");
						return;
					}

					set({ isLoading: true });
					try {
						await cartAPI.addToCart(userId, product._id, quantity, size, color);
						await get().fetchCart();
						toast.success("Added to cart!");
					} catch (error) {
						console.error("Error adding to cart:", error);
						toast.error(
							error instanceof Error ? error.message : "Failed to add to cart"
						);
					} finally {
						set({ isLoading: false });
					}
				},

				// Update item quantity
				updateQuantity: async (
					productId: ObjectId,
					quantity: number,
					size?: string,
					color?: string
				) => {
					const { userId } = get();
					if (!userId) return;

					set({ isLoading: true });
					try {
						await cartAPI.updateQuantity(
							userId,
							productId,
							quantity,
							size,
							color
						);
						await get().fetchCart();
					} catch (error) {
						console.error("Error updating quantity:", error);
						toast.error(
							error instanceof Error
								? error.message
								: "Failed to update quantity"
						);
					} finally {
						set({ isLoading: false });
					}
				},

				// Remove item from cart
				removeItem: async (
					productId: ObjectId,
					size?: string,
					color?: string
				) => {
					const { userId } = get();
					if (!userId) return;

					try {
						await cartAPI.removeItem(userId, productId, size, color);
						await get().fetchCart();
						toast.success("Item removed from cart");
					} catch (error) {
						console.error("Error removing item:", error);
						toast.error(
							error instanceof Error ? error.message : "Failed to remove item"
						);
					}
				},

				// Clear entire cart
				clearCart: async () => {
					const { userId } = get();
					if (!userId) return;

					try {
						await cartAPI.clearCart(userId);
						set({ items: [] });
						get().calculateTotals();
						toast.success("Cart cleared");
					} catch (error) {
						console.error("Error clearing cart:", error);
						toast.error(
							error instanceof Error ? error.message : "Failed to clear cart"
						);
					}
				},

				// Calculate totals
				calculateTotals: () => {
					const { items } = get();
					const subtotal = items.reduce((sum, item) => {
						const price = item.product?.price || item.price || 0;
						return sum + price * item.quantity;
					}, 0);

					const shipping = subtotal > 2000 ? 0 : 99; // Free shipping over ₹2000
					const total = subtotal + shipping;

					set({
						totals: {
							subtotal,
							shipping,
							total,
						},
					});
				},

				// UI state management
				toggleCart: () => set({ isOpen: !get().isOpen }),
				openCart: () => set({ isOpen: true }),
				closeCart: () => set({ isOpen: false }),

				// Getters
				getTotalItems: () => {
					return get().items.reduce((total, item) => total + item.quantity, 0);
				},

				getItemById: (productId: ObjectId) => {
					return get().items.find((item) => item.productId === productId);
				},

				isItemInCart: (productId: ObjectId) => {
					return get().items.some((item) => item.productId === productId);
				},
			}),
			{
				name: "cart-storage",
				partialize: (state): CartPersistState => ({
					userId: state.userId,
				}),
			}
		)
	)
);
