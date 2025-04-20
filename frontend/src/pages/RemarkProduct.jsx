import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const RemarkProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    content: '',
    rating: 5
  });
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // 只有 seller 能访问
    if (user?.role !== 'seller') {
      setError('Not authorized');
      return;
    }
    axiosInstance
      .get('/api/products', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Failed to fetch products for remarking', err);
        setError('加载产品列表失败');
      });
  }, [user]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productId || !form.content || !form.rating) {
      alert('请选择产品并填写评论内容和评分');
      return;
    }
    try {
      await axiosInstance.post(
        '/api/remarks',
        {
          product: form.productId,
          content: form.content,
          rating: Number(form.rating),
          images: []  //没加
        },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      alert('评论提交成功！');
      // 重置表单
      setForm({ productId: '', content: '', rating: 5 });
    } catch (err) {
      console.error('Remark submit error', err);
      alert(err.response?.data?.message || '提交失败');
    }
  };

  if (error) {
    return <p className="text-red-600 p-6">{error}</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Remark a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={form.productId}
          onChange={e => handleChange('productId', e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Your comment"
          value={form.content}
          onChange={e => handleChange('content', e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={e => handleChange('rating', e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Remark
        </button>
      </form>
    </div>
  );
};

export default RemarkProduct;
