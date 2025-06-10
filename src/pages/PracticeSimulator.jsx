import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const stepsMock = [
  '화면을 잘 살펴보고, 원하는 메뉴를 눌러보세요',
  '금액을 입력하고 확인 버튼을 누르세요',
  '완료되었습니다! 결과 화면을 확인하세요',
];

const PracticeSimulator = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step + 1 < stepsMock.length) {
      setStep(step + 1);
    } else {
      navigate('/feedback', {
        state: { practiceId, score: 93, time: '1분 12초', errors: 2 },
      });
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 gap-10">
      <h2 className="text-3xl font-bold">연습 진행 중: {practiceId}</h2>
      <div className="w-full max-w-xl bg-white rounded-3xl p-10 text-black text-lg text-center min-h-[200px] flex items-center justify-center">
        {stepsMock[step]}
      </div>
      <button onClick={next} className="px-10 py-4 rounded-2xl bg-blue-700 text-white text-xl hover:bg-blue-800">
        {step + 1 < stepsMock.length ? '다음 단계' : '완료'}
      </button>
      <button onClick={() => navigate(-1)} className="text-sm underline text-gray-300 mt-4">
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default PracticeSimulator;