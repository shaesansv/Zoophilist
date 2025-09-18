// Type definitions for the Pet Shop API

export interface User {
  _id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  category: Category;
  name: string;
  description: string;
  priceINR: number;
  stock: number;
  available: boolean;
  photoUrl: string;
}

export interface Shop {
  _id?: string;
  description: string;
  youtubeUrl: string;
  owner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface OrderItem {
  product: string;
  name: string;
  priceINR: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  items: OrderItem[];
  totalINR: number;
  createdAt: string;
}

export interface CreateOrderRequest {
  customerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface AuthResponse {
  token: string;
}

export interface ApiError {
  message: string;
  details?: any;
}

export interface OrderFormData {
  customerName: string;
  phone: string;
  altPhone: string;
  address: string;
}