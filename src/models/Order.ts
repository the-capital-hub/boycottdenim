import mongoose, { Schema, type Document } from "mongoose";

export interface IOrderProduct {
	productId: mongoose.Schema.Types.ObjectId;
	productName: string;
	productImage: string;
	quantity: number;
	price: number;
	totalPrice: number;
	size?: string;
	color?: string;
}

export interface IDeliveryAddress {
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	fullAddress: string;
}

export interface IOrder extends Document {
	orderNumber: string;
	userId: mongoose.Schema.Types.ObjectId;
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	products: IOrderProduct[];
	subtotal: number;
	shippingCost: number;
	totalAmount: number;
	paymentMethod: "cod" | "card" | "upi" | "netbanking";
	paymentStatus: "pending" | "paid" | "failed" | "refunded";
	status:
		| "pending"
		| "confirmed"
		| "processing"
		| "shipped"
		| "delivered"
		| "cancelled";
	deliveryAddress: IDeliveryAddress;
	transactionId?: string;
	trackingNumber?: string;
	estimatedDelivery?: Date;
	orderNotes?: string;
	orderDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

const OrderProductSchema = new Schema<IOrderProduct>({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	productName: {
		type: String,
		required: true,
	},
	productImage: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
	},
	price: {
		type: Number,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	size: String,
	color: String,
});

const DeliveryAddressSchema = new Schema<IDeliveryAddress>({
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	zipCode: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	fullAddress: {
		type: String,
		required: true,
	},
});

const OrderSchema = new Schema<IOrder>(
	{
		orderNumber: {
			type: String,
			unique: true,
			required: true,
			default: () =>
				`ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		},

		// Customer Information
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		customerName: {
			type: String,
			required: true,
		},
		customerEmail: {
			type: String,
			required: true,
		},
		customerMobile: {
			type: String,
			required: true,
		},

		// Order Details
		products: [OrderProductSchema],

		// Pricing
		subtotal: {
			type: Number,
			required: true,
		},
		shippingCost: {
			type: Number,
			default: 0,
		},
		totalAmount: {
			type: Number,
			required: true,
		},

		// Payment Information
		paymentMethod: {
			type: String,
			enum: ["cod", "card", "upi", "netbanking"],
			default: "cod",
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},
		transactionId: String,

		// Order Status
		status: {
			type: String,
			enum: [
				"pending",
				"confirmed",
				"processing",
				"shipped",
				"delivered",
				"cancelled",
			],
			default: "pending",
		},

		// Delivery Information
		deliveryAddress: {
			type: DeliveryAddressSchema,
			required: true,
		},

		// Tracking
		trackingNumber: String,
		estimatedDelivery: Date,

		// Notes
		orderNotes: String,

		// Timestamps
		orderDate: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

// Indexes for better query performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ orderDate: -1 });

export default mongoose.models.Order ||
	mongoose.model<IOrder>("Order", OrderSchema);
