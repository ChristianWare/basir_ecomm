import { Document, Model, ObjectId, Schema, model } from "mongoose";

interface CartItem {
  productId: ObjectId;
  quantity: number;
}

interface CartDocument extends Document {
  userId: ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

let CartModel: Model<CartDocument>;

try {
  // Try to retrieve the existing model to avoid OverwriteModelError
  CartModel = model<CartDocument>("Cart");
} catch {
  // If model doesn't exist, create it
  CartModel = model<CartDocument>("Cart", cartSchema);
}

export default CartModel;
