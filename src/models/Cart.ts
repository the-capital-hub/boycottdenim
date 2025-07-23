import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price?: number; // optional snapshot
  size?: string;
  color?: string;
}

export interface CartDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  updatedAt: Date;
}

const CartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        price: Number, // optional snapshot price
        size: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;
