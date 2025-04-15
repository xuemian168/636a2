import mongoose from 'mongoose';
import Product from './Product.js';

const remarkSchema = new mongoose.Schema({
    content: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// 添加评论后自动更新产品的平均评分
remarkSchema.post('save', async function() {
    await mongoose.model('Product').updateAverageRating(this.product);
});

// 删除评论后自动更新产品的平均评分
remarkSchema.post('remove', async function() {
    await mongoose.model('Product').updateAverageRating(this.product);
});

export default mongoose.model('Remark', remarkSchema);