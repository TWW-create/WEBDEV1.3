import { Divider, message } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";


const ProductInfo = ({product, shipping, returns}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  console.log(cart);
  


  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return; // Ensure the necessary selections are made
    }
  
    dispatch(
      addToCart({
        id: product?.id,
        name: product.name,
        price: product.price,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        quantity: 1,
        image: product?.images?.[selectedImageIndex]?.image_path,
      })
    );
    message.success(`${product?.name} added to cart successfully!`);
  };
  
  

  const toggleAccordion = (section) => {
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };


  return (
    <div className="px-6 lg:px-10 xl:px-20 pt-12 flex gap-9 flex-col lg:flex-row lg:h-[90vh]">
      <div className="w-full flex-grow">
        <div className="flex flex-col gap-4 mb-3 md:mb-0">
          {product?.images && (
            <img
              src={IMAGE_BASE_URL + "/" + product?.images[selectedImageIndex]?.image_path}
              alt="/"
              className="w-full h-[calc(80vh-80px)] object-contain bg-[#eeeeee] object-center rounded-md"
            />
          )}
          <div className="flex gap-5">
            {product?.images?.map((image, index) => (
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
        <div className="mb-4 flex justify-between items-center">
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
        </div>
        <Divider />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-4">Size</label>
          <div className="flex gap-2">
            {product?.sizes.map((size) => (
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
          {/* <p className="text-sm text-gray-500 mt-2">Model is wearing a size Medium</p> */}
        </div>
        <button 
          className={`w-full py-3 rounded-3xl mb-4 ${
            !selectedColor || !selectedSize
              ? "bg-gray-600 text-white/80 cursor-not-allowed"
              : "bg-black text-white"
          }`}
          disabled={!selectedColor || !selectedSize}
          onClick={handleAddToCart}
        >Add to cart</button>
        {/* <button className="w-full py-3 border rounded-md font-semibold">Size Chart</button> */}
        <p className="text-sm my-4">
          {product?.description}
        </p>
        <div className="accordion">
          {["composition", "shipping", "returns"].map((section) => (
            <div key={section} className="mb-2">
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

ProductInfo.propTypes = {
  product: PropTypes.object, 
}

export default ProductInfo;
