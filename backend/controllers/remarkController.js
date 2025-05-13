import Remark from '../models/Remark.js';
import { BaseController } from './BaseController.js';

class RemarkController extends BaseController {
    constructor() {
        super(Remark);
    }
}

const remarkController = new RemarkController();

export const getAllRemarks = (...args) => remarkController.getAll(...args);
export const getRemarkById = (...args) => remarkController.getById(...args);

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
