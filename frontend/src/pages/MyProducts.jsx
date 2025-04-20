//provider 我这里用的是admin 查看自己发布的产品，对应 "/my-products"。

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 只有 admin 能访问本页面
    if (user?.role !== 'admin') {
      console.warn('Not authorized: only admins can view this page');
      return;
    }

    axiosInstance
      .get('/api/products', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(res => {
        // 全部产品由 admin 管理
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
      });
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('确认删除此产品？')) return;
    try {
      await axiosInstance.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('删除失败', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products (Admin)</h2>
      {products.length === 0 && (
        <p className="text-gray-600">no product</p>
      )}
      {products.map(p => (
        <div key={p._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-gray-600 mb-2">{p.description}</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-product/${p._id}`)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
