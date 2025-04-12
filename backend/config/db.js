const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const initializeData = async () => {
  try {
    await User.deleteMany({});

    // Create admin account
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@qut.com',
      password: 'admin123', 
      role: 'admin',
      phone: '0411106666',
    });

    // 初始化产品


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
    
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      console.log("Initializing database with sample data...");
      await initializeData();
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
