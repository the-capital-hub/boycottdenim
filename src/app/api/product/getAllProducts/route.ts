import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import { connectDB } from "@/lib/dbconnect";

export async function GET( req : NextRequest) {
    await connectDB()
    try{
        const products = await Product.find({});

        if (!products || products.length === 0) {
          return NextResponse.json(
            { message: "No products found" },
            { status: 404 }
          );
        }

        const filteredProducts = products.map(p => {
            const obj = p.toObject();
            delete obj._id;
            delete obj.createdAt;
            delete obj.updatedAt;
            delete obj.__v;
            return obj;
          });
    
        return NextResponse.json({ products : filteredProducts }, { status: 200 });

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
}