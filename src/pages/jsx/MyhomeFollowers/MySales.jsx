import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/contexts/ProductContext";
import { UserContext } from "@/contexts/UserContext";

const MySales = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const handleClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // 유저의 sales 배열에 있는 상품 ID만 필터링
  const userProducts = products.filter((product) =>
    user?.sales?.includes(product.id)
  );

  return (
    <div>
      {userProducts.length === 0 ? (
        <p className="text-gray-500">판매내역이 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {userProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product)}
              className="flex flex-col border p-4 rounded-md w-[220px] shadow-sm hover:shadow-md cursor-pointer"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[200px] object-cover rounded mb-3"
                />
              )}
              <div className="font-semibold text-lg mb-2">{product.title}</div>
              <div className="text-sm text-gray-600 mb-1">
                {product.description || "설명이 없습니다."}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                마감시간:{" "}
                {product.deadline
                  ? new Date(product.deadline).toLocaleString()
                  : "-"}
              </div>
              <div className="text-base font-bold">
                {product.price ? `${product.price}` : "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySales;
