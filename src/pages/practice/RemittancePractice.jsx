import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RemittancePractice = () => {
  const nav = useNavigate();
  const [account, setAccount] = useState('');
  const [amount,  setAmount]  = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!/^\d{3}-\d{2}-\d{6}$/.test(account)) {
      return alert('계좌번호 형식이 올바르지 않습니다. 예) 110-12-345678');
    }
    if (Number(amount) <= 0) {
      return alert('금액을 입력하세요!');
    }
    alert(`${amount}원을 ${account} 계좌로 이체했습니다!`);
    nav('/practice');
  };

  return (
    <section className="flex flex-col items-center gap-10 py-16">
      <h1 className="text-3xl font-bold">은행 송금 연습</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">
        <input
          type="text"
          placeholder="계좌번호 (예: 110-12-345678)"
          value={account}
          onChange={e => setAccount(e.target.value)}
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 placeholder-gray-500 focus:outline-none"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="금액(￦)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 placeholder-gray-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl"
        >
          송금하기
        </button>
      </form>
    </section>
  );
};
export default RemittancePractice;