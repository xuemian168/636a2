import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const EditRemark = () => {
  const { id } = useParams();      // 评论 ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    content: '',
    rating: 5
  });
  const [error, setError] = useState(null);

  // 载入已有评论内容
  useEffect(() => {
    axiosInstance
      .get(`/api/remarks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(res => {
        setForm({
          content: res.data.content,
          rating: res.data.rating
        });
      })
      .catch(() => setError('Load remark failed'));
  }, [id, user.token]);

  // 表单变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? Number(value) : value });
  };

  // 提交更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/api/remarks/${id}`,
        { content: form.content, rating: form.rating, images: [] },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/remarks');
    } catch {
      setError('Update remark failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Remark</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Your remark"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded"
        >
          Update Remark
        </button>
      </form>
    </div>
  );
};

export default EditRemark;
