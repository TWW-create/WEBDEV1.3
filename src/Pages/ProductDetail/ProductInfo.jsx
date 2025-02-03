import { useEffect, useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Divider, message } from "antd";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { RiHeartLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { useAddUserFavoriteMutation, useGetUserFavoritesQuery, useRemoveUserFavoriteMutation } from "../../redux/slice/profileApiSlice";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product, shipping, returns }) => {
  const { user } = useSelector((state) => state.user);
  const { data: likeData } = useGetUserFavoritesQuery();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const initialIsLiked = likeData?.data?.some((like) => like.product_id === product.id);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [activeVariant, setActiveVariant] = useState(product?.variants[0]);
  const [addFavorite] = useAddUserFavoriteMutation();
  const [removeFavorite] = useRemoveUserFavoriteMutation();
  const accordionRefs = useRef({});
  const productSectionRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!activeVariant || !selectedSize) {
      return;
    }

    dispatch(
      addToCart({
        id: product?.id,
        name: product.name,
        price: product.price,
        selectedColor: activeVariant.color,
        selectedSize: selectedSize,
        quantity: 1,
        image: activeVariant.images[0]?.image_path,
        variant_id: activeVariant.id,
      })
    );
    message.success(`${product?.name} added to cart successfully!`);
  };

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

  const toggleAccordion = (section) => {
    // Close current section if it's already open
    if (openAccordion === section) {
      setOpenAccordion(null);
      return;
    }

    // Open new section
    setOpenAccordion(section);

    // Scroll the section into view after a brief delay to allow for animation
    setTimeout(() => {
      if (accordionRefs.current[section]) {
        const sectionElement = accordionRefs.current[section];
        const container = sectionElement.closest('.scrollbar-hide');
        
        if (container) {
          const sectionRect = sectionElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Check if the section is not fully visible
          if (sectionRect.top < containerRect.top || sectionRect.bottom > containerRect.bottom) {
            container.scrollTo({
              top: container.scrollTop + sectionRect.top - containerRect.top - 20, // Adjust scroll offset with some padding
              behavior: 'smooth',
            });
          }
        }
      }
    }, 100); // Add a slight delay for smooth transition
  };

  const handleColorChange = (variant) => {
    setActiveVariant(variant);
    setSelectedSize(null); 
    setSelectedImageIndex(0);
  };

  useEffect(() => {
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedImageIndex(0);
  }, [product]);

  return (
    <div
      className="px-6 lg:px-10 xl:px-20 pt-12 flex gap-9 flex-col lg:flex-row lg:h-[90vh] overflow-y-scroll scrollbar-hide"
      ref={productSectionRef}
    >
      <div className="w-full flex-grow">
        <div className="flex flex-col gap-4 mb-3 md:mb-0">
          {activeVariant?.images && (
            <img
              src={IMAGE_BASE_URL + "/" + activeVariant.images[selectedImageIndex]?.image_path}
              alt="/"
              className="w-full h-[calc(80vh-80px)] object-contain bg-[#eeeeee] object-center rounded-md"
            />
          )}
          <div className="flex gap-5">
            {activeVariant?.images?.map((image, index) => (
              <img
                key={index}
                src={IMAGE_BASE_URL + "/" + image?.image_path}
                alt="/"
                className={`w-16 lg:w-20 h-16 lg:h-20 object-cover rounded-md cursor-pointer border hover:border-solid border-primary/70 ${
                  selectedImageIndex === index && "border-2 border-solid !border-black p-1"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-[300px] xl:w-[500px] shrink-0 mt-10 lg:mt-0 overflow-y-scroll scrollbar-hide">
        <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
        <p className="text-xl text-gray-700 mb-4">${product?.price}</p>
        {/* <div className="mb-4 flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Color:</label>
          <div className="flex gap-2 items-center">
            {product?.colors?.map((color, index) => (
              <div
                key={index}
                className={`w-9 h-9 flex justify-center items-center ${
                  selectedColor === color && "border-black rounded-full cursor-pointer border "
                }`}
                onClick={() => setSelectedColor(color)}
              >
                <div
                  className={`w-3 h-3 rounded-full border cursor-pointer ${
                    selectedColor === color ? "border-none" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </div>
            ))}
          </div>
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Color:</label>
          <div className="flex gap-4">
            {product?.variants.map((variant) => (
              <div
                key={variant.id}
                className={`cursor-pointer text-center ${
                  activeVariant.id === variant.id ? "font-bold" : ""
                }`}
                onClick={() => handleColorChange(variant)}
              >
                <img
                  src={`${IMAGE_BASE_URL}/${variant.images[0]?.image_path}`}
                  alt={variant.color}
                  className={`w-16 h-16 rounded-md mb-2 ${ activeVariant.id === variant.id ? "border border-black p-1" : ""}`}
                />
                <span className="capitalize">{variant.color}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p>
            <span className="text-sm font-medium text-gray-700">Creator:</span>
            <span className="capitalize ml-2 cursor-pointer hover:font-bold" onClick={() => navigate(`/creator/${product?.creator?.slug}`)}>{product?.creator?.name}</span>
          </p>
        </div>

        <Divider />
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
          <div className="flex gap-2">
              {activeVariant?.sizes.map((size) => (
                <div
                  key={size}
                  className={`flex justify-center items-center border h-12 w-12 p-4 rounded-full cursor-pointer ${
                    selectedSize === size ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <Divider className="!mb-2" />
          </div>
        <div className="flex gap-4 items-center mb-4">
          <button 
            className={`w-full py-3 rounded-3xl ${
              !activeVariant || !selectedSize
                ? "bg-gray-600 text-white/80 cursor-not-allowed"
                : "bg-black text-white"
            }`}
            disabled={!activeVariant || !selectedSize}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          {user?.id && (
            <div className="cursor-pointer">
              {isLiked ? (
                <FaHeart
                  className="text-black"
                  size={25}
                  onClick={(event) => handleRemove(event)}
                />
              ) : (
                <RiHeartLine
                  size={25}
                  onClick={(event) => handleLike(event)}
                />
              )}
            </div>
          )}
        </div>
        <p className="text-sm my-4">{product?.description}</p>
        <div className="accordion">
          {["composition", "shipping", "returns"].map((section) => (
            <div 
              key={section} 
              className="mb-2"
              ref={el => accordionRefs.current[section] = el}
            >
              <button
                className="w-full py-3 flex justify-between items-center rounded-md font-semibold"
                onClick={() => toggleAccordion(section)}
              >
                <span className="capitalize">{section}</span>
                {openAccordion === section ? <FiMinus /> : <FiPlus />}
              </button>
              <Divider className="!my-2" />
              {openAccordion === section && (
                <div className="p-4">
                  <p>
                    {section === "composition" && product?.composition}
                    {section === "shipping" && shipping}
                    {section === "returns" && returns}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


