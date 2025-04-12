import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Product from "../models/Product.js";

const initializeData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    // Create admin account
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@qut.com',
      password: 'admin123', 
      role: 'admin',
      phone: '0411106666',
    });

    const provider = await User.create({
      name: 'Provider',
      email: 'provider@qut.com',
      password: 'provider123',
      role: 'provider',
      phone: '0411107777',
    });

    const seller = await User.create({
      name: 'Seller',
      email: 'seller@qut.com',
      password: 'seller123',
      role: 'seller',
      phone: '0411108888',
    });

    // 初始化产品，图片来自网络
    const product = await Product.create({
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      stock: 100,
    });
    const product2 = await Product.create({
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      stock: 200,
    });
    const product3 = await Product.create({
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      stock: 300,
    });

    await product.save();
    await product2.save();
    await product3.save();

    console.log('Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Initializing database with sample data...");
      await initializeData();
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
