import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, altPhone, address, items } = req.body;

    // Validation
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ message: 'Customer name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!address || !address.trim()) {
      return res.status(400).json({ message: 'Address is required' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    // Validate and process items
    const orderItems = [];
    let totalINR = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }
      if (!product.available) {
        return res.status(400).json({ message: `Product ${product.name} is not available` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        priceINR: product.priceINR,
        quantity: item.quantity
      });

      totalINR += product.priceINR * item.quantity;
    }

    // Create order
    const order = new Order({
      customerName: customerName.trim(),
      phone: phone.trim(),
      altPhone: altPhone?.trim(),
      address: address.trim(),
      items: orderItems,
      totalINR
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('items.product', 'name');
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportOrders = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    
    let query: any = {};
    
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from as string);
      if (to) query.createdAt.$lte = new Date(to as string);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    // Create CSV content
    const csvHeader = 'Order ID,Customer Name,Phone,Alt Phone,Address,Total INR,Created At,Items\n';
    const csvRows = orders.map(order => {
      const items = JSON.stringify(order.items.map(item => `${item.name} (x${item.quantity})`));
      return `${order._id},"${order.customerName}","${order.phone}","${order.altPhone || ''}","${order.address.replace(/"/g, '""')}","${order.totalINR}","${order.createdAt.toISOString()}","${items.replace(/"/g, '""')}"`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    res.send(csvContent);
  } catch (error) {
    console.error('Export orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};