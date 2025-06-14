import Header from "@/components/common/Header";

const Myhome = () => {
    return (<>
        {/* 헤더 (스크롤해도 고정됨) */}
        <div className="sticky top-0 z-50 bg-white">
            <Header />
        </div>
        {/* 메인 레이아웃 */}
        <div className="w-full min-h-screen flex justify-start items-center flex-col py-10">
            <div className="flex justify-end flex-col items-start w-full max-w-[1200px] h-[250px] p-4 pt-10 mb-7 border border-gray-300 rounded-md  bg-white">
                
                <img src="/images/myhomeProfile01.jpg" alt="설명" className="w-[100px] h-[100px] object-cover rounded-full  mb-3" />

                <h3 className="text-lg font-bold mb-1">닉네임</h3>
                <p className="text-sm text-gray-600">나의 설명</p>
            </div>

            <div className="flex justify-end flex-col items-start w-full max-w-[1200px] h-[250px] p-4 pt-10 border border-gray-300 rounded-md  bg-white">

            </div>
        </div>

    </>);
}

export default Myhome;