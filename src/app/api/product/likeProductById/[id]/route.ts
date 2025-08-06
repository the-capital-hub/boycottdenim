import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect"; // Assuming you need this connection

export async function PATCH(
  req: NextRequest,

  { params }: { params: Promise<{ productId: string }> } // params is now a Promise

) {
  await connectDB(); // Connect to the database if not already connected

  try {

    const { userId } = await req.json(); // Safely parse the request body

    const { productId } = await params; // Await params to access productId


    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    
    // Find the product and update its favourites
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const index = product.favourites.indexOf(userId);

    if (index === -1) {
      // User hasn't favourited the product, add to favourites
      product.favourites.push(userId);
    } else {
      // User has favourited the product, remove from favourites
      product.favourites.splice(index, 1);
    }

    await product.save();

    return NextResponse.json(
      { message: "Favourites updated successfully", favourites: product.favourites },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating favourite:", error); // Log the actual error
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

