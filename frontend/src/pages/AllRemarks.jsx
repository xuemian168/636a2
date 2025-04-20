//管理员查看所有评论，对应 "/remarks"。
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AllRemarks = () => {
  const [remarks, setRemarks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get('/api/remarks', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => setRemarks(res.data));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Remarks</h2>
      {remarks.map(r => (
        <div key={r._id} className="border p-4 rounded mb-2">
          <p><strong>Product:</strong> {r.product.name}</p>
          <p><strong>Rating:</strong> {r.rating}</p>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
};
export default AllRemarks;