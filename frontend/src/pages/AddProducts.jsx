import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AddProduct = () => {
 
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []     
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {

      setForm({ ...form, images: value.split(',').map(s => s.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

     // 提交产品
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/api/products',
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          images: form.images
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
         // 成功后跳回 管理产品 列表
      navigate('/manage-products');
    } catch (err) {
      setError(err.response?.data?.message || 'Create failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
       
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
      
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
           {/* 库存 */}
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border rounded"
          required
        />
           {/* 图片 */}
        <input
          name="images"
          value={form.images.join(', ')}
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
