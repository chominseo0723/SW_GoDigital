import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SmartphonePractice = () => {
  const nav = useNavigate();
  const [wifi, setWifi]         = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [brightness, setBrightness] = useState(50);

  const handleComplete = () => {
    if (wifi && bluetooth && brightness > 70) {
      alert('스마트폰 기본 설정 연습 완료!');
      nav('/practice');
    } else {
      alert('Wi‑Fi ON, Bluetooth ON, 밝기 70% 이상으로 맞춰 보세요!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <h1 className="text-3xl font-bold">스마트폰 기본 기능 연습</h1>

      <div className="flex flex-col gap-6 bg-gray-800 p-8 rounded-2xl w-80">
        <label className="flex items-center justify-between">
          <span>Wi‑Fi</span>
          <input type="checkbox" checked={wifi} onChange={e => setWifi(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between">
          <span>Bluetooth</span>
          <input type="checkbox" checked={bluetooth} onChange={e => setBluetooth(e.target.checked)} />
        </label>
        <label className="flex flex-col gap-2">
          <span>밝기: {brightness}%</span>
          <input
            type="range"
            min="0" max="100"
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl">
        완료 확인
      </button>
    </div>
  );
};
export default SmartphonePractice;