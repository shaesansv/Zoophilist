import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import ProductCard from "../../components/ProductCard";
import { OrderFormData, CreateOrderRequest } from "../../types";
import api from "../../api/axios";
import { useToast } from "../../hooks/use-toast";

const Order: React.FC = () => {
  const { categories, products, refreshProducts } = useAppContext();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    quantity: number;
  } | null>(null);
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    customerName: "",
    phone: "",
    altPhone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    refreshProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category._id === selectedCategory && product.available
      )
    : products.filter((product) => product.available);

  const handleBuy = (productId: string, quantity: number) => {
    setSelectedProduct({ id: productId, quantity });
    setShowCheckout(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSubmitting(true);
    try {
      const orderData: CreateOrderRequest = {
        customerName: orderForm.customerName,
        phone: orderForm.phone,
        altPhone: orderForm.altPhone || undefined,
        address: orderForm.address,
        items: [
          {
            productId: selectedProduct.id,
            quantity: selectedProduct.quantity,
          },
        ],
      };

      await api.post("/orders", orderData);

      // Refresh products to update stock
      await refreshProducts();

      // Show success animation
      setShowConfirmation(true);
      setShowCheckout(false);

      // Reset form
      setOrderForm({
        customerName: "",
        phone: "",
        altPhone: "",
        address: "",
      });

      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedProduct(null);
      }, 3000);

      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your furry friend's needs are on the way!",
      });
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.response?.data?.message || "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-forest-glow mb-4">
            Order Placed!
          </h1>
          <p className="text-xl text-forest-text mb-6">
            Thank you for choosing Zoophilist!
          </p>
          <p className="text-xl text-forest-text mb-6">
            We will contact you soon😊💕
          </p>
          <div className="flex justify-center space-x-4 text-4xl animate-float">
            <span>🐕</span>
            <span>🐱</span>
            <span>🐠</span>
            <span>🐾</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Shop for Your Pets 🛒
        </h1>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground hover:bg-accent"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category._id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-accent"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onBuy={handleBuy}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Products Found
            </h3>
            <p className="text-forest-text">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="forest-card max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Complete Your Order
              </h2>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.customerName}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    className="forest-input w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderForm.phone}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="forest-input w-full"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Alternate Phone
                  </label>
                  <input
                    type="tel"
                    value={orderForm.altPhone}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        altPhone: e.target.value,
                      }))
                    }
                    className="forest-input w-full"
                    placeholder="Enter alternate phone (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={orderForm.address}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="forest-input w-full resize-none"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="forest-button flex-1"
                  >
                    {submitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
