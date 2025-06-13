import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import KakaoImg   from "../../assets/KakaoTalk.png";
import NaverImg   from "../../assets/Naver.png";
import DeliverImg from "../../assets/Deliver.png";
import CoupangImg from "../../assets/Coupang.png";
import MelonImg   from "../../assets/Melon.png";
import TossImg    from "../../assets/Toss.png";




const STORE = [
  { name: "카카오톡",   img: KakaoImg   },
  { name: "네이버지도", img: NaverImg   },
  { name: "배달의민족", img: DeliverImg },
  { name: "쿠팡",       img: CoupangImg },
  { name: "멜론",       img: MelonImg   },
  { name: "토스",       img: TossImg    },
];

const MISSIONS = [
  { id: 1, target: "쿠팡",       text: "미션 1️⃣ : \"쿠팡\" 앱을 검색해서 설치하세요." },
  { id: 2, target: "카카오톡",   text: "미션 2️⃣ : \"카카오톡\" 앱을 설치해 보세요." },
  { id: 3, target: "배달의민족", text: "미션 3️⃣ : \"배달의민족\" 을 검색하고 설치해 보세요." },
];

const AppDownloadPractice = () => {
  const nav = useNavigate();


  const [query, setQuery]               = useState("");
  const [downloading, setDownloading]   = useState(null); 
  const [installed, setInstalled]       = useState([]);   

  const [missionIdx, setMissionIdx]     = useState(0);  
  const mission = MISSIONS[missionIdx]  || null;


  const results = useMemo(() =>
    STORE.filter(app => app.name.includes(query)),
    [query]
  );

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


  useEffect(() => {
    if (!mission) return; 
    if (installed.includes(mission.target)) {
      alert(`✅ ${mission.text}\n미션을 완료했습니다!`);
      setMissionIdx(i => i + 1);
      setQuery(""); 
    }
  }, [installed, mission]);


  const startInstall = (app) => {

    if (mission && app.name !== mission.target) {
      alert(`이번 미션은 \"${mission.target}\" 설치입니다!`);
      return;
    }
    setDownloading({ name: app.name, progress: 0 });
  };

  const openApp = (name) => {
    alert(`${name} 앱이 열립니다!`);
    nav("/practice");
  };


  const totalMissions = MISSIONS.length;
  const progressPct = ((missionIdx) / totalMissions) * 100;

  return (
    <section className="min-h-[80vh] flex flex-col items-center gap-16 py-20 px-6 select-none">

      <header className="flex flex-col items-center gap-6 w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
          앱 다운로드 미션 연습
        </h1>

        {/* 진행도 바 */}
        <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
          <div
            className="bg-blue-600 h-6 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-lg font-medium">
          {missionIdx < totalMissions
            ? `(${missionIdx}/${totalMissions}) 진행 중`
            : `🎉 모든 미션 완료! 수고하셨습니다.`}
        </span>

        {/* 현재 미션 설명 */}
        {mission && (
          <p className="bg-yellow-500 border-l-4 border-yellow-500 p-4 w-full rounded-xl text-xl font-semibold">
            {mission.text}
          </p>
        )}
      </header>

      {/* 검색 */}
      <input
        type="text"
        placeholder="앱 이름 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-10 py-6 rounded-3xl bg-white text-black border border-gray-400 focus:outline-none text-2xl w-full max-w-3xl"
      />

      {/* 카드 그리드 */}
      <div className="grid gap-10 w-full max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((app) => {
          const isInstalled = installed.includes(app.name);
          const isDownloading = downloading?.name === app.name;
          const isTarget = mission && app.name === mission.target;

          return (
            <div
              key={app.name}
              className={`relative bg-white text-black p-8 rounded-3xl flex flex-col items-center gap-6 shadow-lg transition-transform ${isTarget ? "ring-4 ring-yellow-400 animate-pulse" : ""}`}
            >
              <img src={app.img} alt={app.name} className="w-24 h-24 object-contain" />
              <span className="text-2xl font-semibold text-center">{app.name}</span>

              {isDownloading ? (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-green-500 h-5"
                      style={{ width: `${downloading.progress}%` }}
                    />
                  </div>
                  <span className="text-base text-gray-500">{downloading.progress}%</span>
                </>
              ) : isInstalled ? (
                <button
                  onClick={() => openApp(app.name)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-lg w-full"
                >
                  열기
                </button>
              ) : (
                <button
                  onClick={() => startInstall(app)}
                  className="bg-gray-700 hover:bg-gray-900 text-white px-8 py-3 rounded-2xl text-lg w-full"
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
