// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout         from './Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home           from './pages/Home';
import PracticeMain   from './pages/PracticeMain';
import Login          from './pages/Login';
import Register       from './pages/Register';

/* 각 연습 페이지 */
import KioskPractice       from './pages/practice/KioskPractice';
import RemittancePractice  from './pages/practice/RemittancePractice';
import EmailPractice       from './pages/practice/EmailPractice';
import CopyPractice        from './pages/practice/CopyPractice';
import SmartphonePractice  from './pages/practice/SmartphonePractice';
import AppDownloadPractice from './pages/practice/AppDownloadPractice';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>

        {/* ────────────  1) 누구나 접근 가능  ──────────── */}
        <Route index element={<Home />} />

        {/* 연습 메인 & 시뮬레이터 ― 로그인 없이도 이용 */}
        <Route path="practice"            element={<PracticeMain />} />
        <Route path="practicemain"        element={<PracticeMain />} /> {/* 별칭 */}
        <Route path="practice/kiosk"      element={<KioskPractice />} />
        <Route path="practice/remittance" element={<RemittancePractice />} />
        <Route path="practice/email"      element={<EmailPractice />} />
        <Route path="practice/copy"       element={<CopyPractice />} />
        <Route path="practice/smartphone" element={<SmartphonePractice />} />
        <Route path="practice/appDownload" element={<AppDownloadPractice />} />

        {/* 게스트 전용 화면 */}
        <Route path="login"    element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ────────────  2) 로그인 필요 영역  ──────────── */}
        <Route element={<ProtectedRoute />}>
          {/* 예) /mypage 같이 개인정보가 필요한 페이지만 여기에 */}
          {/* <Route path="mypage" element={<MyPage />} /> */}
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
