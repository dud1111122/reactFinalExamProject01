import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/TransactionMethod.css";

function TransactionMethod() {
  const location = useLocation();
  const navigate = useNavigate();

  // ProductDetail에서 전달된 이미지와 상품 정보 받기
  const { productImage, product } = location.state || {};

  // 직접 진입 시 상품정보 없으면 뒤로 이동 (선택사항)
  if (!product) {
    navigate(-1);
    return null;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const handleNext = () => {
    // 주문 페이지로 이미지와 상품 정보 전달
    navigate("/order", {
      state: { productImage, product },
    });
  };

  return (
    <div className="transaction-container">
      {/* 상품 정보 부분에 이미지 추가 */}
      <div className="product-info">
        {productImage ? (
          <img
            src={productImage}
            alt={product?.title || "상품 이미지"}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">상품 이미지 없음</div>
        )}
        <div>
          <div className="product-name">{product?.title || "상품명"}</div>
          <div className="product-price">
            {product?.price ? product.price.toLocaleString()  : "가격 정보 없음"}
          </div>
        </div>
      </div>

      {/* 기존 디자인 그대로 */}
      <div className="method-select">
        <div className="method-label">거래 방법 선택</div>
        <fieldset className="method-fieldset">
          <label className="method-label-item">
            <input
              type="radio"
              name="delivery"
              value="선불"
              // onChange, checked 등 기존 코드 유지
            />
            선불
          </label>

          <label className="method-label-item">
            <input
              type="radio"
              name="delivery"
              value="착불"
              // onChange, checked 등 기존 코드 유지
            />
            착불
          </label>
        </fieldset>
      </div>

      <fieldset className="direct-trade-fieldset">
        <legend>직거래</legend>

        <textarea
          placeholder="주소를 입력하세요"
          // 기존 textarea props 유지
          style={{
            width: "100%",
            minHeight: 80,
            marginTop: 8,
            padding: 8,
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #ccc",
            resize: "vertical",
            fontFamily: "Arial, sans-serif",
          }}
        />
      </fieldset>

      <div className="button-group">
        <button className="btn cancel-btn" onClick={handleCancel}>
          취소
        </button>

        <button className="btn next-btn" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default TransactionMethod;
