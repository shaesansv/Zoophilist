import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId, available: true })
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, photoUrl, priceINR, stock, available } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Product description is required' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (priceINR < 0) {
      return res.status(400).json({ message: 'Price must be non-negative' });
    }
    if (stock < 0) {
      return res.status(400).json({ message: 'Stock must be non-negative' });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      category,
      photoUrl: photoUrl || '',
      priceINR,
      stock,
      available: available !== undefined ? available : true
    });

    await product.save();
    await product.populate('category', 'name');

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validation
    if (updateData.priceINR && updateData.priceINR < 0) {
      return res.status(400).json({ message: 'Price must be non-negative' });
    }
    if (updateData.stock && updateData.stock < 0) {
      return res.status(400).json({ message: 'Stock must be non-negative' });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};