import { Request, Response } from 'express';
import Shop from '../models/Shop';

export const getShop = async (req: Request, res: Response) => {
  try {
    let shop = await Shop.findOne();
    
    if (!shop) {
      // Create default shop if it doesn't exist
      shop = new Shop({
        description: 'Your trusted companion for all pet needs in the heart of nature',
        youtubeUrl: '',
        owner: {
          name: 'Forest Pet Shop Owner',
          phone: '+91 98765 43210',
          email: 'contact@forestpetshop.com',
          address: '123 Forest Lane, Green Valley, Nature City - 560001'
        }
      });
      await shop.save();
    }

    res.json(shop);
  } catch (error) {
    console.error('Get shop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const { description, youtubeUrl, owner } = req.body;

    let shop = await Shop.findOne();
    
    if (!shop) {
      shop = new Shop();
    }

    if (description !== undefined) shop.description = description;
    if (youtubeUrl !== undefined) shop.youtubeUrl = youtubeUrl;
    if (owner) {
      shop.owner = { ...shop.owner, ...owner };
    }

    await shop.save();
    res.json(shop);
  } catch (error) {
    console.error('Update shop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};