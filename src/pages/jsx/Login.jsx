import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { UserContext } from "@/contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(input.email, input.password); // context 함수 호출

    if (success) {
      sessionStorage.setItem("isLoggedIn", "true"); // 선택적 저장
      alert("로그인 성공!");
      navigate("/"); // 원하는 경로로 이동
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="w-full min-h-screen flex justify-center">
        <div className="w-full max-w-[550px] px-6 py-10 bg-white rounded-lg">
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

          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="mb-4">
              <label className="block mb-1 font-medium">이메일</label>
              <input
                name="email"
                value={input.email}
                onChange={handleChange}
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">비밀번호</label>
              <input
                name="password"
                type="password"
                value={input.password}
                onChange={handleChange}
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <button
              type="submit"
              className="mt-[30px] w-full h-[45px] bg-black text-white rounded-md hover:bg-gray-800"
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
