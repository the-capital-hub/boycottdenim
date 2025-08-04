import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";


export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await req.json();
    const { id: productId } = params;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const index = product.favourites.indexOf(userId);

    if (index === -1) {
      product.favourites.push(userId);
    } else {
      product.favourites.splice(index, 1);
    }

    await product.save();

    return NextResponse.json(
      { message: "Favourites updated successfully", favourites: product.favourites },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating favourite:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
