/* src/pages/practice/KioskPractice.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CoffeeImg from '../../assets/Coffee.png';
import LatteImg  from '../../assets/Latte.png';
import BreadImg  from '../../assets/Bread.png';

const MENU = [
  { id: 'americano', name: '아메리카노', price: 4500, img: CoffeeImg },
  { id: 'latte',     name: '카페라떼',  price: 5000, img: LatteImg  },
  { id: 'bread',     name: '식빵',      price: 4000, img: BreadImg  },
];

const KioskPractice = () => {
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  /* + 버튼 / 카드 클릭 */
  const addItem = item => {
    const original = MENU.find(m => m.id === item.id);   // qty 없는 원본
    setCart(c => [...c, original]);
  };

  /* − 버튼 */
  const removeItem = id => {
    setCart(c => {
      const idx = c.findIndex(i => i.id === id);         // 첫 일치 항목
      if (idx === -1) return c;
      return [...c.slice(0, idx), ...c.slice(idx + 1)];
    });
  };

  /* 합계 */
  const total = cart.reduce((s, i) => s + i.price, 0);

  /* 묶어서 수량 계산 */
  const grouped = cart.reduce((arr, i) => {
    const f = arr.find(x => x.id === i.id);
    f ? (f.qty += 1) : arr.push({ ...i, qty: 1 });
    return arr;
  }, []);

  const pay = () => {
    if (!cart.length) return alert('상품을 선택하세요!');
    alert(`결제가 완료되었습니다! (총 ${total.toLocaleString()}원)`);
    nav('/practice');
  };

  return (
    <div className="flex flex-col items-center gap-14 py-16">
      <h1 className="text-4xl font-bold">키오스크 주문 연습</h1>

      {/* 메뉴 카드 */}
      <div className="grid grid-cols-3 gap-10">
        {MENU.map(m => (
          <button
            key={m.id}
            onClick={() => addItem(m)}
            className="bg-white text-black w-56 h-64 rounded-3xl flex flex-col
                       items-center justify-center gap-4 shadow-lg hover:bg-gray-200"
          >
            <img src={m.img} alt={m.name} className="w-20 h-20 object-contain" />
            <span className="text-xl font-semibold">{m.name}</span>
            <span className="text-base text-gray-500">
              {m.price.toLocaleString()}원
            </span>
          </button>
        ))}
      </div>

      {/* 장바구니 */}
      <div className="bg-gray-800 w-full max-w-2xl text-left p-8 rounded-3xl">
        <h2 className="text-2xl mb-6 font-bold">내 장바구니</h2>

        {grouped.length ? (
          <ul className="space-y-3 mb-6 text-lg">
            {grouped.map(i => (
              <li key={i.id} className="flex items-center justify-between">
                <span>
                  • {i.name}{' '}
                  {i.qty > 1 && (
                    <span className="text-blue-400 font-semibold">x{i.qty}</span>
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItem(i.id)}
                    className="w-8 h-8 rounded-full bg-white text-black font-bold
                              flex items-center justify-center"
                  >
                    −
                  </button>
                  <button
                    onClick={() => addItem(i)}
                    className="w-8 h-8 rounded-full bg-white text-black font-bold
                              flex items-center justify-center "
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-lg">아직 선택한 상품이 없습니다.</p>
        )}

        <div className="flex justify-between items-center text-xl font-semibold">
          <span>합계</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </div>

      <button
        onClick={pay}
        className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-5 rounded-xl text-lg"
      >
        결제하기
      </button>
    </div>
  );
};

export default KioskPractice;
