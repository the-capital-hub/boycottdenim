import { type NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";
import type { ApiResponse, Product as IProduct } from "@/types";

interface RouteContext {
        params: Promise<{
                id: string;
        }>;
}

// GET - Fetch single product by ID
export async function GET(
        request: NextRequest,
        context: RouteContext
): Promise<NextResponse<ApiResponse<IProduct>>> {
        try {
                await connectDB();

                const { id } = await context.params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Product ID is required" },
				{ status: 400 }
			);
		}

		// Validate ObjectId format
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return NextResponse.json(
				{ success: false, error: "Invalid product ID format" },
				{ status: 400 }
			);
		}

		const product = await Product.findById(id);

		if (!product) {
			return NextResponse.json(
				{ success: false, error: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: product,
			message: "Product fetched successfully",
		});
	} catch (error) {
		console.error("Error fetching product:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch product" },
			{ status: 500 }
		);
	}
}
