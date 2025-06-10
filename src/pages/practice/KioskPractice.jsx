import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MENU = [
  { id: 'americano', name: '아메리카노', price: 2000 },
  { id: 'latte',     name: '카페라떼',  price: 3000 },
  { id: 'bread',     name: '식빵',      price: 1500 },
];

const KioskPractice = () => {
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  const addItem = item => setCart(c => [...c, item]);
  const total   = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePay = () => {
    if (!cart.length) return alert('상품을 선택하세요!');
    alert(`결제가 완료되었습니다! (총 ${total.toLocaleString()}원)`);
    nav('/practice');
  };

  return (
    <div className="flex flex-col items-center gap-10 py-12">
      <h1 className="text-3xl font-bold">키오스크 주문 연습</h1>

      {/* 메뉴 */}
      <div className="grid grid-cols-3 gap-6">
        {MENU.map(m => (
          <button
            key={m.id}
            onClick={() => addItem(m)}
            className="bg-white text-black w-40 h-40 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-200"
          >
            <span className="text-lg font-semibold">{m.name}</span>
            <span className="text-sm text-gray-500">{m.price.toLocaleString()}원</span>
          </button>
        ))}
      </div>

      {/* 장바구니 */}
      <div className="bg-gray-800 w-full max-w-md text-left p-6 rounded-2xl">
        <h2 className="text-xl mb-4 font-bold">내 장바구니</h2>
        {cart.length ? (
          <ul className="space-y-2 mb-4">
            {cart.map((i, idx) => <li key={idx}>• {i.name}</li>)}
          </ul>
        ) : <p className="text-gray-400">아직 선택한 상품이 없습니다.</p>}

        <div className="flex justify-between items-center">
          <span className="font-semibold">합계</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </div>

      <button
        onClick={handlePay}
        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl"
      >
        결제하기
      </button>
    </div>
  );
};
export default KioskPractice;