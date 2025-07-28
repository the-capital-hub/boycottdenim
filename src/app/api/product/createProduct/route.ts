import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Products";
import cloudinary from "@/lib/cloudinary";
import { adminMiddleware } from "../../../../../middleware/auth";

const handler = async (
	req: NextRequest,
	user: { userId: string; role: string }
) => {
	try {
		const formData = await req.formData();

		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const price = parseFloat(formData.get("price") as string);
		const stock = parseInt(formData.get("stock") as string);
		const gender = formData.get("gender") as string;
		const categories = JSON.parse(formData.get("categories") as string);
		const imageFiles = formData.getAll("images") as File[];

		if (
			!name ||
			!description ||
			!price ||
			!stock ||
			!imageFiles.length ||
			!gender ||
			!categories
		) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}

		const uploadPromises = imageFiles.map(async (file) => {
			const buffer = Buffer.from(await file.arrayBuffer());

			return new Promise<string>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							resource_type: "image",
							folder: "products",
						},
						(error, result) => {
							if (error) reject(error);
							else resolve(result!.secure_url);
						}
					)
					.end(buffer);
			});
		});

		const imageUrls = await Promise.all(uploadPromises);

		const product = new Product({
			name,
			description,
			price,
			stock,
			images: imageUrls,
			gender,
			categories,
		});

		await product.save();

		return NextResponse.json(
			{ message: "Product Added Successfully", product },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
};

export const POST = adminMiddleware(handler);
