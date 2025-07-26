export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	images: string[];
	gender: "men" | "women";
	categories: "ankle fit" | "slim fit" | "relaxed fit" | "straight fit";
}

export interface CartItem {
	id: string;
	productId: string;
	product: Product;
	quantity: number;
	price?: number;
	size?: string;
	color?: string;
}

export interface Cart {
	_id?: string;
	userId: string;
	items: CartItem[];
	updatedAt?: Date;
}

export interface OrderProduct {
	productId: string;
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
	fullAddress?: string;
}

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

export interface Order {
	_id?: string;
	orderNumber: string;
	userId: string;
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	products: OrderProduct[];
	subtotal: number;
	shippingCost: number;
	totalAmount: number;
	paymentMethod: "cod" | "card" | "upi" | "netbanking";
	paymentStatus: "pending" | "paid" | "failed" | "refunded";
	status:
		| "pending"
		| "confirmed"
		| "processing"
		| "shipped"
		| "delivered"
		| "cancelled";
	deliveryAddress: DeliveryAddress;
	transactionId?: string;
	trackingNumber?: string;
	estimatedDelivery?: Date;
	orderNotes?: string;
	orderDate: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CartTotals {
	subtotal: number;
	shipping: number;
	total: number;
}

export interface CheckoutType {
	type: "cart" | "buyNow";
	product?: Product;
	quantity?: number;
}

export interface OrderResponse {
	success: boolean;
	orderId?: string;
	orderNumber?: string;
	error?: string;
	message?: string;
}

export interface OrderDetails {
	orderId: string;
	orderNumber: string;
	estimatedDelivery: string;
}
