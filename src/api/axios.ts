import axios from "axios";
import { mockShop, mockCategories, mockProducts, mockOrders } from "./mockData";

// Mock API for demo purposes - replace with real backend
const USE_MOCK_API = false; // Set to false when backend is ready

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://zoophilist-server.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock API responses
const mockAPI = {
  get: (url: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url === "/shop") {
          resolve({ data: mockShop });
        } else if (url === "/categories") {
          resolve({ data: mockCategories });
        } else if (url === "/products") {
          resolve({ data: mockProducts });
        } else if (url === "/orders") {
          resolve({ data: mockOrders });
        } else {
          resolve({ data: null });
        }
      }, 500); // Simulate network delay
    });
  },
  post: (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/auth/login") {
          if (data.username === "admin" && data.password === "admin123") {
            resolve({ data: { token: "mock-jwt-token" } });
          } else {
            reject({ response: { data: { message: "Invalid credentials" } } });
          }
        } else if (url === "/auth/create-initial-admin") {
          resolve({ data: { username: "admin", password: "admin123" } });
        } else if (url === "/orders") {
          resolve({ data: { message: "Order created", order: data } });
        } else {
          resolve({ data: data });
        }
      }, 500);
    });
  },
  put: (url: string, data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: data });
      }, 500);
    });
  },
  delete: (url: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Deleted successfully" } });
      }, 500);
    });
  },
};

// Override axios methods with mock when enabled
if (USE_MOCK_API) {
  api.get = mockAPI.get as any;
  api.post = mockAPI.post as any;
  api.put = mockAPI.put as any;
  api.delete = mockAPI.delete as any;
} else {
  // Request interceptor to add auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear token and redirect to login on unauthorized
        localStorage.removeItem("admin_token");
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
      }
      return Promise.reject(error);
    }
  );
}

export default api;

// Helper functions for token management
export const setAuthToken = (token: string) => {
  localStorage.setItem("admin_token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("admin_token");
};

export const getAuthToken = () => {
  return localStorage.getItem("admin_token");
};
