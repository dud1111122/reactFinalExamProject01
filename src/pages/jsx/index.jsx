import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import HeroSection from '../../components/common/HeroSection';
import Card from '../../components/ui/Card';

const VintageClothingStore = () => {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 2, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 3, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 4, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 5, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 6, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 7, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 8, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 9, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 10, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 11, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 12, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 13, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 14, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 15, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 16, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 17, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 18, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 19, title: '상품제목', description: '상품설명', price: '123,456원' },
    { id: 20, title: '상품제목', description: '상품설명', price: '123,456원' },
  ]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // 상세 페이지로 이동
  };

  return (
    <>
      {/* 헤더 (스크롤해도 고정됨) */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>
      <div className="min-h-screen bg-white w-full flex justify-center">
        {/* 가운데 고정 프레임 */}
        <div className="w-full max-w-[1200px] px-4">
          {/* 히어로 섹션 */}
          <HeroSection />

          {/* 상품 리스트 */}
          <main className="py-12">
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VintageClothingStore;
