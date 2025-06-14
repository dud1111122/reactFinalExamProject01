import Header from "@/components/common/Header";

const Register = () => {
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
          <div className="flex justify-center mb-8">
            <img
              src="/images/img_12teamlogovectorized_1.svg"
              alt="12Team Logo"
              className="w-[90px] h-[90px]"
            />
          </div>

          {/* 폼 */}
          <form className="flex flex-col space-y-4 w-full">
            <div>
              <label className="block mb-1 font-medium">아이디</label>
              <input
                name="email"
                placeholder="예)team12@team12.com"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">비밀번호</label>
              <input
                name="password"
                type="password"
                placeholder="8~20자 이내의 영문과 숫자 조합"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">비밀번호 확인</label>
              <input
                name="passwordCheck"
                type="password"
                placeholder="8~20자 이내의 영문과 숫자 조합"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">닉네임</label>
              <input
                name="nickname"
                type="nickname"
                placeholder="예)KanyeWest"
                className="w-full h-[40px] p-3 rounded-md border border-gray-400"
              />
            </div>

            <div className="flex justify-between border-b border-gray-400 py-2">
                <a>전체 동의하기</a>
                <input type="checkbox" />
            </div>

            <div className="flex flex-col space-y-4 w-full">
                <div className="flex justify-between">
                    <a>본인은 만 14세 이상입니다. (필수)</a>
                    <input type="checkbox" />
                </div>

                <div className="flex justify-between">
                    <a>서비스 이용약관에 동의합니다. (필수)</a>
                    <input type="checkbox" />
                </div>

                <div className="flex justify-between">
                    <a>개인정보 취급방침에 동의합니다. (필수)</a>
                    <input type="checkbox" />
                </div>

                <div className="flex justify-between">
                    <a>혜택/이벤트 정보 수신에 동의합니다. (선택)</a>
                    <input type="checkbox" />
                </div>
                
            </div>


            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="mt-6 w-full h-[45px] bg-black text-white rounded-md hover:bg-gray-800 "
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
