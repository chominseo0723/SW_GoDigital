import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true, 
});


client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default client;