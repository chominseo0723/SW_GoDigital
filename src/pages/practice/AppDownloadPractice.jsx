/* src/pages/practice/AppDownloadPractice.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import KakaoImg   from '../../assets/KakaoTalk.png';
import NaverImg   from '../../assets/Naver.png';
import DeliverImg from '../../assets/Deliver.png';
import CoupangImg from '../../assets/Coupang.png';
import MelonImg   from '../../assets/Melon.png';
import TossImg    from '../../assets/Toss.png';

const STORE = [
  { name: '카카오톡',   img: KakaoImg   },
  { name: '네이버지도', img: NaverImg   },
  { name: '배달의민족', img: DeliverImg },
  { name: '쿠팡',       img: CoupangImg },
  { name: '멜론',       img: MelonImg   },
  { name: '토스',       img: TossImg    },
];

const AppDownloadPractice = () => {
  const nav = useNavigate();

  const [query, setQuery] = useState('');
  const [downloading, setDownloading] = useState(null); // {name, progress}
  const [installed, setInstalled]     = useState([]);

  const results = STORE.filter(app => app.name.includes(query));

  /* 다운로드 진행 시뮬레이션 */
  useEffect(() => {
    if (!downloading) return;
    const timer = setInterval(() => {
      setDownloading(d =>
        !d
          ? null
          : d.progress >= 100
              ? (setInstalled(arr => [...arr, d.name]), clearInterval(timer), null)
              : { ...d, progress: d.progress + 10 }
      );
    }, 180);
    return () => clearInterval(timer);
  }, [downloading]);

  const startInstall = app => setDownloading({ name: app.name, progress: 0 });
  const openApp      = name => { alert(`${name} 앱이 열립니다!`); nav('/practice'); };

  return (
    <section className="min-h-[80vh] flex flex-col items-center gap-20 py-24 px-6">
      <h1 className="text-5xl font-extrabold">앱 다운로드 연습</h1>

      <input
        type="text"
        placeholder="앱 이름 검색"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-10 py-6 rounded-3xl bg-white text-black border border-gray-400
                   focus:outline-none text-2xl w-full max-w-2xl"
      />

      {/* 카드: 데스크탑 3열, 태블릿 2열 */}
      <div className="grid gap-10 w-full max-w-4xl
                      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(app => {
          const isInstalled   = installed.includes(app.name);
          const isDownloading = downloading?.name === app.name;

          return (
            <div
              key={app.name}
              className="bg-white text-black p-8 rounded-3xl flex flex-col items-center
                         gap-6 shadow-lg"
            >
              <img src={app.img} alt={app.name}
                   className="w-24 h-24 object-contain" />
              <span className="text-2xl font-semibold">{app.name}</span>

              {isDownloading ? (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-green-500 h-5"
                      style={{ width: `${downloading.progress}%` }}
                    />
                  </div>
                  <span className="text-base text-gray-500">
                    {downloading.progress}%
                  </span>
                </>
              ) : isInstalled ? (
                <button
                  onClick={() => openApp(app.name)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3
                             rounded-2xl text-lg w-full"
                >
                  열기
                </button>
              ) : (
                <button
                  onClick={() => startInstall(app)}
                  className="bg-gray-600 hover:bg-gray-900 text-white px-8 py-3
                             rounded-2xl text-lg w-full"
                >
                  설치
                </button>
              )}
            </div>
          );
        })}

        {!results.length && (
          <p className="col-span-full text-gray-400 text-center text-xl">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default AppDownloadPractice;
