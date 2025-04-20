
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Index = () => {
  // 列表首页，展示
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 挂载时获取所有产品
    axiosInstance.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Product Remarking System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;