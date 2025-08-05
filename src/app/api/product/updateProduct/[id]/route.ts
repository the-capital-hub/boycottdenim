import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect"; // Assuming you need this connection

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correctly type params as a Promise
) {
  await connectDB(); // Ensure a database connection is established

  try {
    const { id } = await params; // Await the Promise to get the actual params object
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id, // Use the awaited 'id'
      { $set: body },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

