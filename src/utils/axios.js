import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.defaults.withCredentials = true;

// Request interceptor
api.interceptors.request.use(
  config => {
    // if (config.url.includes('login')) {
    //   return config;
    // }
    // const token = localStorage.getItem('token');
    // if (token && !config.url.includes('login')) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
