      // Route 对应的 path /manage-products	 管理员增删改查所有产品，对应 "/manage-products"。

      import React, { useEffect, useState } from 'react';
      import { useAuth } from '../context/AuthContext';
      import axiosInstance from '../axiosConfig';
      import { useNavigate } from 'react-router-dom';
      
      const ManageProducts = () => {
        const [products, setProducts] = useState([]);
        const { user } = useAuth();
        const navigate = useNavigate();
      
        useEffect(() => {
          // 管理员接口，包含 provider info admin就是provider
          axiosInstance.get('/api/products', { headers: { Authorization: `Bearer ${user.token}` } })
            .then(res => setProducts(res.data));
        }, [user]);
      
        const deleteProduct = id => {
          axiosInstance.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
            .then(() => setProducts(prev => prev.filter(p => p._id !== id)));
        };
      
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <button onClick={() => navigate('/add-product')} className="bg-green-600 text-white p-2 rounded mb-4">
              Add Product
            </button>
            {products.map(p => (
              <div key={p._id} className="border p-4 rounded mb-2">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => navigate(`/edit-product/${p._id}`)} className="bg-yellow-500 text-white p-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(p._id)} className="bg-red-600 text-white p-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      };
      export default ManageProducts;