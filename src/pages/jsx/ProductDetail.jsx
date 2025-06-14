import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [views, setViews] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setViews((prev) => prev + 1);
  }, []);

  const handleBuyClick = () => {
    navigate("/transaction");
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <header>
        <h1>상품 상세</h1>
      </header>
      <main>
        <div
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "#eee",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          }}
        >
          이미지 없음
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>상품명 (id: {id})</div>
          <div style={{ fontSize: 20, marginTop: 8 }}>가격: 123,456원</div>
          <div style={{ color: "#666", marginTop: 4 }}>조회수: {views}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              flex: 1,
              padding: "12px 0",
              backgroundColor: "#ddd",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/chat")}  // 이 부분만 변경
          >
            채팅하기
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px 0",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={handleBuyClick}
          >
            구매하기
          </button>
        </div>
        <section style={{ marginTop: 40 }}>
          <h3>상품 설명</h3>
          <p>상품에 대하여 상세 설명을 적어주세요.</p>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;
