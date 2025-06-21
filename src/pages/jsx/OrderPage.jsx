import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/OrderPage.css";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // TransactionMethod에서 전달된 state 받기
  const { productImage, product } = location.state || {};

  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");

  useEffect(() => {
    if (!product) {
      alert("상품 정보가 없습니다. 메인으로 이동합니다.");
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="order-container">
      {/* 배송지 */}
      <div className="section">
        <label className="label">배송지</label>
        <textarea
          placeholder="배송지를 입력해주세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="textarea"
        />
      </div>

      {/* 요청사항 */}
      <div className="section">
        <label className="label">판매자분께 요청사항</label>
        <textarea
          placeholder="예) 포장 꼼꼼하게 해주세요"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="textarea"
        />
      </div>

      {/* 주문 상품 */}
      <fieldset className="order-fieldset">
        <legend className="fieldset-legend">주문 상품</legend>
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
            <div className="product-name">{product?.title || "상품명 없음"}</div>
            <div className="product-price">
              {product?.price ? product.price.toLocaleString() + "원" : "-"}
            </div>
          </div>
        </div>
      </fieldset>

      {/* 하단 버튼 */}
      <div className="bottom-bar">
        <button onClick={() => navigate(-1)} className="btn cancel-btn">
          취소
        </button>
        <button onClick={() => {alert("결제가 완료되었습니다."); navigate("/")}} className="btn payment-btn">
          결제하기
        </button>
      </div>
    </div>
  );
}

export default OrderPage;
