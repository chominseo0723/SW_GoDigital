import React from 'react';
import { Link } from 'react-router-dom';
import Img1 from '../assets/Img1.png';
import { useAuth } from '../context/AuthContext';   

const Home = () => {
  const { user } = useAuth();                       // 로그인 상태 확인
  const displayName = user?.nickname || user?.email?.split('@')[0];

  return (
    <div className="min-h-screen flex flex-row items-center justify-center gap-30 px-5">
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-start">
        <h1 className="text-8xl font-extrabold italic text-white relative">
          GoDigital
        </h1>

        <Link
          to="/practicemain"
          className="mt-30 inline-block px-20 py-15 text-4xl font-bold
                     bg-white text-black rounded-3xl hover:bg-gray-200"
        >
          <span className="italic">Digital 연습 바로가기</span>
        </Link>

        {/* 로그인 상태별 안내 */}
        <div className="mt-20 text-2xl text-gray-300 ml-25">
          {user ? (
            <span className="text-white font-semibold">
              {displayName} 님&nbsp;환영합니다!
            </span>
          ) : (
            <span className="space-x-10">
              <Link to="/login" className="hover:underline">로그인</Link>
              <span>|</span>
              <Link to="/register" className="hover:underline">회원가입</Link>
            </span>
          )}
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      <img
        src={Img1}
        alt="GoDigital 소개"
        className="w-150 max-w-full rounded-3xl"
      />
    </div>
  );
};

export default Home;
