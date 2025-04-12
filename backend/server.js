import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import remarkRoutes from './routes/remarkRoutes.js';

dotenv.config();

const app = express();
// 允许跨域请求
app.use(cors());
// 解析JSON请求体
app.use(express.json());
// 路由
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/remarks', remarkRoutes);

const PORT = process.env.PORT || 5001;

// 仅在直接运行时启动服务器
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
  });
}

export default app;
