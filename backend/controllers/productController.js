import Product from '../models/Product.js';

const createProduct = async (req, res) => {
    try {
        const { name, description, price, images, stock } = req.body;
        const provider = req.user._id;
        const product = new Product({ name, description, provider, price, images, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('provider', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('provider', 'name email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, images, stock } = req.body;
        
        // 查找产品并验证所有权
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // 验证当前用户是否是产品的提供者
        if (product.provider.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }
        
        // 更新产品
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { name, description, price, images, stock }, 
            { new: true }
        ).populate('provider', 'name email');
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        // 查找产品并验证所有权
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // 验证当前用户是否是产品的提供者
        if (product.provider.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }
        
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
