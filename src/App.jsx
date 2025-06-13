import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout         from './Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home           from './pages/Home';
import PracticeMain   from './pages/PracticeMain';
import Login          from './pages/Login';
import Register       from './pages/Register';

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

 
        <Route index element={<Home />} />

    
        <Route path="practice"            element={<PracticeMain />} />
        <Route path="practicemain"        element={<PracticeMain />} /> {/* 별칭 */}
        <Route path="practice/kiosk"      element={<KioskPractice />} />
        <Route path="practice/remittance" element={<RemittancePractice />} />
        <Route path="practice/email"      element={<EmailPractice />} />
        <Route path="practice/copy"       element={<CopyPractice />} />
        <Route path="practice/smartphone" element={<SmartphonePractice />} />
        <Route path="practice/appDownload" element={<AppDownloadPractice />} />

   
        <Route path="login"    element={<Login />} />
        <Route path="register" element={<Register />} />

 
        <Route element={<ProtectedRoute />}>
    
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
