import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';

const AddProduct = ({ addProduct }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    deadline: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name.trim()) {
      alert('상품명을 입력해주세요.');
      return;
    }
    // 새 상품 등록 (상품 객체에 id 부여)
    addProduct({ 
      ...product, 
      id: Date.now(), // 간단한 id 생성
    });
    alert('상품이 등록되었습니다!');
    navigate('/mypage');
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  return (
    <div className="transaction-container">
      {/* 상품 정보 미리보기 */}
      <div className="product-info">
        <div className="product-image">
          <img
            src="/icons/camera.svg"
            alt="Upload"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <div className="product-name">{product.name || '상품명'}</div>
          <div className="product-price">
            {product.price ? `${product.price} 원` : '가격'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="method-select">
          <label className="method-label" htmlFor="name">
            상품명
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="상품명"
            value={product.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="method-select">
          <label className="method-label" htmlFor="description">
            자세한 설명
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="상품 설명을 입력하세요"
            value={product.description}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>

        <div className="method-select">
          <label className="method-label" htmlFor="deadline">
            판매 마감시간
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={product.deadline}
            onChange={handleChange}
            className="form-datetime"
          />
        </div>

        <div className="method-select">
          <label className="method-label" htmlFor="price">
            가격
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="가격"
              value={product.price}
              onChange={handleChange}
              className="form-price"
            />
            <span className="price-unit">원</span>
          </div>
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={handleCancel}
            className="btn cancel-btn"
          >
            취소
          </button>
          <button type="submit" className="btn next-btn">
            등록완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
