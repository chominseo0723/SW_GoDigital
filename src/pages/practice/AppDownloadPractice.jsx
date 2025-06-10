import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORE = ['카카오톡', '네이버지도', '배달의민족', '쿠팡', '멜론', '토스'];

const AppDownloadPractice = () => {
  const nav = useNavigate();
  const [query, setQuery]   = useState('');
  const [installed, setInstalled] = useState(null)

  const results = STORE.filter(app => app.includes(query))

  const install = name => {
    setInstalled(name)
    alert(`${name} 앱이 설치되었습니다!`);
    nav('/practice');
  };

  return (
    <div className="flex flex-col items-center gap-10 py-16 px-4">
      <h1 className="text-3xl font-bold">앱 다운로드 연습</h1> 

      <input
        type="text"
        placeholder="앱 이름 검색"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none w-full max-w-md"
      />

      <div className="grid grid-cols-2 gap-6 max-w-md w-full">
        {results.map(app => (
          <button
            key={app}
            onClick={() => install(app)}
            className="bg-white text-black p-6 rounded-xl hover:bg-gray-200"
          >
            {app}
          </button>
        ))}
        {!results.length && <p className="col-span-2 text-gray-400 text-center">검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
};
export default AppDownloadPractice;