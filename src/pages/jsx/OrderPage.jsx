import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/OrderPage.css";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();  // 추가
  const { state } = location;
  
  const [address, setAddress] = useState(state?.address || "");
  const [request, setRequest] = useState("");
  
  useEffect(() => {
    if (state) {
      console.log("TransactionMethod에서 전달된 state:", state);
    }
  }, [state]);

  const handleCancel = () => {
    navigate(-1); // 뒤로 가기
  };

  const handlePayment = () => {
    alert("결제가 완료되었습니다.");
    navigate("/");  // 메인 화면으로 이동
  };

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

      {/* 판매자분께 요청사항 */}
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
          <div className="product-image" />
          <div>
            <div className="product-name">상품명</div>
            <div className="product-price">123,456원</div>
          </div>
        </div>
      </fieldset>

      {/* 하단 바 */}
      <div className="bottom-bar">
        <button onClick={handleCancel} className="btn cancel-btn">
          취소
        </button>
        <button onClick={handlePayment} className="btn payment-btn">
          결제하기
        </button>
      </div>
    </div>
  );
}

export default OrderPage;
