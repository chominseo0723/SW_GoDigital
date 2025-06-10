// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  
import { AuthProvider } from './context/AuthContext';   // ✅ 정확한 경로

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>     {/* 반드시 최상위에서 감싸야 합니다 */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
