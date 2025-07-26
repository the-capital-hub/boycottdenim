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
	productId: string;
	product?: Product;
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

export interface Order {
	_id?: string;
	userId: string;
	items: CartItem[];
	totalAmount: number;
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
	createdAt?: Date;
}

export interface ShippingAddress {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface User {
	_id?: string;
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: "User" | "Admin";
	createdAt?: Date;
}
