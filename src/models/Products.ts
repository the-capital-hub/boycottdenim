import mongoose, { Schema, type Document } from "mongoose";
import type { Product as IProduct } from "@/types";

export interface ProductDocument
	extends Omit<IProduct, "_id" | "favorites">,
		Document {
	_id: mongoose.Types.ObjectId;
	favorites: mongoose.Types.ObjectId[];
}

const ProductSchema = new Schema<ProductDocument>(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
			minLength: [2, "Product name must be at least 2 characters long"],
			maxLength: [100, "Product name cannot exceed 100 characters"],
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			trim: true,
			minLength: [32, "Description must be at least 32 characters long"],
			maxLength: [2000, "Description cannot exceed 2000 characters"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [1, "Price must be greater than zero"],
			max: [999999, "Price cannot exceed 999999"],
		},
		stock: {
			type: Number,
			required: [true, "Stock quantity is required"],
			min: [0, "Stock cannot be less than zero"],
			max: [99999, "Stock cannot exceed 99999"],
		},
		images: {
			type: [String],
			required: [true, "At least one image is required"],
			validate: {
				validator: (arr: string[]) => arr.length > 0 && arr.length <= 10,
				message: "Must have between 1 and 10 images",
			},
		},
		gender: {
			type: String,
			enum: {
				values: ["men", "women"], // Assuming GENDER_OPTIONS is ["men", "women"]
				message: "Invalid gender. Must be either 'men' or 'women'",
			},
			required: [true, "Gender is required"],
		},
		categories: {
			type: String,
			enum: {
				values: ["ankle-fit", "slim-fit", "relaxed-fit", "straight-fit"], // Assuming CATEGORY_OPTIONS is ["ankle-fit", "slim-fit", "relaxed-fit", "straight-fit"]
				message:
					"Invalid category. Must be one of: ankle-fit, slim-fit, relaxed-fit, straight-fit",
			},
			required: [true, "Category is required"],
		},
		favorites: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret._id = ret._id;
				ret.favorites = ret.favorites.map(
					(fav: mongoose.Types.ObjectId) => fav
				);
				return ret;
			},
		},
	}
);

// Indexes for better query performance
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ gender: 1, categories: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ createdAt: -1 });

// Virtual for checking if product is in stock
ProductSchema.virtual("inStock").get(function () {
	return this.stock > 0;
});

export const Product =
	mongoose.models.Product ||
	mongoose.model<ProductDocument>("Product", ProductSchema);
