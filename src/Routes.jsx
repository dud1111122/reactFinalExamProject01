import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import VintageClothingStorePage from './pages/VintageClothingStore';
import Register from './pages/VintageClothingStore/Register';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VintageClothingStorePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;