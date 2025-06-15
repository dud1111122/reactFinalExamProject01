import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import MyProducts from './MyhomeFollowers/MyProducts';

const Myhome = ({ products }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("registeredUser"));
  const nickname = user?.nickname || "닉네임 없음"; // 값이 없으면 기본 표시

  const [selectedPanel, setSelectedPanel] = useState(1); // 누른 네모 상태

  const panels = [
  { id: 1, label: "내 상품" },
  { id: 2, label: "구매 내역" },
  { id: 3, label: "판매 내역" },
  { id: 4, label: "찜" },
];


  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="w-full min-h-screen flex justify-start items-center flex-col py-10 ">
        {/* 프로필 영역 */}
        <div className="flex justify-end flex-col items-start w-full max-w-[1200px] h-[250px] p-4 pt-10 mb-7 border border-gray-300 rounded-md bg-white">
          <img
            src="/images/myhomeProfile01.jpg"
            alt="설명"
            className="w-[100px] h-[100px] object-cover rounded-full mb-3"
          />
          <h3 className="text-lg font-bold mb-1">{nickname}</h3>
          <p className="text-sm text-gray-600">나의 설명</p>
        </div>

        <div className="flex flex-col w-full max-w-[1200px] border border-gray-300 rounded-md bg-white overflow-hidden">
        <div className="flex w-full max-w-[1200px] border border-gray-300 rounded-md bg-white overflow-hidden">
            {panels.map((panel) => (
              <div
                key={panel.id}
                onClick={() => setSelectedPanel(panel.id)}
                className="flex-1 basis-1/4 h-[100px] bg-gray-100 border-r border-gray-300 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                {panel.label}
              </div>
            ))}
        </div>

        {/* 선택된 컴포넌트 보여주기 */}
        <div className="w-full max-w-[1200px] p-3">
          {selectedPanel === 1 && <MyProducts products={products}/>}
          {selectedPanel === 2 && <Panel2 />}
          {selectedPanel === 3 && <Panel3 />}
          {selectedPanel === 4 && <Panel4 />}
        </div>
        </div>
      </div>
    </>
  );
};

export default Myhome;
