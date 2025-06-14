import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ products, updateProduct, deleteProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productToEdit = products.find((p) => p.id === Number(id));

  const [product, setProduct] = useState({
    name: '',
    description: '',
    deadline: '',
    price: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  if (!productToEdit) {
    return <div>해당 상품을 찾을 수 없습니다.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product);
    alert('상품이 수정되었습니다.');
    navigate('/mypage');
  };

  const handleDelete = () => {
    if (window.confirm('정말 이 상품을 삭제하시겠습니까?')) {
      deleteProduct(product.id);
      navigate('/mypage');
    }
  };

  return (
    <div className="transaction-container">
      <form onSubmit={handleSubmit}>
        {/* 상품명 */}
        <div className="method-select">
          <label htmlFor="name">상품명</label>
          <input
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* 설명 */}
        <div className="method-select">
          <label htmlFor="description">자세한 설명</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>

        {/* 마감시간 */}
        <div className="method-select">
          <label htmlFor="deadline">판매 마감시간</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={product.deadline}
            onChange={handleChange}
            className="form-datetime"
          />
        </div>

        {/* 가격 */}
        <div className="method-select">
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-price"
          />
          <span className="price-unit">원</span>
        </div>

        {/* 버튼 그룹 */}
        <div className="button-group">
          <button type="button" onClick={() => navigate('/mypage')} className="btn cancel-btn">
            취소
          </button>
          <button type="submit" className="btn next-btn">
            수정완료
          </button>
          <button type="button" onClick={handleDelete} className="btn delete-btn" style={{marginLeft:'10px', backgroundColor: 'red', color: 'white'}}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
