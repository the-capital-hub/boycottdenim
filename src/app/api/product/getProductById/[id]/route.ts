import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

export async function GET(
  request: NextRequest, // Use NextRequest for the request object
  { params }: { params: Promise<{ id: string }> } // Correctly type params as a Promise
) {
  await connectDB();

  try {
    const { id } = await params; // Await the Promise to get the actual params object

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error finding product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}