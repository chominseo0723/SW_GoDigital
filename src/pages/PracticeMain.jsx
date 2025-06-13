
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {
  FiMonitor,      // 키오스크
  FiSend,         // 은행 송금 (대체 아이콘)
  FiFileText,     // 이메일 전송
  FiCopy,         // 복사/붙여넣기
  FiSmartphone,   // 스마트폰 기본
  FiDownload,     // 앱 다운로드
} from 'react-icons/fi';

const PRACTICE_LIST = [
  { id: 'kiosk',        name: '키오스크 연습',       icon: <FiMonitor   /> },
  { id: 'remittance',   name: '은행 송금 연습',       icon: <FiSend      /> },
  { id: 'email',        name: '이메일 전송 연습',     icon: <FiFileText  /> },
  { id: 'copy',         name: '복사/붙여넣기 연습',   icon: <FiCopy      /> },
  { id: 'smartphone',   name: '스마트폰 기본 연습',   icon: <FiSmartphone/> },
  { id: 'appDownload',  name: '앱 다운로드 연습',     icon: <FiDownload  /> },
];

const PracticeMain = () => {
  const [keyword, setKeyword] = useState('');

  const filtered = PRACTICE_LIST.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase().trim())
  );

  return (
    <div className="flex flex-col items-center px-5 py-12 gap-12">
    
      <form
        onSubmit={e => e.preventDefault()}
        className="w-full max-w-2xl flex"
      >
        <input
          type="text"
          placeholder="무엇을 연습하고 싶으신가요?"
          className="flex-1 px-6 py-4 rounded-l-2xl bg-white text-black border border-gray-400
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-4 bg-blue-700 rounded-r-2xl text-white text-lg hover:bg-blue-800"
        >
          <FaSearch className="text-xl" />
          검색
        </button>
      </form>

      <hr className="w-full border-gray-600" />


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.length ? (
          filtered.map(p => (
            <Link
              to={`/practice/${p.id}`}
              key={p.id}
              className="flex flex-col items-center bg-white rounded-3xl p-10 w-90 h-70
                         text-black hover:bg-gray-100 transition"
            >
              <div className="text-7xl mb-8">{p.icon}</div>
              <span className="text-xl font-semibold text-center">{p.name}</span>
            </Link>
          ))
        ) : (
          <span className="col-span-full text-gray-400 text-lg">
            “{keyword}”에 해당하는 연습이 없습니다.
          </span>
        )}

      </div>
    </div>
  );
};

export default PracticeMain;
