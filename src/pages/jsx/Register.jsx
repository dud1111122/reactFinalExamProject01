import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/Header";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    agreeAll: false,
    ageAgree: false,
    termsAgree: false,
    privacyAgree: false,
    marketingAgree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAgreeAll = () => {
    const checked = !form.agreeAll;
    setForm((prev) => ({
      ...prev,
      agreeAll: checked,
      ageAgree: checked,
      termsAgree: checked,
      privacyAgree: checked,
      marketingAgree: checked,
    }));
  };
  


  const handleSubmit = async (e) => {
  e.preventDefault();

  // 유효성 검사
  if (!form.email || !form.password || !form.passwordCheck || !form.nickname) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  if (form.password !== form.passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!form.ageAgree || !form.termsAgree || !form.privacyAgree) {
    alert("필수 약관에 동의해주세요.");
    return;
  }

  try {
    // 이메일 중복 확인
    const res = await fetch(`http://localhost:4000/users?email=${form.email}`);
    const existingUsers = await res.json();
    if (existingUsers.length > 0) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    // 저장할 유저 데이터 구성
    const newUser = {
      email: form.email,
      password: form.password,
      nickname: form.nickname,
      myProducts: [],
      sales: [],
      purchases: [],
      likes: []
    };

    // json-server에 POST 요청으로 저장
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  } catch (err) {
    console.error("회원가입 중 오류 발생:", err);
    alert("회원가입 중 오류가 발생했습니다.");
  }
};




  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="w-full min-h-screen flex justify-center">
        <div className="w-full max-w-[550px] px-6 py-10 bg-white rounded-lg">
          <div className="flex justify-center mb-8">
            <img
              src="/images/img_12teamlogovectorized_1.svg"
              alt="12Team Logo"
              className="w-[90px] h-[90px]"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
            <div>
              <label className="block mb-1 font-medium">이메일</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="예)team12@team12.com"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">비밀번호</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="8~20자 이내의 영문과 숫자 조합"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">비밀번호 확인</label>
              <input
                name="passwordCheck"
                type="password"
                value={form.passwordCheck}
                onChange={handleChange}
                placeholder="8~20자 이내의 영문과 숫자 조합"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">닉네임</label>
              <input
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                placeholder="예)KanyeWest"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div className="flex justify-between border-b border-gray-400 py-2">
              <a>전체 동의하기</a>
              <input
                type="checkbox"
                name="agreeAll"
                checked={form.agreeAll}
                onChange={handleAgreeAll}
              />
            </div>

            <div className="flex flex-col space-y-4 w-full">
              <div className="flex justify-between">
                <a>본인은 만 14세 이상입니다. (필수)</a>
                <input
                  type="checkbox"
                  name="ageAgree"
                  checked={form.ageAgree}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <a>서비스 이용약관에 동의합니다. (필수)</a>
                <input
                  type="checkbox"
                  name="termsAgree"
                  checked={form.termsAgree}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <a>개인정보 취급방침에 동의합니다. (필수)</a>
                <input
                  type="checkbox"
                  name="privacyAgree"
                  checked={form.privacyAgree}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <a>혜택/이벤트 정보 수신에 동의합니다. (선택)</a>
                <input
                  type="checkbox"
                  name="marketingAgree"
                  checked={form.marketingAgree}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full h-[45px] bg-black text-white rounded-md hover:bg-gray-800"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
