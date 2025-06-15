import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔹 1. 전체 상품 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("상품 로딩 실패:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 2. 상품 추가
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('http://localhost:4000/products', {
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

  // 🔹 3. 상품 삭제
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: 'DELETE'
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("상품 삭제 실패:", err);
    }
  };

  // 🔹 4. 상품 수정
  const updateProduct = async (updatedProduct) => {
    try {
      await fetch(`http://localhost:4000/products/${updatedProduct.id}`, {
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

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
