import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "@/contexts/ProductContext";
import { UserContext } from "@/contexts/UserContext";
import Header from "@/components/common/Header";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [views, setViews] = useState(0);
  const [liked, setLiked] = useState(false);

  const { products, patchProductLikedBy } = useContext(ProductContext);
  const { user, loadUser } = useContext(UserContext);

  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
    setViews((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (user && product) {
      setLiked(product.likedBy.includes(user.id));
    }
  }, [user, product]);

  const handleLike = async () => {
    if (!user || !product) return;

    const isAlreadyLiked = product.likedBy.includes(user.id);
    let updatedLikedBy = isAlreadyLiked
      ? product.likedBy.filter((uid) => uid !== user.id)
      : [...product.likedBy, user.id];

    let updatedLikes = isAlreadyLiked
      ? user.likes.filter((pid) => String(pid) !== String(product.id))
      : [...user.likes, product.id];

    try {
      await fetch(`http://localhost:4000/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likedBy: updatedLikedBy }),
      });

      await fetch(`http://localhost:4000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedLikes }),
      });

      patchProductLikedBy(product.id, updatedLikedBy);
      await loadUser(user.id);

      setLiked(!isAlreadyLiked);
    } catch (err) {
      console.error("찜 처리 중 오류:", err);
    }
  };

  if (!product) {
    return (
      <>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <div className="p-10 text-center text-lg">❌ 해당 상품을 찾을 수 없습니다.</div>
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

          <div className="mb-6">
            <div className="text-xl font-bold">{product.title}</div>
            <div className="text-lg mt-2">가격: {product.price}</div>
            <div className="text-sm text-gray-500 mt-1">조회수: {views}</div>
          </div>

          <div className="flex gap-3 mb-8">
            

            {/* 구매하기 클릭 시 이미지+상품 데이터를 state로 전달 */}
            <button
              className="flex-1 py-3 bg-black text-white rounded-lg text-base hover:bg-gray-800 transition"
              onClick={() =>
                navigate("/transaction", {
                  state: { productImage: product.image, product },
                })
              }
            >
              구매하기
            </button>

            <button
              className={`flex-1 py-3 rounded-lg text-base transition ${
                liked ? "bg-red-500 text-white" : "bg-gray-300 text-black"
              }`}
              onClick={handleLike}
            >
              {liked ? "찜 취소" : "찜하기 ❤️"}
            </button>
          </div>

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
