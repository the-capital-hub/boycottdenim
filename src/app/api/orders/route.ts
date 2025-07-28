import { type NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";
import type { OrderResponse } from "@/types";

interface CreateOrderRequest {
	userId: string;
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	products: Array<{
		productId: string;
		productName: string;
		productImage: string;
		quantity: number;
		price: number;
		totalPrice: number;
		size?: string;
		color?: string;
	}>;
	subtotal: number;
	shippingCost: number;
	totalAmount: number;
	paymentMethod: "cod" | "card" | "upi" | "netbanking";
	paymentStatus: "pending" | "paid" | "failed" | "refunded";
	deliveryAddress: {
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		fullAddress: string;
	};
	isDirectBuy: boolean;
}

// POST - Create new order
// export async function POST(
// 	request: NextRequest
// ): Promise<NextResponse<OrderResponse>> {
// 	try {
// 		await connectDB();

// 		const orderData: CreateOrderRequest = await request.json();

// 		// Validate required fields
// 		if (
// 			!orderData.userId ||
// 			!orderData.products ||
// 			orderData.products.length === 0
// 		) {
// 			return NextResponse.json(
// 				{ success: false, error: "Missing required order data" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Validate stock for all products
// 		for (const item of orderData.products) {
// 			const product = await Product.findById(item.productId);
// 			if (!product) {
// 				return NextResponse.json(
// 					{ success: false, error: `Product ${item.productId} not found` },
// 					{ status: 404 }
// 				);
// 			}

// 			if (product.stock < item.quantity) {
// 				return NextResponse.json(
// 					{ success: false, error: `Insufficient stock for ${product.name}` },
// 					{ status: 400 }
// 				);
// 			}
// 		}

// 		// Create the order
// 		const order = new Order(orderData);
// 		await order.save();

// 		// Update product stock
// 		for (const item of orderData.products) {
// 			await Product.findByIdAndUpdate(item.productId, {
// 				$inc: { stock: -item.quantity },
// 			});
// 		}

// 		// Clear cart if it's not a direct buy
// 		if (!orderData.isDirectBuy) {
// 			await Cart.findOneAndUpdate({ userId: orderData.userId }, { items: [] });
// 		}

// 		return NextResponse.json({
// 			success: true,
// 			orderId: order._id.toString(),
// 			orderNumber: order.orderNumber,
// 			message: "Order placed successfully",
// 		});
// 	} catch (error) {
// 		console.error("Error creating order:", error);
// 		return NextResponse.json(
// 			{ success: false, error: "Failed to create order" },
// 			{ status: 500 }
// 		);
// 	}
// }

export async function POST(
	request: NextRequest
): Promise<NextResponse<OrderResponse>> {
	try {
		console.log("1. Starting order creation");
		await connectDB();
		console.log("2. Database connected");

		const orderData: CreateOrderRequest = await request.json();
		console.log("3. Order data parsed:", JSON.stringify(orderData, null, 2));

		// Validate required fields
		if (
			!orderData.userId ||
			!orderData.products ||
			orderData.products.length === 0
		) {
			console.log("4. Validation failed - missing required fields");
			return NextResponse.json(
				{ success: false, error: "Missing required order data" },
				{ status: 400 }
			);
		}
		console.log("4. Basic validation passed");

		// Product validation and stock check
		console.log("5. Starting product validation");
		for (const item of orderData.products) {
			console.log(`Checking product: ${item.productId}`);
			const product = await Product.findById(item.productId);
			if (!product) {
				console.log(`Product not found: ${item.productId}`);
				return NextResponse.json(
					{ success: false, error: `Product ${item.productId} not found` },
					{ status: 404 }
				);
			}

			if (product.stock < item.quantity) {
				console.log(`Insufficient stock for ${product.name}`);
				return NextResponse.json(
					{ success: false, error: `Insufficient stock for ${product.name}` },
					{ status: 400 }
				);
			}
		}
		console.log("6. Product validation completed");

		// Create the order
		console.log("7. Creating order");
		const order = new Order(orderData);
		console.log("8. Order instance created, saving...");
		await order.save();
		console.log("9. Order saved successfully");

		// Update product stock
		console.log("10. Updating product stock");
		for (const item of orderData.products) {
			await Product.findByIdAndUpdate(item.productId, {
				$inc: { stock: -item.quantity },
			});
		}
		console.log("11. Product stock updated");

		// Clear cart if it's not a direct buy
		if (!orderData.isDirectBuy) {
			console.log("12. Clearing cart");
			await Cart.findOneAndUpdate({ userId: orderData.userId }, { items: [] });
		}
		console.log("13. Order creation completed successfully");

		return NextResponse.json({
			success: true,
			orderId: order._id.toString(),
			orderNumber: order.orderNumber,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.error("Error creating order:", error);

		if (error instanceof Error) {
			console.error("Error details:", {
				name: error.name,
				message: error.message,
				stack: error.stack,
			});
		}

		if (error.name === "ValidationError") {
			return NextResponse.json(
				{ success: false, error: "Validation failed", details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				error: "Failed to create order",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}

// GET - Fetch user orders
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("687e2ef351b622a5b26d78d5");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const orders = await Order.find({ userId })
			.populate("products.productId")
			.sort({ orderDate: -1 });

		return NextResponse.json({ orders });
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json(
			{ error: "Failed to fetch orders" },
			{ status: 500 }
		);
	}
}
