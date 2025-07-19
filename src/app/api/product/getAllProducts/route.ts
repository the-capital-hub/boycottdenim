import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";

export async function GET( req : NextRequest) {
    try{
        const products = await Product.find({});

        if (!products || products.length === 0) {
          return NextResponse.json(
            { message: "No products found" },
            { status: 404 }
          );
        }
    
        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
}