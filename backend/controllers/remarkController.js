import Remark from '../models/Remark.js';

export const createRemark = async (req, res) => {
    const { content, product, user, rating, images } = req.body;
    const remark = new Remark({ content, product, user, rating, images });
    await remark.save();
    res.status(201).json(remark);  
};

export const getAllRemarks = async (req, res) => {
    const remarks = await Remark.find();
    res.status(200).json(remarks);
};

export const getRemarkById = async (req, res) => {
    const remark = await Remark.findById(req.params.id);
    if (!remark) {
        return res.status(404).json({ message: 'Remark not found' });
    }
    res.status(200).json(remark);
};

export const updateRemark = async (req, res) => {
    const { content, product, user, rating, images } = req.body;
    const updatedRemark = await Remark.findByIdAndUpdate(
        req.params.id, 
        { content, product, user, rating, images }, 
        { new: true }
    );
    res.status(200).json(updatedRemark);
};

export const deleteRemark = async (req, res) => {
    await Remark.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Remark deleted' });
};
