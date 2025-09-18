import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  category: mongoose.Types.ObjectId;
  name: string;
  description: string;
  priceINR: number;
  stock: number;
  available: boolean;
  photoUrl: string;
}

const ProductSchema: Schema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  priceINR: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  photoUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);