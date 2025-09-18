import mongoose, { Document, Schema } from 'mongoose';

export interface IShop extends Document {
  description: string;
  youtubeUrl: string;
  owner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

const ShopSchema: Schema = new Schema({
  description: {
    type: String,
    default: ''
  },
  youtubeUrl: {
    type: String,
    default: ''
  },
  owner: {
    name: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IShop>('Shop', ShopSchema);