import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[341px] overflow-hidden">
      <img
        src="/images/img_202506041150_remix01jwwdfmq4fshs0rcf4svrvn4n_1.png"
        alt="Vintage Clothing Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h2 className="text-[24px] font-inter font-normal mb-4 tracking-wider">
          BRAND MIX
        </h2>
        <h1 className="text-[72px] font-inter font-bold mb-4 leading-tight">
          Vintage Clothing
        </h1>
        <p className="text-[20px] font-inter font-normal">
          세월이 묻어나는 빈티지 의류
        </p>
      </div> */}
    </section>
  );
};

export default HeroSection;