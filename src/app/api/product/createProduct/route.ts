import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";

export async function POST(req : NextRequest){
    
    try{
        const {name, description, price, stock, images, gender, categories} = await req.json()

    if(!name || !description || !price || !stock || !images || images.length === 0  || !gender || !categories){
        return NextResponse.json({ message : "All fields are required"}, {status : 400})
    }

    const product = new Product({name,description,price,stock,images, gender, categories})
    await product.save()

    return NextResponse.json({ message : "Product Added Successfully", product},{status: 201})
    }catch(error){
        console.error("Error creating product:", error);
        return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
    );

    }
}