import React from 'react';
import { ProductProvider } from './contexts/ProductContext';
import { UserProvider } from './contexts/UserContext'; // ✅ 추가
import AppRoutes from './Routes';

function App() {
  return (
    <UserProvider> {/* ✅ 사용자 컨텍스트 추가 */}
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
