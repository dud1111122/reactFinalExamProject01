import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import InputField from '../ui/InputField';

const Header = ({ searchTerm, onSearch }) => {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    sessionStorage.setItem("isLoggedIn", "false");
    alert("로그아웃 되었습니다.");
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
    window.location.reload(); // 로그아웃 상태 반영 위해 새로고침 (필요시)
  };

  return (
    <header className="w-full h-[105px] bg-white py-1 px-6 border-b border-gray-400">
      <div className="flex items-center justify-center max-w-[1920px] mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/images/img_12teamlogovectorized_1.svg"
              alt="12Team Logo"
              className="w-[90px] h-[90px]"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[738px] mx-8">
          <InputField
            placeholder="상품명으로 편하게 상품을 찾으실 수 있어요!"
            className="w-full py-1"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 translate-y-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-[20px] font-inter font-normal leading-[25px] text-black hover:text-gray-600 transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <Link
              to="/login"
              className="text-[20px] font-inter font-normal leading-[25px] text-black hover:text-gray-600 transition-colors"
            >
              로그인/회원가입
            </Link>
          )}

          <Link
            to={isLoggedIn ? "/add-product" : "/login"}
            className="text-[20px] font-inter font-normal leading-[25px] text-black hover:text-gray-600 transition-colors"
          >
            상품등록
          </Link>

          <Link
            to={isLoggedIn ? "/mypage" : "/login"}
            className="text-[20px] font-inter font-normal leading-[25px] text-black hover:text-gray-600 transition-colors"
          >
            마이페이지
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
