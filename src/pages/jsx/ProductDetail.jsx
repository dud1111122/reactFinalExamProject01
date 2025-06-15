import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [views, setViews] = useState(0);

  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    setViews((prev) => prev + 1);
  }, []);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontSize: 18 }}>
        ❌ 해당 상품을 찾을 수 없습니다.
      </div>
    );
  }

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
            overflow: "hidden",
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ color: "#999" }}>이미지 없음</div>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>{product.title}</div>
          <div style={{ fontSize: 20, marginTop: 8 }}>가격: {product.price}</div>
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
            onClick={() => navigate("/chat")}
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
            onClick={() => navigate("/transaction")}
          >
            구매하기
          </button>
        </div>

        <section style={{ marginTop: 40 }}>
          <h3>상품 설명</h3>
          <p>{product.description || "상품에 대하여 상세 설명을 적어주세요."}</p>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;
