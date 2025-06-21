import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import Header from "@/components/common/Header";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [views, setViews] = useState(0);

  const { products } = useContext(ProductContext);
  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
    setViews((prev) => prev + 1);
  }, []);

  if (!product) {
    return (
      <>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <div className="p-10 text-center text-lg">
          ❌ 해당 상품을 찾을 수 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="max-w-xl mx-auto my-10 font-sans px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">상품 상세</h1>
        </header>

        <main>
          {/* 이미지 영역 */}
          <div className="w-full h-full bg-gray-200 mb-5 flex items-center justify-center overflow-hidden rounded-md">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">이미지 없음</div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="mb-6">
            <div className="text-xl font-bold">{product.title}</div>
            <div className="text-lg mt-2">가격: {product.price}</div>
            <div className="text-sm text-gray-500 mt-1">조회수: {views}</div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 mb-8">
            <button
              className="flex-1 py-3 bg-gray-300 rounded-lg text-base hover:bg-gray-400 transition"
              onClick={() => navigate("/chat")}
            >
              채팅하기
            </button>
            <button
              className="flex-1 py-3 bg-black text-white rounded-lg text-base hover:bg-gray-800 transition"
              onClick={() => navigate("/transaction")}
            >
              구매하기
            </button>
          </div>

          {/* 설명 영역 */}
          <section>
            <h3 className="text-lg font-semibold mb-2">상품 설명</h3>
            <p className="text-sm text-gray-700">
              {product.description || "상품에 대하여 상세 설명을 적어주세요."}
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

export default ProductDetail;
