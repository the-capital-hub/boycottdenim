import { type NextRequest, NextResponse } from "next/server";
import { Cart } from "@/models/Cart";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

// POST - Process checkout
export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const {
			userId,
			items, // For direct buy, items will be provided directly
			shippingAddress,
			paymentMethod,
			isDirectBuy = false,
		} = await request.json();

		if (!userId || !shippingAddress || !paymentMethod) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const orderItems = [];
		let totalAmount = 0;

		if (isDirectBuy) {
			// Direct buy flow - validate the provided items
			if (!items || items.length === 0) {
				return NextResponse.json(
					{ error: "No items provided for direct buy" },
					{ status: 400 }
				);
			}

			for (const item of items) {
				const product = await Product.findById(item.productId);
				if (!product) {
					return NextResponse.json(
						{ error: `Product ${item.productId} not found` },
						{ status: 404 }
					);
				}

				if (product.stock < item.quantity) {
					return NextResponse.json(
						{
							error: `Insufficient stock for ${product.name}`,
						},
						{ status: 400 }
					);
				}

				orderItems.push({
					productId: item.productId,
					quantity: item.quantity,
					price: product.price,
					size: item.size,
					color: item.color,
				});

				totalAmount += product.price * item.quantity;
			}
		} else {
			// Cart to checkout flow
			const cart = await Cart.findOne({ userId }).populate("items.productId");
			if (!cart || cart.items.length === 0) {
				return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
			}

			// Validate stock for all items
			for (const item of cart.items) {
				const product = item.productId as any;
				if (product.stock < item.quantity) {
					return NextResponse.json(
						{
							error: `Insufficient stock for ${product.name}`,
						},
						{ status: 400 }
					);
				}

				orderItems.push({
					productId: product._id,
					quantity: item.quantity,
					price: product.price,
					size: item.size,
					color: item.color,
				});

				totalAmount += product.price * item.quantity;
			}
		}

		// Create order (you would typically save this to an Order model)
		const order = {
			userId,
			items: orderItems,
			totalAmount,
			shippingAddress,
			paymentMethod,
			status: "pending",
			createdAt: new Date(),
		};

		// Update product stock
		for (const item of orderItems) {
			await Product.findByIdAndUpdate(item.productId, {
				$inc: { stock: -item.quantity },
			});
		}

		// Clear cart if it was a cart checkout
		if (!isDirectBuy) {
			await Cart.findOneAndUpdate({ userId }, { items: [] });
		}

		// Need to implement:
		// 1. Process payment with payment provider
		// 2. Save the order to database
		// 3. Send confirmation email

		return NextResponse.json({
			success: true,
			orderId: "ORDER_" + Date.now(), // Generate proper order ID
			totalAmount,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.error("Error processing checkout:", error);
		return NextResponse.json(
			{ error: "Failed to process checkout" },
			{ status: 500 }
		);
	}
}
