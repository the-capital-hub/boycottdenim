import mongoose, { Schema, type Document } from "mongoose";
import type {
	Order as IOrder,
	OrderProduct,
	DeliveryAddress,
	PaymentMethod,
	PaymentStatus,
	OrderStatus,
} from "@/types";

// Declare variables here if they are not imported
const PAYMENT_METHODS = ["cod", "credit_card", "debit_card", "net_banking"];
const PAYMENT_STATUSES = ["pending", "paid", "failed"];
const ORDER_STATUSES = [
	"pending",
	"confirmed",
	"shipped",
	"delivered",
	"cancelled",
];

export interface OrderDocument
	extends Omit<IOrder, "_id" | "userId">,
		Document {
	_id: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
}

const OrderProductSchema = new Schema<OrderProduct>(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
			ref: "Product",
			required: [true, "Product ID is required"],
		},
		productName: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
			maxLength: [100, "Product name cannot exceed 100 characters"],
		},
		productImage: {
			type: String,
			required: [true, "Product image is required"],
			trim: true,
		},
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
			min: [1, "Quantity must be at least 1"],
			max: [99, "Quantity cannot exceed 99"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price cannot be negative"],
		},
		totalPrice: {
			type: Number,
			required: [true, "Total price is required"],
			min: [0, "Total price cannot be negative"],
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

const DeliveryAddressSchema = new Schema<DeliveryAddress>(
	{
		address: {
			type: String,
			required: [true, "Address is required"],
			trim: true,
			maxLength: [200, "Address cannot exceed 200 characters"],
		},
		city: {
			type: String,
			required: [true, "City is required"],
			trim: true,
			maxLength: [50, "City cannot exceed 50 characters"],
		},
		state: {
			type: String,
			required: [true, "State is required"],
			trim: true,
			maxLength: [50, "State cannot exceed 50 characters"],
		},
		zipCode: {
			type: String,
			required: [true, "ZIP code is required"],
			trim: true,
			match: [/^\d{6}$/, "ZIP code must be exactly 6 digits"],
		},
		country: {
			type: String,
			required: [true, "Country is required"],
			trim: true,
			default: "India",
			maxLength: [50, "Country cannot exceed 50 characters"],
		},
		fullAddress: {
			type: String,
			required: [true, "Full address is required"],
			trim: true,
			maxLength: [300, "Full address cannot exceed 300 characters"],
		},
	},
	{ _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
	{
		orderNumber: {
			type: String,
			unique: true,
			required: [true, "Order number is required"],
			default: () =>
				`ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
		},
		customerName: {
			type: String,
			required: [true, "Customer name is required"],
			trim: true,
			maxLength: [100, "Customer name cannot exceed 100 characters"],
		},
		customerEmail: {
			type: String,
			required: [true, "Customer email is required"],
			trim: true,
			lowercase: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		customerMobile: {
			type: String,
			required: [true, "Customer mobile is required"],
			trim: true,
			validate: {
				validator: (v: string) => /^\d{10}$/.test(v),
				message: "Mobile number must be exactly 10 digits",
			},
		},
		products: {
			type: [OrderProductSchema],
			required: [true, "At least one product is required"],
			validate: {
				validator: (arr: OrderProduct[]) => arr.length > 0,
				message: "Order must contain at least one product",
			},
		},
		subtotal: {
			type: Number,
			required: [true, "Subtotal is required"],
			min: [0, "Subtotal cannot be negative"],
		},
		shippingCost: {
			type: Number,
			required: [true, "Shipping cost is required"],
			min: [0, "Shipping cost cannot be negative"],
			default: 0,
		},
		totalAmount: {
			type: Number,
			required: [true, "Total amount is required"],
			min: [0, "Total amount cannot be negative"],
		},
		paymentMethod: {
			type: String,
			enum: {
				values: PAYMENT_METHODS,
				message: "Invalid payment method",
			},
			required: [true, "Payment method is required"],
			default: "cod" as PaymentMethod,
		},
		paymentStatus: {
			type: String,
			enum: {
				values: PAYMENT_STATUSES,
				message: "Invalid payment status",
			},
			required: [true, "Payment status is required"],
			default: "pending" as PaymentStatus,
		},
		status: {
			type: String,
			enum: {
				values: ORDER_STATUSES,
				message: "Invalid order status",
			},
			required: [true, "Order status is required"],
			default: "pending" as OrderStatus,
		},
		deliveryAddress: {
			type: DeliveryAddressSchema,
			required: [true, "Delivery address is required"],
		},
		transactionId: {
			type: String,
			trim: true,
		},
		trackingNumber: {
			type: String,
			trim: true,
		},
		estimatedDelivery: {
			type: Date,
		},
		orderNotes: {
			type: String,
			trim: true,
			maxLength: [500, "Order notes cannot exceed 500 characters"],
		},
		orderDate: {
			type: Date,
			required: [true, "Order date is required"],
			default: Date.now,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret: any) => {
				ret._id = ret._id.toString();
				ret.userId = ret.userId.toString();
				ret.products = ret.products.map((product: any) => ({
					...product,
					productId: product.productId.toString(),
				}));
				return ret;
			},
		},
	}
);

// Indexes for better query performance
OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderDate: -1 });
OrderSchema.index({ customerEmail: 1 });
OrderSchema.index({ customerMobile: 1 });

// Pre-save middleware to calculate total amount
OrderSchema.pre("save", function () {
	// Ensure totalAmount equals subtotal + shippingCost
	this.totalAmount = this.subtotal + this.shippingCost;

	// Ensure products total price is correct
	this.products.forEach((product) => {
		product.totalPrice = product.price * product.quantity;
	});

	// Ensure subtotal matches sum of all product totals
	const calculatedSubtotal = this.products.reduce(
		(sum, product) => sum + product.totalPrice,
		0
	);
	this.subtotal = calculatedSubtotal;
	this.totalAmount = this.subtotal + this.shippingCost;
});

// Virtual for order age in days
OrderSchema.virtual("orderAgeDays").get(function () {
	return Math.floor(
		(Date.now() - this.orderDate.getTime()) / (1000 * 60 * 60 * 24)
	);
});

// Method to check if order can be cancelled
OrderSchema.methods.canBeCancelled = function () {
	return ["pending", "confirmed"].includes(this.status);
};

// Method to check if order can be tracked
OrderSchema.methods.canBeTracked = function () {
	return this.trackingNumber && ["shipped", "delivered"].includes(this.status);
};

export const Order =
	mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);
