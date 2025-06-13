import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import VintageClothingStorePage from './pages/VintageClothingStore';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VintageClothingStorePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;