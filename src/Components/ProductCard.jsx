import { FaHeart } from 'react-icons/fa';
import { RiHeartLine } from 'react-icons/ri';
import { IMAGE_BASE_URL } from '../utils/apiConstants';

const ProductCard = ({ product }) => {
  return (
    <div className="relative w-full product-card">
      {product.label && (
        <div className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded-md">
          {product.label}
        </div>
      )}
      <img src={IMAGE_BASE_URL + "/" + product.featured_image} alt={product.name} className="w-full h-[350px] xl:h-[400px] object-cover" />
      <div className="absolute top-2 right-2">
        {product.isLiked ? <FaHeart className="text-black" size={18}  /> :
        <RiHeartLine size={18} />}
      </div>
      <div className="mt-2 md:mt-4">
        <p className="text-sm lg:text-base">{product.name}</p>
        <p className="font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;