import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true, // 쿠키 기반 세션/JWT 전달
});

// 공통 응답 / 에러 처리
client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default client;