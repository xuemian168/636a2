import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

const isProvider = async (req, res, next) => {
    if (req.user && req.user.role === 'provider') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as provider' });
    }
};

const isSeller = async (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as seller' });
    }
};

const isSellerorAdmin = async (req, res, next) => {
    if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as seller or admin' });
    }
}

const isProviderorAdmin = async (req, res, next) => {   
    if (req.user && (req.user.role === 'provider' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as provider or admin' });
    }
}
                
export { protect, isAdmin, isProvider, isSeller, isSellerorAdmin, isProviderorAdmin };
