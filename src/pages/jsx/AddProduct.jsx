import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import { ProductContext } from '@/contexts/ProductContext';
import { UserContext } from '@/contexts/UserContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);
  const { user, loadUser } = useContext(UserContext);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    deadline: '',
    price: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title.trim()) {
      alert('상품명을 입력해주세요.');
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      sellerId: user?.id || '',
      buyerId: null,
      likedBy: [],
    };

    await addProduct(newProduct); // 상품 등록

    // 🔽 유저의 myProducts 배열에 등록한 상품 ID 추가
    if (user?.id) {
      try {
        const updatedMyProducts = [...(user.myProducts || []), newProduct.id];

        await fetch(`http://localhost:4000/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ myProducts: updatedMyProducts }),
        });

        await loadUser(user.id); // 최신 유저 정보 다시 불러오기
      } catch (err) {
        console.error("유저 myProducts 업데이트 실패", err);
      }
    }

    alert('상품이 등록되었습니다!');
    navigate('/mypage');
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="w-full max-w-[1000px] mx-auto my-10 p-4 pt-8 mb-20 border border-gray-300 rounded-md">
        <div className="flex flex-col mb-6 border border-b-gray-400 border-white">
          <div className="w-[300px] h-[300px] bg-gray-300 rounded-lg overflow-hidden mb-4 shrink-0">
            <img
              src={product.image || ''}
              alt="Upload"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-2xl mb-1">{product.title || '예시 상품명'}</div>
            <div className="text-lg mb-5">{product.price ? `${product.price} 원` : '예시 가격'}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 이미지 업로드 */}
          <div className='flex flex-col mb-6'>
            <label className="mb-2">상품 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-white hover:file:bg-gray-100"
            />
          </div>

          {/* 상품명 */}
          <div className='flex flex-col mb-6'>
            <label htmlFor="title" className="block text-base font-semibold mb-3">상품명</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="상품명을 입력해주세요."
              value={product.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg text-base shadow-inner focus:outline-none focus:ring focus:border-gray-700"
            />
          </div>

          {/* 카테고리
          <div className="flex flex-col mb-6">
            <label htmlFor="category" className="block text-base font-semibold mb-3">카테고리</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg text-base bg-white shadow-inner focus:outline-none focus:ring focus:border-gray-700"
            >
              <option value="">카테고리를 선택해주세요.</option>
              <option value="상의">상의</option>
              <option value="하의">하의</option>
              <option value="아우터">아우터</option>
              <option value="신발">신발</option>
              <option value="가방">가방</option>
              <option value="악세서리">악세서리</option>
            </select>
          </div> */}

          {/* 설명 */}
          <div className='flex flex-col mb-6'>
            <label htmlFor="description" className="block text-base font-semibold mb-3">설명</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="상품 설명을 입력하세요"
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg text-base resize-y shadow-inner focus:outline-none focus:ring focus:border-gray-700"
            ></textarea>
          </div>

          {/* 마감시간 */}
          <div className='flex flex-col mb-6'>
            <label htmlFor="deadline" className="block text-base font-semibold mb-3">판매 마감시간</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={product.deadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg text-base shadow-inner focus:outline-none focus:ring focus:border-gray-700"
            />
          </div>

          {/* 가격 */}
          <div className='flex flex-col mb-6'>
            <label htmlFor="price" className="block text-base font-semibold mb-3">가격</label>
            <div className="flex items-center">
              <input
                type="number"
                id="price"
                name="price"
                placeholder="가격을 입력해주세요"
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg text-base shadow-inner focus:outline-none focus:ring focus:border-gray-700"
              />
              <span className="ml-2 text-base">원</span>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="fixed bottom-0 left-0 right-0 w-full bg-black px-6 py-4">
            <div className='w-full max-w-[1000px] mx-auto flex justify-end gap-4'>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-base hover:bg-gray-400 transition"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-gray-400 text-white px-6 py-2 rounded-lg text-base hover:bg-gray-600 transition"
              >
                등록완료
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
