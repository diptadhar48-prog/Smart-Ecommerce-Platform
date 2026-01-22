# Smart E-Commerce & Service Management Platform

A full-stack MERN e-commerce platform with role-based authentication, product management, order tracking, and review system.

## Features

### User Features
- Browse products with search and filtering
- View detailed product information and reviews
- Purchase products with order confirmation
- User authentication (Email/Password, Google, GitHub)
- User dashboard to manage orders
- Submit and manage product reviews
- Track order status in real-time

### Admin Features
- Complete product CRUD operations
- Manage all orders and update status
- View customer information
- Monitor inventory levels

### Technical Features
- RESTful API architecture
- Firebase Authentication with social login
- MongoDB database with Mongoose ODM
- Role-based access control (Admin/User)
- Responsive design (Mobile, Tablet, Desktop)
- Real-time order status updates
- Secure token-based authentication

## Technology Stack

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- DaisyUI
- Firebase SDK
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Firebase Admin SDK
- JWT Authentication

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
- Set MongoDB URI
- Set Firebase Admin credentials
- Configure other settings

5. Start the server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure Firebase credentials in `.env`

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication methods:
   - Email/Password
   - Google
   - GitHub
3. Generate Firebase Admin SDK credentials
4. Add credentials to backend `.env`
5. Add web app credentials to frontend `.env`

## MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and add to backend `.env`

## Default Admin Setup

To create an admin user:
1. Register a new user through the application
2. Update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register/Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status (Admin)
- `DELETE /api/orders/:id` - Cancel order

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Project Structure

```
smart-ecommerce-platform/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── reviews.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ReviewSlider.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── dashboard/
│   │   │       ├── UserOrders.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       └── Checkout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── About.jsx
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Security Features

- Firebase Authentication for secure user management
- JWT token-based API authentication
- Role-based access control
- Password hashing (handled by Firebase)
- Environment variable protection
- CORS configuration
- Input validation
- MongoDB injection prevention

## Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy using Git
3. Ensure MongoDB Atlas is accessible

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## Contributing

This project is part of a university assignment. Contributions are welcome for educational purposes.

## License

MIT License - Free to use for educational purposes

## Support

For issues or questions, please create an issue in the repository.

---

**Note**: This is a complete full-stack implementation following all the requirements specified in the project document, including Complex Engineering Properties (WP1, WP2, WP7).
