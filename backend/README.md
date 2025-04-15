# Backend Documentation

## Overview
This is the backend service for the e-commerce platform. It provides RESTful APIs for user authentication, product management, and remark functionality.

## Technologies
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- ES Modules

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote)

### Installation
1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example` with your configuration:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```
5. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout User (protected)
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `GET /api/auth/users` - Get All Users (admin only)
- `PUT /api/auth/users/:id` - Edit User Information (admin only)
- `DELETE /api/auth/users/:id` - Delete User (admin only)

### Products
- `POST /api/products` - Create a new product (provider only)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (provider only)
- `DELETE /api/products/:id` - Delete product (provider only)
- `GET /api/products/:id/remarks` - Get Remark by Product ID (provider only)

### Remarks
- `POST /api/remarks` - Create a new remark (seller only)
- `GET /api/remarks` - Get all remarks
- `GET /api/remarks/:id` - Get remark by ID
- `PUT /api/remarks/:id` - Update remark (seller only)
- `DELETE /api/remarks/:id` - Delete remark (seller only)

## User Roles
The system supports three user roles:
- **Admin**: Full access to all resources
- **Provider**: Can manage products and view all remarks belong their products
- **Seller**: Can manage remarks

## Default Users
The system automatically creates the following default users for testing purposes:

| Name | Email | Password | Role | Phone | Description |
|------|-------|----------|------|-------|-------------|
| Admin | admin@qut.com | admin123 | admin | 0411106666 | Full access to all resources |
| Provider | provider@qut.com | provider123 | provider | 0411107777 | Can create and manage products |
| Seller | seller@qut.com | seller123 | seller | 0411108888 | Can create and manage remarks |

These users are created during the initial database setup when the application starts for the first time. They are useful for testing different user roles and permissions.

## Project Structure
```
backend/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── tests/          # Test files
├── .env            # Environment variables
├── .env.example    # Example environment variables
├── package.json    # Project dependencies
└── server.js       # Entry point
```

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Authentication
Authentication is handled using JWT (JSON Web Tokens). To access protected routes, include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Development
For development, use:
```
npm run dev
```

## Testing
To run tests:
```
npm test
```


