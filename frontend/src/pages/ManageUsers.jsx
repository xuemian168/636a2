//管理员管理用户，对应 "/manage-users"。
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get('/api/auth/users', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => setUsers(res.data));
  }, [user]);

  const toggleUser = id => {
    axiosInstance.put(`/api/auth/users/${id}`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => setUsers(prev => prev.map(u => u._id===id ? { ...u, status: u.status==='active'?'inactive':'active' } : u)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users.map(u => (
        <div key={u._id} className="border p-4 rounded mb-2 flex justify-between">
          <div>
            <p>{u.name} ({u.role})</p>
            <p>Status: {u.status}</p>
          </div>
          <button onClick={() => toggleUser(u._id)} className="bg-yellow-500 text-white p-1 rounded">
            {u.status==='active'?'Deactivate':'Activate'}
          </button>
        </div>
      ))}
    </div>
  );
};
export default ManageUsers;