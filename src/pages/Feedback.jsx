import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Feedback = () => {
  const { state } = useLocation();
  if (!state) return <p>잘못된 접근입니다.</p>;
  const { practiceId, score, time, errors } = state;

  return (
    <section className="flex flex-col items-center px-4 py-12 gap-6">
      <h2 className="text-3xl font-bold">피드백</h2>
      <div className="bg-white text-black rounded-3xl p-10 max-w-lg w-full flex flex-col gap-4 text-lg">
        <p><strong>연습 항목:</strong> {practiceId}</p>
        <p><strong>점수:</strong> {score} / 100</p>
        <p><strong>소요 시간:</strong> {time}</p>
        <p><strong>오류 횟수:</strong> {errors}회</p>
        <hr />
        <p className="text-gray-600">버튼 위치를 2회 틀리셨습니다. 화면 안내를 조금 더 천천히 확인해보세요!</p>
      </div>
      <Link to="/practicemain" className="mt-8 px-8 py-4 rounded-xl bg-blue-700 text-white text-lg hover:bg-blue-800">다른 연습하러 가기</Link>
    </section>
  );
};

export default Feedback;