import { Link } from "react-router-dom";
import Header from "@/components/common/Header";


const Login = () => {
  return (
    <>
      {/* 헤더 (스크롤해도 고정됨) */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      {/* 메인 레이아웃 */}
      <div className="w-full min-h-screen flex justify-center ">
        <div className="w-full max-w-[550px] px-6 py-10 bg-white rounded-lg">
          {/* 로고 */}
          <div className="flex justify-center flex-col items-center mb-4 overflow-hidden">
            <img
              src="/images/img_12teamlogovectorized_1.svg"
              alt="12Team Logo"
              className="w-[90px] h-[90px]"
            />
            <img
              src="/images/React_Project_12Team_Page_img.svg"
              alt="12Team Logo"
              className="w-[190px] h-[90px] object-cover mt-[-16px]"
            />
          </div>

          {/* 폼 */}
          <form className="flex flex-col w-full">
            <div className="mb-4">
              <label className="block mb-1 font-medium ">아이디</label>
              <input
                name="email"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">비밀번호</label>
              <input
                name="password"
                type="password"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="mt-[30px] w-full h-[45px] bg-black text-white rounded-md hover:bg-gray-800 "
            >
              로그인
            </button>
        </form>
        <nav className="flex justify-center mt-4">
            <Link
            to="/register"
            className="text-[20px] font-inter font-normal leading-[25px] text-gray-600 hover:text-black transition-colors"
            >
            회원가입
          </Link>
        </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
