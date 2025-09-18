import { Shop, Category, Product, Order } from '../types';

// Mock data for development/demo
export const mockShop: Shop = {
  description: 'Your trusted companion for all pet needs in the heart of nature. We provide premium quality products for your beloved pets.',
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  owner: {
    name: 'Forest Pet Shop Owner',
    phone: '+91 98765 43210',
    email: 'contact@forestpetshop.com',
    address: '123 Forest Lane, Green Valley, Nature City - 560001'
  }
};

export const mockCategories: Category[] = [
  { _id: '1', name: 'Dogs' },
  { _id: '2', name: 'Cats' },
  { _id: '3', name: 'Fishes' },
  { _id: '4', name: 'Food' },
  { _id: '5', name: 'Accessories' },
];

export const mockProducts: Product[] = [
  {
    _id: '1',
    category: mockCategories[0],
    name: 'Premium Dog Food',
    description: 'High-quality nutritious food for adult dogs. Made with real chicken and vegetables.',
    priceINR: 1250,
    stock: 25,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop'
  },
  {
    _id: '2',
    category: mockCategories[1],
    name: 'Cat Scratching Post',
    description: 'Durable scratching post with multiple levels for your feline friend.',
    priceINR: 2800,
    stock: 15,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=400&fit=crop'
  },
  {
    _id: '3',
    category: mockCategories[2],
    name: 'Aquarium Filter',
    description: 'Advanced filtration system for crystal clear aquarium water.',
    priceINR: 3500,
    stock: 8,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop'
  },
  {
    _id: '4',
    category: mockCategories[0],
    name: 'Dog Leash & Collar Set',
    description: 'Comfortable and durable leash and collar set for daily walks.',
    priceINR: 850,
    stock: 30,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop'
  },
  {
    _id: '5',
    category: mockCategories[1],
    name: 'Cat Treats',
    description: 'Healthy and delicious treats that cats absolutely love.',
    priceINR: 450,
    stock: 50,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop'
  },
  {
    _id: '6',
    category: mockCategories[4],
    name: 'Pet Bed',
    description: 'Soft and cozy bed for your pet\'s comfortable sleep.',
    priceINR: 1800,
    stock: 12,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
  },
  {
    _id: '7',
    category: mockCategories[0],
    name: 'Dog Toy Bundle',
    description: 'Set of 5 interactive toys to keep your dog entertained and active.',
    priceINR: 1200,
    stock: 20,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop'
  },
  {
    _id: '8',
    category: mockCategories[1],
    name: 'Cat Litter Box',
    description: 'Self-cleaning litter box with odor control technology.',
    priceINR: 4500,
    stock: 6,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop'
  },
  {
    _id: '9',
    category: mockCategories[2],
    name: 'Fish Food Flakes',
    description: 'Nutritious flakes for tropical fish. Rich in vitamins and minerals.',
    priceINR: 350,
    stock: 35,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400&h=400&fit=crop'
  },
  {
    _id: '10',
    category: mockCategories[3],
    name: 'Organic Pet Food',
    description: 'Premium organic food suitable for both cats and dogs.',
    priceINR: 2200,
    stock: 18,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop'
  },
  {
    _id: '11',
    category: mockCategories[4],
    name: 'Pet Carrier',
    description: 'Comfortable and secure carrier for traveling with your pet.',
    priceINR: 3200,
    stock: 10,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=400&h=400&fit=crop'
  },
  {
    _id: '12',
    category: mockCategories[0],
    name: 'Dog Training Treats',
    description: 'Small, healthy treats perfect for training sessions.',
    priceINR: 650,
    stock: 40,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop'
  },
  {
    _id: '13',
    category: mockCategories[1],
    name: 'Cat Water Fountain',
    description: 'Automatic water fountain to keep your cat hydrated.',
    priceINR: 2900,
    stock: 12,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&h=400&fit=crop'
  },
  {
    _id: '14',
    category: mockCategories[2],
    name: 'Aquarium LED Light',
    description: 'Energy-efficient LED lighting system for aquariums.',
    priceINR: 2500,
    stock: 7,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400&h=400&fit=crop'
  },
  {
    _id: '15',
    category: mockCategories[4],
    name: 'Pet ID Tags',
    description: 'Customizable ID tags for pet safety and identification.',
    priceINR: 250,
    stock: 60,
    available: true,
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop'
  }
];

export const mockOrders: Order[] = [
  {
    _id: '1',
    customerName: 'Rajesh Kumar',
    phone: '+91 9876543210',
    altPhone: '+91 8765432109',
    address: '123 MG Road, Bangalore, Karnataka - 560001',
    items: [
      { product: '1', name: 'Premium Dog Food', priceINR: 1250, quantity: 2 },
      { product: '4', name: 'Dog Leash & Collar Set', priceINR: 850, quantity: 1 }
    ],
    totalINR: 3350,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    customerName: 'Priya Sharma',
    phone: '+91 7654321098',
    address: '456 Park Street, Mumbai, Maharashtra - 400001',
    items: [
      { product: '2', name: 'Cat Scratching Post', priceINR: 2800, quantity: 1 },
      { product: '5', name: 'Cat Treats', priceINR: 450, quantity: 2 }
    ],
    totalINR: 3700,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    customerName: 'Amit Patel',
    phone: '+91 8765432109',
    altPhone: '+91 9876543210',
    address: '789 Ring Road, Ahmedabad, Gujarat - 380001',
    items: [
      { product: '3', name: 'Aquarium Filter', priceINR: 3500, quantity: 1 },
      { product: '9', name: 'Fish Food Flakes', priceINR: 350, quantity: 3 }
    ],
    totalINR: 4550,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: '4',
    customerName: 'Sneha Reddy',
    phone: '+91 6543210987',
    address: '321 Jubilee Hills, Hyderabad, Telangana - 500033',
    items: [
      { product: '6', name: 'Pet Bed', priceINR: 1800, quantity: 1 },
      { product: '15', name: 'Pet ID Tags', priceINR: 250, quantity: 2 }
    ],
    totalINR: 2300,
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    _id: '5',
    customerName: 'Vikram Singh',
    phone: '+91 5432109876',
    address: '567 Civil Lines, Delhi - 110001',
    items: [
      { product: '7', name: 'Dog Toy Bundle', priceINR: 1200, quantity: 1 },
      { product: '12', name: 'Dog Training Treats', priceINR: 650, quantity: 2 }
    ],
    totalINR: 2500,
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    _id: '6',
    customerName: 'Ananya Iyer',
    phone: '+91 4321098765',
    altPhone: '+91 3210987654',
    address: '890 Anna Nagar, Chennai, Tamil Nadu - 600040',
    items: [
      { product: '8', name: 'Cat Litter Box', priceINR: 4500, quantity: 1 }
    ],
    totalINR: 4500,
    createdAt: new Date(Date.now() - 432000000).toISOString()
  }
];