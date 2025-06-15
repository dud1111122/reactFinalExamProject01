import React from 'react';

const Card = ({ 
  image, 
  title, 
  description, 
  price, 
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white border border-black cursor-pointer hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="w-full h-[241px] bg-white border-b border-black flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={title || 'Product image'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            이미지 없음
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-[18px] font-inter font-normal leading-[22px] text-black mb-1">
          {title || '상품제목'}
        </h3>
        <p className="text-[16px] font-inter font-normal leading-[20px] text-[#6f6f6f] mb-2">
          {description || '상품설명'}
        </p>
        <p className="text-[18px] font-inter font-normal leading-[22px] text-black font-medium">
          {price || '123,456원'}
        </p>
      </div>
    </div>
  );
};

export default Card;