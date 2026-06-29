# 🌲 Forest Pet Shop

A full-stack e-commerce application for pet products with a beautiful dark forest theme. Built with React, TypeScript, Node.js, and MongoDB.
 
**🚀 Live Demo**: 
- Frontend: https://zoophilist-frontend.onrender.com
- Backend API: https://zoophilist-server.onrender.com

## ✨ Features

### User Features
- 🏠 **Beautiful Homepage** with shop description and YouTube video embed
- 🛒 **Product Catalog** with category filtering
- 🐾 **Responsive Design** with forest-themed animations
- 📱 **Mobile-Friendly** interface
- 💰 **INR Currency** support with ₹ symbol
- 🎯 **Easy Ordering** with customer details form

### Admin Features
- 🔐 **Secure Authentication** with JWT
- 📝 **Shop Management** (description, video, owner info)
- 📦 **Product Management** (CRUD operations)
- 🏷️ **Category Management** (CRUD operations)
- 📊 **Order Management** with date filtering
- 📈 **CSV Export** for customer orders

### Technical Features
- 🌙 **Dark Forest Theme** with custom animations
- 🎨 **Design System** with semantic tokens
- ⚡ **Real-time Updates** between admin and user pages
- 🔒 **Security** with bcrypt password hashing
- 📱 **Responsive** design for all devices
- 🎭 **Accessibility** with animation toggle

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd forest-pet-shop
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Create Initial Admin**
   - Visit the backend API at `http://localhost:5000/api/auth/create-initial-admin`
   - Or use the "Create Initial Admin" button on the admin login page
   - Default credentials: `admin` / `admin123`

## 📁 Project Structure

```
forest-pet-shop/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── api/           # Axios configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin pages
│   │   │   └── user/      # User pages
│   │   └── types.ts       # TypeScript types
│   └── package.json
├── server/                # Backend Node.js app
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   └── routes/        # API routes
│   └── package.json
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-initial-admin` - Create initial admin (one-time)

### Shop Management
- `GET /api/shop` - Get shop settings
- `PUT /api/shop` - Update shop settings (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/export` - Export orders as CSV (admin only)

## 🎨 Design System

The app uses a carefully crafted design system with:

- **Color Palette**: Deep forest greens (#07130b, #0b2b1c, #1f7a5b)
- **Typography**: Inter font with semantic text styles
- **Components**: Custom variants for buttons, cards, and inputs
- **Animations**: CSS keyframes for forest-themed effects
- **Responsive**: Mobile-first design approach

## 🔧 Environment Variables

### Server (.env)
```
MONGO_URI=mongodb://localhost:27017/forest-pet-shop
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

### Client (optional .env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Sample Data

The app includes sample categories:
- 🐕 Dogs
- 🐱 Cats  
- 🐠 Fishes
- 🍖 Food
- 🎾 Accessories

## 🚀 Deployment

### Production Build

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
```

### Environment Setup
- Set up MongoDB Atlas for production database
- Configure environment variables for production
- Set up CORS for your production domain
- Consider adding rate limiting for production

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation and sanitization
- Error handling middleware
- CORS configuration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🐛 Known Issues & TODO

- [ ] Add cloud storage integration (S3/Cloudinary) for image uploads
- [ ] Implement email notifications for orders
- [ ] Add payment gateway integration
- [ ] Implement product reviews and ratings
- [ ] Add inventory alerts for low stock
- [ ] Implement search functionality
- [ ] Add product variants (size, color)
- [ ] Implement wishlist feature

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

Made with ❤️ by the Forest Pet Shop team 🌲