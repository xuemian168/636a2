import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 只有 admin 能进 —— 
    if (!user || user.role !== 'admin') {
      setError('Not authorized');
      return;
    }

    // 管理员拉取所有产品
    axiosInstance
      .get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err =>
        setError(err.response?.data?.message || 'Failed to load products')
      );
  }, [user]);

  if (error) {
    return <div className="text-red-600 p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products (Admin)</h2>
      <button
        onClick={() => navigate('/add-product')}
        className="bg-green-600 text-white p-2 rounded mb-4"
      >
        Add Product
      </button>

      {products.map((p) => (
        <div key={p._id} className="border p-4 rounded mb-2">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-gray-600">{p.description}</p>
          <p className="mt-1">Price: ${p.price}</p>
          <p>Stock: {p.stock}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => navigate(`/edit-product/${p._id}`)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                axiosInstance
                  .delete(`/api/products/${p._id}`)
                  .then(() =>
                    setProducts((prev) =>
                      prev.filter((x) => x._id !== p._id)
                    )
                  );
              }}
              className="bg-red-600 text-white px-2 py-1 rounded"
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
