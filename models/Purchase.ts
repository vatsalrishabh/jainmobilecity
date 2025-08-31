import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPurchaseItem {
  productId: Types.ObjectId;
  productName: string;
  brand: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  totalCost: number;
  totalRevenue: number;
  profit: number;
}

export interface IPurchase extends Document {
  customerId?: Types.ObjectId;              // Optional if user not logged in
  customerName: string;
  customerMobile: string;
  purchaseItems: IPurchaseItem[];
  totalRevenue: number;
  totalCost: number;
  profit: number;
  paymentMethod: 'cash' | 'upi' | 'card';
  purchaseDate: Date;
}

const purchaseItemSchema = new Schema<IPurchaseItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
    profit: { type: Number, required: true },
  },
  { _id: false }
);

const purchaseSchema = new Schema<IPurchase>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerMobile: { type: String, required: true },
    purchaseItems: [purchaseItemSchema],
    totalRevenue: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    profit: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cash', 'upi', 'card'],
      required: true,
    },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', purchaseSchema);
