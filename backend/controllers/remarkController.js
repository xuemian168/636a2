import Remark from '../models/Remark.js';

export const createRemark = async (req, res) => {
    try {
        const { content, product, rating, images } = req.body;
        // 使用 req.user._id 作为用户 ID，而不是从请求体中获取
        const remark = new Remark({ 
            content, 
            product, 
            user: req.user._id, 
            rating, 
            images 
        });
        await remark.save();
        res.status(201).json(remark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRemarks = async (req, res) => {
    if (req.user.role == 'admin') {
        try {
            const remarks = await Remark.find().populate('user', 'name email').populate('product', 'name');
            res.status(200).json(remarks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        // 如果用户不是管理员，只返回与其相关的评论
        try {
            const remarks = await Remark.find({ user: req.user._id }).populate('user', 'name email').populate('product', 'name');
            res.status(200).json(remarks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getRemarkById = async (req, res) => {
    try {
        const remark = await Remark.findById(req.params.id).populate('user', 'name email').populate('product', 'name');
        if (!remark) {
            return res.status(404).json({ message: 'Remark not found' });
        }
        res.status(200).json(remark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRemarkByProductId = async (req, res) => {
    try {
        const remarks = await Remark.find({ product: req.params.id }).populate('user', 'name email').populate('product', 'name');
        res.status(200).json(remarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateRemark = async (req, res) => {
    try {
        const { content, rating, images } = req.body;
        // 查找备注并验证所有权
        const remark = await Remark.findById(req.params.id);
        if (!remark) {
            return res.status(404).json({ message: 'Remark not found' });
        }
        
        // 验证当前用户是否是评论的所有者
        if (remark.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this remark' });
        }
        
        // 更新评论
        const updatedRemark = await Remark.findByIdAndUpdate(
            req.params.id, 
            { content, rating, images }, 
            { new: true }
        ).populate('user', 'name email').populate('product', 'name');
        
        res.status(200).json(updatedRemark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRemark = async (req, res) => {
    try {
        // 查找并验证所有权
        const remark = await Remark.findById(req.params.id);
        if (!remark) {
            return res.status(404).json({ message: 'Remark not found' });
        }
        
        // 验证当前用户是否是评论的所有者
        if (remark.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this remark' });
        }
        
        await Remark.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Remark deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
