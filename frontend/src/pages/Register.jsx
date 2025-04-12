import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful! Please log in to continue.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please check your information and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Join our platform today</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Phone */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Address */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter your address (optional)"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
          <div className="text-center mt-4">
            <a href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
