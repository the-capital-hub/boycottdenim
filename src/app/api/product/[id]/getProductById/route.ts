import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error finding product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
