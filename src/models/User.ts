// models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			// <<<<<<< backend
			trim: true,
			minLength: 3,
			// =======
			//     trim: true
			// >>>>>>> main
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		phone: {
			type: String,
			required: true,

			trim: true,
			validate: {
				validator: function (v: string) {
					return /^\d{10}$/.test(v);
				},
				message: "Phone number must be exactly 10 digits",
			},
		},
		userType: {
			type: String,
			enum: ["User", "Admin"],
			default: "User",
		},
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
