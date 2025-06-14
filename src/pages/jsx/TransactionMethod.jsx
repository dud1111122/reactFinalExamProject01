import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TransactionMethod.css";

function TransactionMethod() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleNext = () => {
    console.log("다음 버튼 클릭됨, 선택한 거래 방법:", selectedMethod, "주소:", address);
    if (!selectedMethod) {
      alert("거래 방법을 선택해주세요.");
      return;
    }
    // 선택한 정보 state로 전달하면서 페이지 이동
    navigate("/order", { state: { method: selectedMethod, address } });
  };

  return (
    <div className="transaction-container">
      <div className="product-info">
        <div className="product-image" />
        <div>
          <div className="product-name">상품명</div>
          <div className="product-price">123,456원</div>
        </div>
      </div>

      <div className="method-select">
        <div className="method-label">거래 방법 선택</div>
        <fieldset className="method-fieldset">
          <label className="method-label-item">
            <input
              type="radio"
              name="delivery"
              value="선불"
              checked={selectedMethod === "선불"}
              onChange={handleChange}
            />
            선불
          </label>

          <label className="method-label-item">
            <input
              type="radio"
              name="delivery"
              value="착불"
              checked={selectedMethod === "착불"}
              onChange={handleChange}
            />
            착불
          </label>
        </fieldset>
      </div>

      <fieldset className="direct-trade-fieldset">
        <legend>직거래</legend>

        <textarea
          placeholder="주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

        <button
          className="btn next-btn"
          onClick={handleNext}
          disabled={!selectedMethod}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default TransactionMethod;
