// src/pages/Myhome.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/common/Header';
import MyProducts from './MyhomeFollowers/MyProducts';
import { UserContext } from '@/contexts/UserContext';
import MyPurchases from './MyhomeFollowers/MyPurchases';
import MySales from './MyhomeFollowers/MySales';
import MyLikes from './MyhomeFollowers/MyLikes';

const Myhome = () => {
  
  const { user, loadUser } = useContext(UserContext);

  const [selectedPanel, setSelectedPanel] = useState(1);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [editNickname, setEditNickname] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // 수정 모드 진입 시 기존 값 세팅
  useEffect(() => {
    if (updateProfile && user) {
      setEditNickname(user.nickname || "");
      setEditDescription(user.description || "");
    }
  }, [updateProfile, user]);

  // 저장 처리
  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`http://localhost:4000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: editNickname,
          description: editDescription,
        }),
      });

      if (!res.ok) throw new Error("업데이트 실패");

      await loadUser(user.id); // 최신 정보로 다시 불러오기
      setUpdateProfile(false);
      alert("프로필이 성공적으로 수정되었습니다.");
    } catch (error) {
      alert("프로필 수정 실패");
      console.error(error);
    }
  };

  if (!user) return (<>
    console.log(user);
    <div>⏳ 유저 정보를 불러오는 중...</div>
  </>);

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

      <div className="w-full min-h-screen flex justify-start items-center flex-col py-10">
        {/* 프로필 영역 */}
        <div className="flex justify-end flex-col items-start w-full max-w-[1200px] h-[250px] p-4 pt-10 mb-7 border border-gray-300 rounded-md bg-white relative">
          <img
            src="/images/myhomeProfile01.png"
            alt="프로필 이미지"
            className="w-[100px] h-[100px] object-contain rounded-full mb-3"
          />

          {updateProfile ? (
            <>
              <input
                type="text"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                className="border px-2 py-1 mb-2 rounded w-[300px]"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border px-2 py-1 mb-2 rounded w-[300px]"
              />
              <button
                onClick={handleSaveProfile}
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded"
              >
                저장 완료
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-1">{user.nickname || "닉네임 없음"}</h3>
              <p className="text-sm text-gray-600">{user.description || "나의 설명"}</p>
              <button
                onClick={() => setUpdateProfile(true)}
                className="absolute top-3 right-3 text-sm text-blue-500 border border-blue-500 px-2 py-1 rounded"
              >
                프로필 수정
              </button>
            </>
          )}
        </div>

        {/* 네모 패널 */}
        <div className="flex flex-col w-full max-w-[1200px] border border-gray-300 rounded-md bg-white overflow-hidden">
          <div className="flex w-full border-b border-gray-300">
            {panels.map((panel) => (
              <div
                key={panel.id}
                onClick={() => setSelectedPanel(panel.id)}
                className={`flex-1 basis-1/4 h-[100px] border-r border-gray-300 flex justify-center items-center cursor-pointer transition
                  ${selectedPanel === panel.id ? "bg-white font-bold" : "bg-gray-100 hover:bg-gray-200"}
                `}
               >
            {panel.label}
            </div>
          ))}
          </div>

          <div className="w-full max-w-[1200px] p-3">
            {selectedPanel === 1 && <MyProducts />}
            {selectedPanel === 2 && <MyPurchases />}
            {selectedPanel === 3 && <MySales />}
            {selectedPanel === 4 && <MyLikes />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Myhome;
