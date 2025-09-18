import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import api from '../../api/axios';
import { useToast } from '../../hooks/use-toast';
import { Category, Product } from '../../types';

const AdminProducts: React.FC = () => {
  const { categories, products, refreshCategories, refreshProducts } = useAppContext();
  const { toast } = useToast();
  
  // Category state
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  
  // Product state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    photoUrl: '',
    priceINR: 0,
    stock: 0,
    available: true,
  });
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    refreshCategories();
    refreshProducts();
  }, []);

  // Category handlers
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setSubmitting(true);
    try {
      await api.post('/categories', { name: newCategory.trim() });
      await refreshCategories();
      setNewCategory('');
      toast({
        title: "Category Created",
        description: `Category "${newCategory}" has been added`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to create category',
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCategory = async (categoryId: string) => {
    if (!editCategoryName.trim()) return;

    setSubmitting(true);
    try {
      await api.put(`/categories/${categoryId}`, { name: editCategoryName.trim() });
      await refreshCategories();
      setEditingCategory(null);
      setEditCategoryName('');
      toast({
        title: "Category Updated",
        description: "Category name has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to update category',
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Delete category "${categoryName}"? This will also remove all products in this category.`)) return;

    try {
      await api.delete(`/categories/${categoryId}`);
      await refreshCategories();
      await refreshProducts();
      toast({
        title: "Category Deleted",
        description: `Category "${categoryName}" has been removed`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to delete category',
        variant: "destructive",
      });
    }
  };

  // Product handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productForm.priceINR < 0 || productForm.stock < 0) {
      toast({
        title: "Validation Error",
        description: "Price and stock must be non-negative",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productForm);
        toast({
          title: "Product Updated",
          description: `Product "${productForm.name}" has been updated`,
        });
      } else {
        await api.post('/products', productForm);
        toast({
          title: "Product Created",
          description: `Product "${productForm.name}" has been added`,
        });
      }
      
      await refreshProducts();
      resetProductForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to save product',
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category._id,
      photoUrl: product.photoUrl,
      priceINR: product.priceINR,
      stock: product.stock,
      available: product.available,
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Delete product "${productName}"?`)) return;

    try {
      await api.delete(`/products/${productId}`);
      await refreshProducts();
      toast({
        title: "Product Deleted",
        description: `Product "${productName}" has been removed`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to delete product',
        variant: "destructive",
      });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      category: '',
      photoUrl: '',
      priceINR: 0,
      stock: 0,
      available: true,
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Product Management</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="forest-card">
          <h2 className="text-xl font-bold text-forest-glow mb-6">Categories</h2>
          
          {/* Add Category Form */}
          <form onSubmit={handleCreateCategory} className="flex space-x-2 mb-6">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="forest-input flex-1"
              placeholder="Category name"
              required
            />
            <button type="submit" disabled={submitting} className="forest-button">
              Add
            </button>
          </form>

          {/* Categories List */}
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category._id} className="flex items-center justify-between p-3 bg-forest-medium rounded-lg">
                {editingCategory === category._id ? (
                  <div className="flex space-x-2 flex-1">
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="forest-input flex-1"
                    />
                    <button
                      onClick={() => handleUpdateCategory(category._id)}
                      disabled={submitting}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingCategory(null);
                        setEditCategoryName('');
                      }}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-foreground">{category.name}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingCategory(category._id);
                          setEditCategoryName(category.name);
                        }}
                        className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id, category.name)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="forest-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-forest-glow">Products</h2>
            <button
              onClick={() => setShowProductForm(true)}
              className="forest-button"
            >
              Add Product
            </button>
          </div>

          {/* Products List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div key={product._id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-forest-text">{product.category.name}</p>
                    <p className="currency text-forest-glow font-semibold">₹{product.priceINR}</p>
                    <p className="text-sm text-forest-text">Stock: {product.stock}</p>
                    <p className={`text-sm ${product.available ? 'text-forest-glow' : 'text-destructive'}`}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                      className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="forest-card max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  className="forest-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  className="forest-input w-full resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <select
                  required
                  value={productForm.category}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                  className="forest-input w-full"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Photo URL</label>
                <input
                  type="url"
                  value={productForm.photoUrl}
                  onChange={(e) => setProductForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                  className="forest-input w-full"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-forest-text mt-1">
                  TODO: Replace with cloud storage integration (S3/Cloudinary)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={productForm.priceINR}
                    onChange={(e) => setProductForm(prev => ({ ...prev, priceINR: parseFloat(e.target.value) || 0 }))}
                    className="forest-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Stock *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productForm.stock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="forest-input w-full"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={productForm.available}
                  onChange={(e) => setProductForm(prev => ({ ...prev, available: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="available" className="text-sm text-foreground">
                  Available for purchase
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="forest-button flex-1"
                >
                  {submitting ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;