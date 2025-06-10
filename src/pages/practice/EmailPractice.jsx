import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailPractice = () => {
  const nav = useNavigate();
  const [to, setTo]         = useState('');
  const [subject, setSub]   = useState('');
  const [body, setBody]     = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!to.includes('@')) return alert('받는 사람 이메일을 확인하세요!');
    alert('이메일이 전송되었습니다!');
    nav('/practice');
  };

  return (
    <div className="flex flex-col items-center gap-10 py-16 px-4">
      <h1 className="text-3xl font-bold">이메일 전송 연습</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6">
        <input
          type="email"
          placeholder="받는 사람"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="제목"
          value={subject}
          onChange={e => setSub(e.target.value)}
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="본문"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="h-40 px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl">전송</button>
      </form>
    </div>
  );
};
export default EmailPractice;