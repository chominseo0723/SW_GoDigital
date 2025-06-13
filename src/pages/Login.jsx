// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e =>
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(values);        
      navigate('/');             
    } catch (_) {
   
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 ">
      <h1 className="text-4xl font-bold mb-12">로그인</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
          required
          className="px-5 py-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
          required
          className="px-5 py-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {error && (
          <p className="text-red-400 text-sm -mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {submitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p className="mt-8 text-gray-400 text-sm">
        계정이 없으신가요?{' '}
        <Link to="/register" className="underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default Login;
