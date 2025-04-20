//seller）查看自己所有备注，对应 "/my-remarks"。
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const MyRemarks = () => {
  const [remarks, setRemarks] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/api/remarks', { headers:{Authorization:`Bearer ${user.token}`} })
      .then(res=>setRemarks(res.data));
  },[user]);

  const deleteRemark = id => {
    axiosInstance.delete(`/api/remarks/${id}`, { headers:{Authorization:`Bearer ${user.token}`} })
      .then(()=>setRemarks(prev=>prev.filter(r=>r._id!==id)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Remarks</h2>
      {remarks.map(r=>(
        <div key={r._id} className="border p-4 rounded mb-2">
          <p><strong>{r.product.name}</strong></p>
          <p>{r.content}</p>
          <button onClick={()=>navigate(`/edit-remark/${r._id}`)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
          <button onClick={()=>deleteRemark(r._id)} className="bg-red-600 text-white p-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
};
export default MyRemarks;