import mongoose from 'mongoose';
import Remark from './Remark.js';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

productSchema.statics.updateAverageRating = async function (productId) {
    const result = await Remark.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId) } },
        { 
            $group: {
                _id: '$product',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    const averageRating = result.length > 0 ? result[0].averageRating : 0;
    
    await this.findByIdAndUpdate(productId, {
        averageRating: Math.round(averageRating * 10) / 10 // 四舍五入到一位小数
    });
};

export default mongoose.model('Product', productSchema);
//mongoose.model inherited from Mongoose.Model
//Inheritance chain: Product <- Model 