import React, { useState } from 'react';
import AppRoutes from './Routes';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <AppRoutes
      products={products}
      addProduct={addProduct}
      deleteProduct={deleteProduct}
      updateProduct={updateProduct}
    />
  );
}

export default App;
