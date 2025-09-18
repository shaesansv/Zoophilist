import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  priceINR: number;
  quantity: number;
}

export interface IOrder extends Document {
  customerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  items: IOrderItem[];
  totalINR: number;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  priceINR: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const OrderSchema: Schema = new Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  altPhone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  items: [OrderItemSchema],
  totalINR: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IOrder>('Order', OrderSchema);