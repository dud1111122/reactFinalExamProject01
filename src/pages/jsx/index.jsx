import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import products from '../../data/products.json';

import Header from '../../components/common/Header';
import HeroSection from '../../components/common/HeroSection';
import Card from '../../components/ui/Card';

const VintageClothingStore = () => {
  const navigate = useNavigate();

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
                  image={product.image}
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
