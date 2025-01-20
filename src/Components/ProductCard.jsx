import { FaHeart } from 'react-icons/fa';
import { RiHeartLine } from 'react-icons/ri';
import { IMAGE_BASE_URL } from '../utils/apiConstants';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddUserFavoriteMutation, useGetUserFavoritesQuery, useRemoveUserFavoriteMutation } from '../redux/slice/profileApiSlice';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.user);
  const { data } = useGetUserFavoritesQuery();
  const initialIsLiked = data?.data?.some((like) => like.product_id === product.id);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [addFavorite] = useAddUserFavoriteMutation();
  const [removeFavorite] = useRemoveUserFavoriteMutation();

  const navigate = useNavigate();

  const handleLike = async (event) => {
    event.stopPropagation();
    setIsLiked(true); // Optimistically update the UI
    try {
      await addFavorite({ product_id: product.id });
    } catch {
      setIsLiked(false); // Revert if the API call fails
    }
  };

  const handleRemove = async (event) => {
    event.stopPropagation();
    setIsLiked(false); // Optimistically update the UI
    try {
      await removeFavorite(product.id);
    } catch {
      setIsLiked(true); // Revert if the API call fails
    }
  };

  return (
    <div
      className="relative w-full product-card cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {product.label && (
        <div className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded-md z-10">
          {product.label}
        </div>
      )}
      {/* Added overflow-hidden to contain the zoomed image */}
      <div className="w-full h-[350px] xl:h-[400px] overflow-hidden">
        <img
          src={IMAGE_BASE_URL + '/' + product.featured_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-125"
        />
      </div>
      {user?.id && (
        <div className="absolute top-2 right-2 z-10">
          {isLiked ? (
            <FaHeart
              className="text-black"
              size={20}
              onClick={(event) => handleRemove(event)}
            />
          ) : (
            <RiHeartLine
              size={20}
              onClick={(event) => handleLike(event)}
            />
          )}
        </div>
      )}
      <div className="mt-2 md:mt-4">
        <Link
          to={`/products/${product.id}`}
          className="text-sm lg:text-base hover:font-bold hover:text-black"
        >
          {product.name}
        </Link>
        <p className="font-bold">${product.price}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;