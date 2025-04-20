import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const EditProduct = () => {
  const { id } = useParams();      // 从 URL 抓产品 ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  });
  const [error, setError] = useState(null);

  // 初次渲染时拉取产品详情
  useEffect(() => {
    axiosInstance
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(res => {
        const p = res.data;
        // 填表单
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          images: p.images
        });
      })
      .catch(err => setError('Load failed'));
  }, [id, user.token]);

  // 表单字段变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setForm({ ...form, images: value.split(',').map(s => s.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 提交更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/api/products/${id}`,
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          images: form.images
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/manage-products');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

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
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border rounded"
          required
        />
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
          className="w-full bg-yellow-500 text-white p-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
