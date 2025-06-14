import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import VintageClothingStorePage from './pages/jsx/index';
import Register from './pages/jsx/Register';
import Myhome from './pages/jsx/Myhome';
import Login from './pages/jsx/Login';
import ProductDetail from './pages/jsx/ProductDetail';
import TransactionMethod from './pages/jsx/TransactionMethod';
import OrderPage from './pages/jsx/OrderPage';
import AddProduct from './pages/jsx/AddProduct';
import ChatPage from './pages/jsx/ChatPage';
import EditProduct from './pages/jsx/EditProduct';

const AppRoutes = ({ products, addProduct, deleteProduct, updateProduct }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VintageClothingStorePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<Myhome products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/transaction" element={<TransactionMethod />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/add-product" element={<AddProduct addProduct={addProduct} />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route
          path="/edit-product/:id"
          element={
            <EditProduct
              products={products}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
