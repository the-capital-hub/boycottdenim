import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {


  const { id: productId } = await params;
  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: body }, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}
