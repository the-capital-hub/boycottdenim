import mongoose, { Schema, type Document } from "mongoose";
import type { Cart as ICart } from "@/types";

interface CartItemSchema {
	productId: mongoose.Types.ObjectId;
	quantity: number;
	price?: number;
	size?: string;
	color?: string;
}

export interface CartDocument
	extends Omit<ICart, "_id" | "userId" | "items">,
		Document {
	_id: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
	items: CartItemSchema[];
}

const CartItemSchema = new Schema<CartItemSchema>(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: [true, "Product ID is required"],
		},
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
			min: [1, "Quantity must be at least 1"],
			max: [99, "Quantity cannot exceed 99"],
			default: 1,
		},
		price: {
			type: Number,
			min: [0, "Price cannot be negative"],
		},
		size: {
			type: String,
			trim: true,
			maxLength: [20, "Size cannot exceed 20 characters"],
		},
		color: {
			type: String,
			trim: true,
			maxLength: [30, "Color cannot exceed 30 characters"],
		},
	},
	{ _id: false }
);

const CartSchema = new Schema<CartDocument>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
			unique: true,
		},
		items: [CartItemSchema],
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret._id = ret._id;
				ret.userId = ret.userId;
				ret.items = ret.items.map((item: any) => ({
					...item,
					productId: item.productId,
				}));
				return ret;
			},
		},
	}
);

// Indexes for better query performance
CartSchema.index({ userId: 1 }, { unique: true });
CartSchema.index({ "items.productId": 1 });

// Pre-save middleware to remove items with zero quantity
CartSchema.pre("save", function () {
	this.items = this.items.filter((item) => item.quantity > 0);
});

export const Cart =
	mongoose.models.Cart || mongoose.model<CartDocument>("Cart", CartSchema);
