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
        {/* ────────────────────────────────────────────────
            1) 누구나 접근 가능한 라우트
        ──────────────────────────────────────────────── */}
        <Route index element={<Home />} />           {/* / */}
        <Route path="login"    element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ────────────────────────────────────────────────
            2) 로그인 필요 구간
        ──────────────────────────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          {/* 연습 메인 + 별칭(practicemain) */}
          <Route path="practice"     element={<PracticeMain />} />
          <Route path="practicemain" element={<PracticeMain />} />

          {/* 개별 연습 시뮬레이터 */}
          <Route path="practice/kiosk"        element={<KioskPractice />} />
          <Route path="practice/remittance"   element={<RemittancePractice />} />
          <Route path="practice/email"        element={<EmailPractice />} />
          <Route path="practice/copy"         element={<CopyPractice />} />
          <Route path="practice/smartphone"   element={<SmartphonePractice />} />
          <Route path="practice/appDownload"  element={<AppDownloadPractice />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
