import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';

const Myhome = ({ products }) => {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="w-full min-h-screen flex justify-start items-center flex-col py-10">
        {/* 프로필 영역 */}
        <div className="flex justify-end flex-col items-start w-full max-w-[1200px] h-[250px] p-4 pt-10 mb-7 border border-gray-300 rounded-md bg-white">
          <img
            src="/images/myhomeProfile01.jpg"
            alt="설명"
            className="w-[100px] h-[100px] object-cover rounded-full mb-3"
          />
          <h3 className="text-lg font-bold mb-1">닉네임</h3>
          <p className="text-sm text-gray-600">나의 설명</p>
        </div>

        {/* 등록된 상품 리스트 */}
        <div className="flex flex-wrap gap-4 w-full max-w-[1200px] p-4 border border-gray-300 rounded-md bg-white">
          {products.length === 0 ? (
            <p className="text-gray-500">등록된 상품이 없습니다.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleClick(product)}
                className="border p-4 rounded-md w-[200px] shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="font-semibold text-lg mb-2">{product.name}</div>
                <div className="text-sm text-gray-600 mb-1">
                  {product.description || '설명이 없습니다.'}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  마감시간: {product.deadline ? new Date(product.deadline).toLocaleString() : '-'}
                </div>
                <div className="text-base font-bold">{product.price ? `${product.price} 원` : '-'}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Myhome;
