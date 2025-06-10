// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../utils/fakeAuth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const register = async info => {
    setError(null);
    try {
      registerUser(info);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async creds => {
    setError(null);
    try {
      const u = loginUser(creds);
      setUser(u);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading…</div>;

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
