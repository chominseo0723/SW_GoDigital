/* ----------------------------------------------------------------
   File : src/pages/Register.jsx
   Desc : 회원가입 화면 (백엔드 없이 LocalStorage 기반 fakeAuth 사용)
----------------------------------------------------------------- */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();

  /* 입력 상태 */
  const [nickname, setNickname] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  /* 폼 제출 */
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({ email, password, nickname });

      /* ✅ 회원가입 성공 알림 */
      alert('회원가입이 완료되었습니다! 이제 로그인해 주세요.');

      /* 로그인 화면으로 이동 (원하면 praticemain 등으로 변경) */
      navigate('/login');
    } catch (_) {
      /* register() 내부에서 error를 setError 해 주므로 여기선 무시 */
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h2 className="text-4xl font-extrabold mb-10">회원가입</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6"
      >
        {/* 닉네임 (선택) */}
        <input
          type="text"
          placeholder="닉네임 (선택)"
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />

        {/* 이메일 */}
        <input
          type="email"
          placeholder="이메일"
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="text-red-400 text-sm -mt-4">{error}</p>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold
                     disabled:opacity-50 transition"
        >
          {loading ? '가입 처리 중…' : '회원가입'}
        </button>

        {/* 로그인 이동 링크 */}
        <p className="text-sm text-center text-gray-400">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="underline">
            로그인
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
