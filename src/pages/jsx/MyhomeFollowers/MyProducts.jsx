import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/contexts/ProductContext";

const MyProducts = () => {
    const navigate = useNavigate();
    const { products } = useContext(ProductContext);

    const handleClick = (product) => {
        navigate(`/edit-product/${product.id}`)
  };

    return (
  <div>
    {products.length === 0 ? (
      <p className="text-gray-500">등록된 상품이 없습니다.</p>
    ) : (
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product)}
            className="flex flex-col border p-4 rounded-md w-[220px] shadow-sm hover:shadow-md cursor-pointer"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded mb-3"
              />
            )}

            <div className="font-semibold text-lg mb-2">{product.name}</div>
            <div className="text-sm text-gray-600 mb-1">
              {product.description || '설명이 없습니다.'}
            </div>
            <div className="text-sm text-gray-500 mb-1">
              마감시간: {product.deadline ? new Date(product.deadline).toLocaleString() : '-'}
            </div>
            <div className="text-base font-bold">
              {product.price ? `${product.price} 원` : '-'}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default MyProducts;