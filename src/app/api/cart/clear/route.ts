import { type NextRequest, NextResponse } from "next/server";
import { Cart } from "@/models/Cart";
import { connectDB } from "@/lib/dbconnect";
import type { ApiResponse } from "@/types";

// DELETE - Clear user's cart
export async function DELETE(
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

		await Cart.findOneAndUpdate({ userId }, { items: [] });

		return NextResponse.json({ success: true, message: "Cart cleared" });
	} catch (error) {
		console.error("Error clearing cart:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to clear cart" },
			{ status: 500 }
		);
	}
}
