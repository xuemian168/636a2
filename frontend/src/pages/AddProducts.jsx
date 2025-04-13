import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== 'admin') {
      setError('Not authorized to add products.');
      return;
    }
    try {
      await axiosInstance.post('/api/products', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to add product. Please try again.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <input 
          type="text" 
          placeholder="Product Name" 
          value={formData.name} 
          onChange={(e)=> setFormData({...formData, name: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea 
          placeholder="Description" 
          value={formData.description} 
          onChange={(e)=> setFormData({...formData, description: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
          required
        ></textarea>
        <input 
          type="number" 
          placeholder="Price" 
          value={formData.price} 
          onChange={(e)=> setFormData({...formData, price: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={formData.image} 
          onChange={(e)=> setFormData({...formData, image: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
        />
        <input 
          type="number" 
          placeholder="Stock" 
          value={formData.stock} 
          onChange={(e)=> setFormData({...formData, stock: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input 
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e)=> setFormData({...formData, category: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
