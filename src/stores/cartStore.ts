"use client";

import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { toast } from "react-hot-toast";
import type { CartItem, Product, CartTotals } from "@/types";

interface CartAPI {
	fetchCart: (userId: string) => Promise<{ items: CartItem[] }>;
	addToCart: (
		userId: string,
		productId: string,
		quantity?: number,
		size?: string,
		color?: string
	) => Promise<{ items: CartItem[] }>;
	updateQuantity: (
		userId: string,
		productId: string,
		quantity: number,
		size?: string,
		color?: string
	) => Promise<{ items: CartItem[] }>;
	removeItem: (
		userId: string,
		productId: string,
		size?: string,
		color?: string
	) => Promise<{ items: CartItem[] }>;
	clearCart: (userId: string) => Promise<{ success: boolean; message: string }>;
}

// Cart API functions
const cartAPI: CartAPI = {
	async fetchCart(userId: string) {
		const response = await fetch(`/api/cart?userId=${userId}`);
		if (!response.ok) throw new Error("Failed to fetch cart");
		return response.json();
	},

	async addToCart(
		userId: string,
		productId: string,
		quantity = 1,
		size?: string,
		color?: string
	) {
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
		userId: string,
		productId: string,
		quantity: number,
		size?: string,
		color?: string
	) {
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
		userId: string,
		productId: string,
		size?: string,
		color?: string
	) {
		const params = new URLSearchParams({
			userId,
			productId,
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

	async clearCart(userId: string) {
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
	userId: string;
	totals: CartTotals;

	// Actions
	setUserId: (id: string) => void;
	fetchCart: () => Promise<void>;
	addItem: (
		product: Product,
		quantity?: number,
		size?: string,
		color?: string
	) => Promise<void>;
	updateQuantity: (
		productId: string,
		quantity: number,
		size?: string,
		color?: string
	) => Promise<void>;
	removeItem: (
		productId: string,
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
	getItemById: (productId: string) => CartItem | undefined;
	isItemInCart: (productId: string) => boolean;
}

interface CartPersistState {
	userId: string;
}

export const useCartStore = create<CartState>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				// State
				items: [],
				isLoading: false,
				isOpen: false,
				userId: "687e2ef351b622a5b26d78d5",
				totals: {
					subtotal: 0,
					shipping: 0,
					total: 0,
				},

				// Actions
				setUserId: (id: string) => {
					set({ userId: id });
					if (id) {
						get().fetchCart();
					}
				},

				// Fetch cart from server
				fetchCart: async () => {
					const userId = "687e2ef351b622a5b26d78d5";
					if (!userId) return;

					set({ isLoading: true });
					try {
						const data = await cartAPI.fetchCart(userId);
						const items: CartItem[] =
							data.items?.map((item) => ({
								id: item.productId._id,
								product: item.productId,
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
					const userId = "687e2ef351b622a5b26d78d5";
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
					productId: string,
					quantity: number,
					size?: string,
					color?: string
				) => {
					const userId = "687e2ef351b622a5b26d78d5";
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
					productId: string,
					size?: string,
					color?: string
				) => {
					const userId = "687e2ef351b622a5b26d78d5";
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
					const userId = "687e2ef351b622a5b26d78d5";
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

				getItemById: (productId: string) => {
					return get().items.find((item) => item.productId === productId);
				},

				isItemInCart: (productId: string) => {
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
