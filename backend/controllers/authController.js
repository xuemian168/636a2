import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;
        
        // 检查用户是否已存在
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User is already exists' });
        }

        // 检查密码是否符合要求
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // 不允许创建role为admin
        if (role === 'admin') {
            return res.status(400).json({ message: 'Admin role is not allowed to be created' });
        }

        // 创建新用户，包含所有必要字段
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address,
            role: role || 'seller',
        });

        // 返回用户信息，包含所有相关字段
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Register failed', 
            error: error.message 
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, email, phone, address } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        // user.role = role || user.role; 不允许更新role
        
        const updatedUser = await user.save();
        res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone, address: updatedUser.address, token: generateToken(updatedUser.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // 采用伪删除 让status = inactive
        await User.findByIdAndUpdate(id, { status: 'inactive' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, role } = req.body;
        await User.findByIdAndUpdate(id, { name, email, phone, address,role });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateUserProfile, logoutUser, getAllUsers, deleteUser, updateUser };
