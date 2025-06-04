import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';                                     
import Home from './pages/Home';
import PracticeMain from "./pages/PracticeMain"
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="practicemain" element={<PracticeMain />} />
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
