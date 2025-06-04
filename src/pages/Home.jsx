// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Img1 from '../assets/Img1.png';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-8">
    
      <div className="flex flex-col items-start">
   
        <h1 className="text-8xl font-extrabold italic text-white relative">
          GoDigital
        </h1>

        <Link
          to="/practicemain"
          className="
            mt-16
            inline-block px-14 py-10
            text-4xl font-bold
            bg-white text-black
            rounded-3xl
            hover:bg-gray-200
          "
        >
          <span className="italic">Digital 연습 바로가기 </span>
        </Link>

        <div className="mt-20 space-x-5 text-2xl text-gray-300">
          <Link to="/login" className="hover:underline">
            로그인
          </Link>
          <span>|</span>
          <Link to="/register" className="hover:underline">
            회원가입
          </Link>
        </div>
      </div>

      <img
        src={Img1}
        alt="GoDigital 소개"
        className="w-150 max-w-full rounded-3xl "
      />
    </div>
  );
};

export default Home;
