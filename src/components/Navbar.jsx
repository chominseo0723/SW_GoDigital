import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white text-black shadow-md">
      <Link to="/" className="text-3xl font-bold italic">
        GoDigital
      </Link>
      <div className="flex items-center gap-6 text-lg">
        <NavLink to="/practicemain" className={({ isActive }) => (isActive ? 'font-semibold underline' : '')}>
          연습 목록
        </NavLink>
        {user ? (
          <>
            <span>{user.nickname || user.email}</span>
            <button onClick={logout} className="ml-2 px-4 py-1 rounded-xl bg-black text-white hover:bg-gray-800">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/register" className="ml-1">회원가입</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;