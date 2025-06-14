import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import VintageClothingStorePage from './pages/VintageClothingStore';
import Register from './pages/VintageClothingStore/Register';
import Myhome from './pages/VintageClothingStore/Myhome';
import Login from './pages/VintageClothingStore/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VintageClothingStorePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myPage" element={<Myhome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

{/* <Route path="/" element={< />} /> */}