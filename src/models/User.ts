import mongoose, { Schema, type Document } from "mongoose";
import type { User as IUser, UserType } from "@/types";

// Extend the interface with Document for Mongoose
export interface UserDocument extends Omit<IUser, "_id">, Document {
	_id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minLength: [3, "Name must be at least 3 characters long"],
			maxLength: [50, "Name cannot exceed 50 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		phone: {
			type: String,
			required: [true, "Phone number is required"],
			trim: true,
			validate: {
				validator: (v: string) => /^\d{10}$/.test(v),
				message: "Phone number must be exactly 10 digits",
			},
		},
		userType: {
			type: String,
			enum: {
				values: ["User", "Admin"], // Declaring USER_TYPES inline
				message: "Invalid user type. Must be either 'User' or 'Admin'",
			},
			default: "User" as UserType,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret._id = ret._id;
				return ret;
			},
		},
	}
);

// Indexes for better query performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 });

export const User =
	mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
