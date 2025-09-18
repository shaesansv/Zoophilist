import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onBuy: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    if (product.stock >= quantity && quantity > 0) {
      onBuy(product._id, quantity);
    }
  };

  return (
    <div className="forest-card group">
      <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-forest-medium">
        <img
          src={product.photoUrl || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
          <p className="text-forest-text text-sm line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="currency text-2xl font-bold text-forest-glow">
            ₹{product.priceINR.toLocaleString('en-IN')}
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            product.stock > 0 
              ? 'text-forest-glow bg-forest-glow/10' 
              : 'text-destructive bg-destructive/10'
          }`}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </span>
        </div>
        
        {product.available && product.stock > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 flex-1">
              <label className="text-sm text-forest-text">Qty:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="forest-input w-16 text-center"
              />
            </div>
            <button
              onClick={handleBuy}
              className="forest-button flex-1"
              disabled={quantity > product.stock}
            >
              Buy Now
            </button>
          </div>
        )}
        
        {!product.available && (
          <button disabled className="w-full py-2 bg-muted text-muted-foreground rounded-lg">
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;