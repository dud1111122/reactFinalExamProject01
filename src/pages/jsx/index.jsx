import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/common/Header';
import HeroSection from '../../components/common/HeroSection';
import Card from '../../components/ui/Card';
import { ProductContext } from '../../contexts/ProductContext';

const VintageClothingStore = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // 상세 페이지로 이동
  };

const hiddenIds = [1,5,11];

const filteredProducts = products
  .filter((product) => !hiddenIds.includes(Number(product.id)))
  .filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <>
      {/* 헤더 (스크롤해도 고정됨) */}
      <div className="sticky top-0 z-50 bg-white">
        <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>
      <div className="min-h-screen bg-white w-full flex justify-center">
        {/* 가운데 고정 프레임 */}
        <div className="w-full max-w-[1200px] px-4">
          {/* 히어로 섹션 */}
          <HeroSection />

          {/* 상품 리스트 */}
          <main className="py-12">
            <div className="grid grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full"
                  />
                ))
              ) : (
                <p className="col-span-4 text-center text-gray-500">
                  검색 결과가 없습니다.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VintageClothingStore;
