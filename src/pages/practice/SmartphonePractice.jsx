import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const STEPS = [
  {
    id: "wifi",
    label: "Wi‑Fi 켜기",
    hint: "상단 상태 바를 두 번 내려 빠른 설정 패널에서 'Wi‑Fi' 아이콘을 눌러 초록색(켜짐)으로 변경하세요.",
    done: state => state.wifi,
  },
  {
    id: "bluetooth",
    label: "Bluetooth 켜기",
    hint: "빠른 설정 패널에서 'Bluetooth' 아이콘이 초록색이 되도록 눌러 켭니다.",
    done: state => state.bluetooth,
  },
  {
    id: "brightness",
    label: "밝기 70% 이상으로 올리기",
    hint: "빠른 설정 패널 하단의 밝기 슬라이더를 오른쪽으로 이동해 70% 이상으로 맞춥니다.",
    done: state => state.brightness >= 70,
  },
];

const SmartphonePractice = () => {
  const nav = useNavigate();

  const [wifi, setWifi]               = useState(false);
  const [bluetooth, setBluetooth]     = useState(false);
  const [brightness, setBrightness]   = useState(50);
  const [step, setStep]               = useState(0);   
  const [showHint, setShowHint]       = useState(false);
  const [done, setDone]               = useState(false);

  const current = STEPS[step];
  const state   = { wifi, bluetooth, brightness };
  const canNext = current.done(state);

  // 완료 후 자동 이동
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => nav("/practice"), 2000);
      return () => clearTimeout(t);
    }
  }, [done, nav]);

  const handleNext = () => {
    if (!canNext) return alert("아직 조건을 만족하지 않았어요!");
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      setShowHint(false);
    } else {
      setDone(true);
    }
  };


  const labelCls = "flex items-center justify-between text-2xl font-semibold";
  const inputCls = "w-8 h-8 accent-green-500";

  return (
    <section className="flex flex-col items-center gap-14 py-20 px-6 select-none">
      <h1 className="text-5xl font-extrabold mb-4">스마트폰 기본 기능 연습</h1>

      {/* 진행률 */}
      <div className="flex items-center gap-2 text-xl mb-6">
        {STEPS.map((_, i) => (
          <span key={i}>{i < step || (i === step && canNext) ? "●" : "○"}</span>
        ))}
      </div>

      {/* 현재 미션 */}
      <h2 className="text-3xl text-yellow-300 font-bold text-center mb-2">
        STEP {step + 1} / {STEPS.length}: {current.label}
      </h2>

      <button
        onClick={() => setShowHint(h => !h)}
        className="underline text-lg mb-8"
      >
        {showHint ? "힌트 숨기기" : "힌트 보기"}
      </button>

      {showHint && (
        <p className="bg-gray-700 text-white p-6 rounded-2xl max-w-xl text-lg leading-relaxed mb-8">
          {current.hint}
        </p>
      )}

      {/* 설정 카드 */}
      <div className="flex flex-col gap-10 bg-gray-800 p-12 rounded-3xl w-full max-w-xl text-white">
        <label className={labelCls}>
          <span>Wi‑Fi</span>
          <input
            type="checkbox"
            checked={wifi}
            onChange={e => setWifi(e.target.checked)}
            className={inputCls}
            aria-label="Wi-Fi 토글"
          />
        </label>

        <label className={labelCls}>
          <span>Bluetooth</span>
          <input
            type="checkbox"
            checked={bluetooth}
            onChange={e => setBluetooth(e.target.checked)}
            className={inputCls}
            aria-label="Bluetooth 토글"
          />
        </label>

        <label className="flex flex-col gap-4 text-2xl font-semibold">
          <span>밝기: <strong>{brightness}%</strong></span>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            className="w-full accent-yellow-400"
            aria-label="밝기 슬라이더"
          />
        </label>
      </div>

      {done ? (
        <div className="bg-green-600 text-white px-10 py-6 rounded-2xl text-2xl font-bold">
          🎉 축하합니다! 모든 단계를 완료했어요.
        </div>
      ) : (
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-2xl text-2xl font-bold"
        >
          {step === STEPS.length - 1 ? "완료 확인" : "다음 단계"}
        </button>
      )}
    </section>
  );
};

export default SmartphonePractice;