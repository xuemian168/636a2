import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  // baseURL: 'http://52.65.208.68/api', // live
  baseURL: 'http://13.239.47.75/api/',
  headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器，自动添加认证token
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
