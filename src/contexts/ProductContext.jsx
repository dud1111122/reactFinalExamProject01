// src/contexts/ProductContext.js
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://reactfinalexamproject01.onrender.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("상품 로딩 실패:", err);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('https://reactfinalexamproject01.onrender.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const saved = await res.json();
      setProducts((prev) => [...prev, saved]);
    } catch (err) {
      console.error("상품 추가 실패:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`https://reactfinalexamproject01.onrender.com/products/${id}`, {
        method: 'DELETE'
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("상품 삭제 실패:", err);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await fetch(`https://reactfinalexamproject01.onrender.com/products/${updatedProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err) {
      console.error("상품 수정 실패:", err);
    }
  };

  // 🔹 상품 likedBy만 갱신 (찜 처리 반영용)
  const patchProductLikedBy = (id, likedBy) => {
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(id) ? { ...p, likedBy } : p
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct, patchProductLikedBy }}
    >
      {children}
    </ProductContext.Provider>
  );
};
