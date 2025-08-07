// ==================== BASE TYPES ====================
import type { Types } from "mongoose";

export type ObjectId = string | Types.ObjectId;

// User Types
export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	phone: string;
	userType: "User" | "Admin";
	createdAt: Date;
	updatedAt: Date;
}

export type UserType = "User" | "Admin";

// ==================== PRODUCT TYPES ====================

export type Gender = "men" | "women";
export type Category =
	| "ankle-fit"
	| "slim-fit"
	| "relaxed-fit"
	| "straight-fit";

export interface Product {
	_id: ObjectId;
	name: string;
	description: string;
	price: number;
	stock: number;
	images: string[];
	gender: Gender;
	categories: Category;
	favorites: ObjectId[]; // User IDs who favorited this product
	createdAt: Date;
	updatedAt: Date;
}

// Product creation/update types
export type CreateProductInput = Omit<
	Product,
	"_id" | "createdAt" | "updatedAt" | "favorites"
> & {
	favorites?: ObjectId[];
};

export type UpdateProductInput = Partial<CreateProductInput>;

// ==================== CART TYPES ====================

export interface CartItemBase {
	productId: ObjectId;
	quantity: number;
	price?: number; // Optional snapshot price
	size?: string;
	color?: string;
}

// Database cart item (from MongoDB)
export interface DbCartItem extends CartItemBase {
	_id?: ObjectId;
}

// Populated cart item (with product details)
export interface CartItem extends Omit<CartItemBase, "productId"> {
	id: ObjectId;
	productId: ObjectId;
	product: Product;
}

export interface Cart {
	_id?: ObjectId;
	userId: ObjectId;
	items: DbCartItem[];
	createdAt: Date;
	updatedAt: Date;
}

// Populated cart (with product details in items)
export interface PopulatedCart extends Omit<Cart, "items"> {
	items: CartItem[];
}

// ==================== ORDER TYPES ====================

export type PaymentMethod = "cod" | "card" | "upi" | "netbanking";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
	| "pending"
	| "confirmed"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

export interface OrderProduct {
	productId: ObjectId;
	productName: string;
	productImage: string;
	quantity: number;
	price: number;
	totalPrice: number;
	size?: string;
	color?: string;
}

export interface DeliveryAddress {
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	fullAddress: string;
}

export interface Order {
	_id?: ObjectId;
	orderNumber: string;
	userId: ObjectId;
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	products: OrderProduct[];
	subtotal: number;
	shippingCost: number;
	totalAmount: number;
	paymentMethod: PaymentMethod;
	paymentStatus: PaymentStatus;
	status: OrderStatus;
	deliveryAddress: DeliveryAddress;
	transactionId?: string;
	trackingNumber?: string;
	estimatedDelivery?: Date;
	orderNotes?: string;
	orderDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

// ==================== CHECKOUT TYPES ====================

export interface CustomerInfo {
	fullName: string;
	email: string;
	phone: string;
}

export interface OrderSummary {
	items: CartItem[];
	subtotal: number;
	shipping: number;
	total: number;
}

export interface CartTotals {
	subtotal: number;
	shipping: number;
	total: number;
}

export type CheckoutType = "cart" | "buyNow";

export interface CheckoutSession {
	type: CheckoutType;
	product?: Product;
	quantity?: number;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface OrderResponse extends ApiResponse {
	orderId?: ObjectId;
	orderNumber?: string;
}

export interface OrderDetails {
	orderId: ObjectId;
	orderNumber: string;
	estimatedDelivery: string;
}

// ==================== API INPUT TYPES ====================

// Cart API inputs
export interface AddToCartInput {
	userId: ObjectId;
	productId: ObjectId;
	quantity?: number;
	size?: string;
	color?: string;
}

export interface UpdateCartInput extends AddToCartInput {
	quantity: number;
}

export interface RemoveFromCartInput {
	userId: ObjectId;
	productId: ObjectId;
	size?: string;
	color?: string;
}

// Order API inputs
export interface CreateOrderInput {
	userId: ObjectId;
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	products: Omit<OrderProduct, "totalPrice">[];
	subtotal: number;
	shippingCost: number;
	totalAmount: number;
	paymentMethod: PaymentMethod;
	deliveryAddress: Omit<DeliveryAddress, "fullAddress">;
	paymentStatus?: PaymentStatus;
	transactionId?: string;
	orderNotes?: string;
	isDirectBuy?: boolean; // For buy now functionality
}

// ==================== STORE TYPES ====================

// Cart Store State
export interface CartStore {
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

// Checkout Store State
export interface CheckoutStore {
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
	currentStep: number;

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

// ==================== UTILITY TYPES ====================

// Generic pagination
export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

// Filter types
export interface ProductFilters {
	gender?: Gender;
	category?: Category;
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
	search?: string;
}

export interface OrderFilters {
	status?: OrderStatus;
	paymentStatus?: PaymentStatus;
	paymentMethod?: PaymentMethod;
	startDate?: Date;
	endDate?: Date;
	userId?: ObjectId;
}

// ==================== FORM TYPES ====================

export interface LoginForm {
	email: string;
	password: string;
}

export interface RegisterForm {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

export interface ContactForm {
	name: string;
	email: string;
	phone: string;
	message: string;
}

// ==================== ERROR TYPES ====================

export interface ValidationError {
	field: string;
	message: string;
}

export interface ApiError {
	code: string;
	message: string;
	details?: ValidationError[];
}

// ==================== CONSTANTS ====================

export const GENDER_OPTIONS = ["men", "women"] as const;
export const CATEGORY_OPTIONS = [
	"ankle-fit",
	"slim-fit",
	"relaxed-fit",
	"straight-fit",
] as const;
export const PAYMENT_METHODS = ["cod", "card", "upi", "netbanking"] as const;
export const PAYMENT_STATUSES = [
	"pending",
	"paid",
	"failed",
	"refunded",
] as const;
export const ORDER_STATUSES = [
	"pending",
	"confirmed",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
] as const;
export const USER_TYPES = ["User", "Admin"] as const;

// ==================== TYPE GUARDS ====================

export const isValidGender = (value: string): value is Gender => {
	return GENDER_OPTIONS.includes(value as Gender);
};

export const isValidCategory = (value: string): value is Category => {
	return CATEGORY_OPTIONS.includes(value as Category);
};

export const isValidPaymentMethod = (value: string): value is PaymentMethod => {
	return PAYMENT_METHODS.includes(value as PaymentMethod);
};

export const isValidPaymentStatus = (value: string): value is PaymentStatus => {
	return PAYMENT_STATUSES.includes(value as PaymentStatus);
};

export const isValidOrderStatus = (value: string): value is OrderStatus => {
	return ORDER_STATUSES.includes(value as OrderStatus);
};

export const isValidUserType = (value: string): value is UserType => {
	return USER_TYPES.includes(value as UserType);
};

// ==================== HELPER TYPES ====================

// Make all properties of T optional except for the ones specified in K
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Make all properties of T required except for the ones specified in K
export type RequiredExcept<T, K extends keyof T> = Required<T> &
	Partial<Pick<T, K>>;

// Extract the type of array elements
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Create a type with only the specified keys from T
export type PickKeys<T, K extends keyof T> = Pick<T, K>;

// Create a type without the specified keys from T
export type OmitKeys<T, K extends keyof T> = Omit<T, K>;
