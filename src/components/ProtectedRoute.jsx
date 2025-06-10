import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();      // 로그인 여부
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
