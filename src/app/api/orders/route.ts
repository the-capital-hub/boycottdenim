import { type NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/Order";
import { Product } from "@/models/Products";
import { Cart } from "@/models/Cart";
import { connectDB } from "@/lib/dbconnect";
import type { OrderResponse, CreateOrderInput, ApiResponse } from "@/types";

// POST - Create new order
export async function POST(
	request: NextRequest
): Promise<NextResponse<OrderResponse>> {
	try {
		await connectDB();

		const orderData: CreateOrderInput = await request.json();

		// Validate required fields
		if (
			!orderData.userId ||
			!orderData.products ||
			orderData.products.length === 0
		) {
			return NextResponse.json(
				{ success: false, error: "Missing required order data" },
				{ status: 400 }
			);
		}

		// Validate stock for all products
		for (const item of orderData.products) {
			const product = await Product.findById(item.productId);
			if (!product) {
				return NextResponse.json(
					{ success: false, error: `Product ${item.productId} not found` },
					{ status: 404 }
				);
			}

			if (product.stock < item.quantity) {
				return NextResponse.json(
					{ success: false, error: `Insufficient stock for ${product.name}` },
					{ status: 400 }
				);
			}
		}

		// Create the order with full address
		const orderWithFullAddress = {
			...orderData,
			deliveryAddress: {
				...orderData.deliveryAddress,
				fullAddress: `${orderData.deliveryAddress.address}, ${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state} - ${orderData.deliveryAddress.zipCode}`,
			},
		};

		const order = new Order(orderWithFullAddress);
		await order.save();

		// Update product stock
		for (const item of orderData.products) {
			await Product.findByIdAndUpdate(item.productId, {
				$inc: { stock: -item.quantity },
			});
		}

		// Clear cart if it's not a direct buy
		if (!orderData.isDirectBuy) {
			await Cart.findOneAndUpdate({ userId: orderData.userId }, { items: [] });
		}

		return NextResponse.json({
			success: true,
			orderId: order._id.toString(),
			orderNumber: order.orderNumber,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create order" },
			{ status: 500 }
		);
	}
}

// GET - Fetch user orders
export async function GET(
	request: NextRequest
): Promise<NextResponse<ApiResponse>> {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "User ID is required" },
				{ status: 400 }
			);
		}

		const orders = await Order.find({ userId })
			.populate("products.productId")
			.sort({ orderDate: -1 });

		return NextResponse.json({ success: true, data: orders });
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch orders" },
			{ status: 500 }
		);
	}
}
