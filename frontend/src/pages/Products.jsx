import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  // 公共产品
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/api/products') // GET /api/products
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p>{p.description}</p>
            <button onClick={() => navigate(`/remark-product`)} className="mt-2 bg-blue-600 text-white p-2 rounded">
              Remark
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;