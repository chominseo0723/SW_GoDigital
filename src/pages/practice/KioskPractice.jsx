import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CoffeeImg from '../../assets/Coffee.png';
import LatteImg  from '../../assets/Latte.png';
import BreadImg  from '../../assets/Bread.png';

const MENU = [
  { id: 'americano', name: '아메리카노', price: 4500, img: CoffeeImg },
  { id: 'latte',     name: '카페라떼',  price: 5000, img: LatteImg  },
  { id: 'bread',     name: '식빵',      price: 4000, img: BreadImg  },
];

const speak = (message, voiceOn = true) => {
  if (!voiceOn || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(message);
  utter.lang = 'ko-KR';
  window.speechSynthesis.cancel();     // 직전 음성 중단하고 새로 읽기
  window.speechSynthesis.speak(utter);
};

const KioskPractice = () => {
  const [cart, setCart] = useState([]);
  const [voiceOn, setVoiceOn] = useState(true);  // 음성 안내 토글
  const nav = useNavigate();

  /* 메뉴 카드 또는 + 버튼 */
  const addItem = item => {
    const original = MENU.find(m => m.id === item.id);
    setCart(c => [...c, original]);
    speak(`${original.name} 한 개가 담겼습니다.`, voiceOn);
  };

  /* − 버튼 */
  const removeItem = id => {
    setCart(c => {
      const idx = c.findIndex(i => i.id === id);
      if (idx === -1) return c;
      speak(`${c[idx].name} 한 개를 삭제했습니다.`, voiceOn);
      return [...c.slice(0, idx), ...c.slice(idx + 1)];
    });
  };

  /* 합계 */
  const total = cart.reduce((s, i) => s + i.price, 0);

  /* 같은 상품 합치기 */
  const grouped = cart.reduce((arr, i) => {
    const f = arr.find(x => x.id === i.id);
    f ? (f.qty += 1) : arr.push({ ...i, qty: 1 });
    return arr;
  }, []);

  /* 결제 */
  const pay = () => {
    if (!cart.length) {
      speak('먼저 상품을 선택해주세요.', voiceOn);
      return alert('상품을 선택하세요!');
    }

    if (!window.confirm(`총 ${total.toLocaleString()}원을 결제하시겠습니까?`)) return;

    speak(`결제가 완료되었습니다. 감사합니다.`, voiceOn);
    alert(`결제가 완료되었습니다! (총 ${total.toLocaleString()}원)`);
    nav('/practice');
  };

  /* 처음 진입 시 1단계 안내 */
  useEffect(() => {
    speak('먼저 주문하실 메뉴를 선택해주세요.', voiceOn);
  }, [voiceOn]);

  return (
    <div className="flex flex-col items-center gap-10 py-12 select-none touch-pan-y">
      {/* 헤더 & 음성 토글 */}
      <header className="flex items-center gap-4">
        <h1 className="text-5xl font-extrabold">키오스크 주문 연습</h1>
        <button
          onClick={() => setVoiceOn(v => !v)}
          className="ml-4 px-4 py-2 rounded-lg bg-gray-700 text-white text-lg focus:outline-none"
        >
          {voiceOn ? '음성 안내 🔊' : '음성 안내 🔇'}
        </button>
      </header>

      {/* 단계 설명 */}
      <p className="text-2xl font-medium text-blue-500">1단계: 메뉴판에서 상품을 선택하세요</p>

      {/* 메뉴 카드 */}
      <div className="grid grid-cols-3 gap-8">
        {MENU.map(m => (
          <button
            key={m.id}
            onClick={() => addItem(m)}
            className="bg-white text-black w-60 h-72 rounded-3xl flex flex-col
                       items-center justify-center gap-6 shadow-2xl hover:scale-105
                       transition-transform duration-150 ease-in-out focus:outline-none"
          >
            <img src={m.img} alt={m.name} className="w-24 h-24 object-contain" />
            <span className="text-2xl font-bold">{m.name}</span>
            <span className="text-xl text-gray-600">
              {m.price.toLocaleString()}원
            </span>
          </button>
        ))}
      </div>

      {/* 장바구니 */}
      <div className="bg-gray-900 w-full max-w-3xl text-left p-8 rounded-3xl text-white">
        <h2 className="text-3xl mb-6 font-bold">내 장바구니</h2>

        {grouped.length ? (
          <ul className="space-y-4 mb-8 text-2xl">
            {grouped.map(i => (
              <li key={i.id} className="flex items-center justify-between">
                <span>
                  • {i.name}{' '}
                  {i.qty > 1 && (
                    <span className="text-yellow-300 font-extrabold">x{i.qty}</span>
                  )}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeItem(i.id)}
                    aria-label={`${i.name} 한 개 줄이기`}
                    className="w-10 h-10 rounded-full bg-white text-black text-3xl leading-none
                               flex items-center justify-center active:scale-90 focus:outline-none"
                  >
                    −
                  </button>
                  <button
                    onClick={() => addItem(i)}
                    aria-label={`${i.name} 한 개 추가`}
                    className="w-10 h-10 rounded-full bg-white text-black text-3xl leading-none
                               flex items-center justify-center active:scale-90 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-2xl">아직 선택한 상품이 없습니다.</p>
        )}

        <div className="flex justify-between items-center text-3xl font-bold">
          <span>합계</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </div>

      <button
        onClick={pay}
        className="bg-green-600 hover:bg-green-700 text-white px-20 py-6 rounded-2xl text-2xl font-semibold
                   active:scale-95 transition-transform duration-100 ease-in-out focus:outline-none"
      >
        결제하기
      </button>
    </div>
  );
};

export default KioskPractice;
