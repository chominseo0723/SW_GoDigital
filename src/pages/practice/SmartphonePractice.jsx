/* src/pages/practice/SmartphonePractice.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SmartphonePractice = () => {
  const nav = useNavigate();
  const [wifi, setWifi]           = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [done, setDone]           = useState(false);     // ✅ 성공 여부

  const isSuccess = wifi && bluetooth && brightness >= 70;

  const handleComplete = () => {
    if (isSuccess) {
      setDone(true);              // 화면에 성공 배너 노출
      setTimeout(() => nav('/practice'), 1500); // 1.5초 뒤 목록 이동
    } else {
      alert('Wi-Fi ON, Bluetooth ON, 밝기 70% 이상으로 맞춰 보세요!');
    }
  };

  return (
    <section className="flex flex-col items-center gap-16 py-24">
      <h1 className="text-4xl font-bold">스마트폰 기본 기능 연습</h1>

      {/* ▸ 목표 안내 */}
      <ul className="text-lg list-disc list-inside space-y-1">
        <li>Wi-Fi <strong>ON</strong></li>
        <li>Bluetooth <strong>ON</strong></li>
        <li>밝기 <strong>70%</strong> 이상</li>
      </ul>

      {/* 설정 카드 */}
      <div className="flex flex-col gap-8 bg-gray-800 p-10 rounded-3xl w-full max-w-lg">
        <label className="flex items-center justify-between text-lg">
          <span>Wi-Fi</span>
          <input
            type="checkbox"
            checked={wifi}
            onChange={e => setWifi(e.target.checked)}
            className="w-6 h-6 accent-green-500"
          />
        </label>

        <label className="flex items-center justify-between text-lg">
          <span>Bluetooth</span>
          <input
            type="checkbox"
            checked={bluetooth}
            onChange={e => setBluetooth(e.target.checked)}
            className="w-6 h-6 accent-green-500"
          />
        </label>

        <label className="flex flex-col gap-4 text-lg">
          <span>밝기: <strong>{brightness}%</strong></span>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </label>
      </div>

      {/* 성공 배너 */}
      {done && (
        <div className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold">
          🎉 연습 완료! 1초 후 목록으로 이동합니다…
        </div>
      )}

      <button
        onClick={handleComplete}
        className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-5 rounded-xl text-lg font-semibold"
      >
        완료 확인
      </button>
    </section>
  );
};

export default SmartphonePractice;
