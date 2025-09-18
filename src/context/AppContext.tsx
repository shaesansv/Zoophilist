import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';
import { Shop, Category, Product, Order } from '../types';

interface AppContextType {
  shop: Shop | null;
  categories: Category[];
  products: Product[];
  orders: Order[];
  loading: boolean;
  error: string | null;
  refreshShop: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshShop = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/shop');
      setShop(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch shop data');
      console.error('Error fetching shop:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAll = async () => {
    await Promise.all([
      refreshShop(),
      refreshCategories(),
      refreshProducts(),
      refreshOrders()
    ]);
  };

  // Initial data load
  useEffect(() => {
    refreshShop();
    refreshCategories();
    refreshProducts();
  }, []);

  const value: AppContextType = {
    shop,
    categories,
    products,
    orders,
    loading,
    error,
    refreshShop,
    refreshCategories,
    refreshProducts,
    refreshOrders,
    refreshAll,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};