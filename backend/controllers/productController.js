import Product from '../models/Product';
import { isProvider } from '../middleware/authMiddleware';

const createProduct = async (req, res) => {
    if (!isProvider(req, res, next)) {
        return res.status(403).json({ message: 'Not authorized as provider' });
    }
    
    const { name, description, price, image, stock } = req.body;
    const provider = req.user._id;
    const product = new Product({ name, description, provider, price, image, stock });
    await product.save();
    res.status(201).json(product);
};

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};

const updateProduct = async (req, res) => {
    const { name, description, price, image, stock } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, image, stock }, { new: true });
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
