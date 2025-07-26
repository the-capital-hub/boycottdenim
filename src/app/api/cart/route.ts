import { type NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

interface AddToCartRequest {
	userId: string;
	productId: string;
	quantity?: number;
	size?: string;
	color?: string;
}

interface UpdateCartRequest {
	userId: string;
	productId: string;
	quantity: number;
	size?: string;
	color?: string;
}

// GET - Fetch user's cart
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const cart = await Cart.findOne({ userId }).populate("items.productId");

		if (!cart) {
			return NextResponse.json({ items: [] });
		}

		return NextResponse.json(cart);
	} catch (error) {
		console.error("Error fetching cart:", error);
		return NextResponse.json(
			{ error: "Failed to fetch cart" },
			{ status: 500 }
		);
	}
}

// POST - Add item to cart
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		await connectDB();

		const {
			userId,
			productId,
			quantity = 1,
			size,
			color,
		}: AddToCartRequest = await request.json();

		if (!userId || !productId) {
			return NextResponse.json(
				{ error: "User ID and Product ID are required" },
				{ status: 400 }
			);
		}

		// Check if product exists and has sufficient stock
		const product = await Product.findById(productId);
		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		if (product.stock < quantity) {
			return NextResponse.json(
				{ error: "Insufficient stock" },
				{ status: 400 }
			);
		}

		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({ userId, items: [] });
		}

		// Check if item already exists in cart
		const existingItemIndex = cart.items.findIndex(
			(item: any) =>
				item.productId.toString() === productId &&
				item.size === size &&
				item.color === color
		);

		if (existingItemIndex > -1) {
			cart.items[existingItemIndex].quantity += quantity;
		} else {
			cart.items.push({
				productId,
				quantity,
				price: product.price,
				size,
				color,
			});
		}

		await cart.save();
		await cart.populate("items.productId");

		return NextResponse.json(cart);
	} catch (error) {
		console.error("Error adding to cart:", error);
		return NextResponse.json(
			{ error: "Failed to add item to cart" },
			{ status: 500 }
		);
	}
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest): Promise<NextResponse> {
	try {
		await connectDB();

		const { userId, productId, quantity, size, color }: UpdateCartRequest =
			await request.json();

		if (!userId || !productId || quantity < 0) {
			return NextResponse.json(
				{ error: "Invalid request data" },
				{ status: 400 }
			);
		}

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return NextResponse.json({ error: "Cart not found" }, { status: 404 });
		}

		const itemIndex = cart.items.findIndex(
			(item: any) =>
				item.productId.toString() === productId &&
				item.size === size &&
				item.color === color
		);

		if (itemIndex === -1) {
			return NextResponse.json(
				{ error: "Item not found in cart" },
				{ status: 404 }
			);
		}

		if (quantity === 0) {
			cart.items.splice(itemIndex, 1);
		} else {
			cart.items[itemIndex].quantity = quantity;
		}

		await cart.save();
		await cart.populate("items.productId");

		return NextResponse.json(cart);
	} catch (error) {
		console.error("Error updating cart:", error);
		return NextResponse.json(
			{ error: "Failed to update cart" },
			{ status: 500 }
		);
	}
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest): Promise<NextResponse> {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");
		const productId = searchParams.get("productId");
		const size = searchParams.get("size");
		const color = searchParams.get("color");

		if (!userId || !productId) {
			return NextResponse.json(
				{ error: "User ID and Product ID are required" },
				{ status: 400 }
			);
		}

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return NextResponse.json({ error: "Cart not found" }, { status: 404 });
		}

		cart.items = cart.items.filter(
			(item: any) =>
				!(
					item.productId.toString() === productId &&
					item.size === size &&
					item.color === color
				)
		);

		await cart.save();
		await cart.populate("items.productId");

		return NextResponse.json(cart);
	} catch (error) {
		console.error("Error removing from cart:", error);
		return NextResponse.json(
			{ error: "Failed to remove item from cart" },
			{ status: 500 }
		);
	}
}
