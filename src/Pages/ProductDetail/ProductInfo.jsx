import { Divider } from "antd";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [openAccordion, setOpenAccordion] = useState(null);

  const images = [
    "https://via.placeholder.com/1000x1000",
    "https://via.placeholder.com/1000x1000",
    "https://via.placeholder.com/1000x1000",
    "https://via.placeholder.com/1000x1000",
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Blue"];

  const toggleAccordion = (section) => {
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };

  return (
    <div className="px-10 xl:px-20 pt-12 flex gap-9 flex-col lg:flex-row h-[90vh]">
      <div className="w-full flex-grow">
        <div className="flex flex-col gap-4 mb-3 md:mb-0">
          {images && (
            <img
              src={images[selectedImageIndex]}
              alt="/"
              className="w-full h-[calc(80vh-80px)] object-cover object-center rounded-md"
            />
          )}
          <div className="flex gap-5">
            {images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="/"
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-solid border-primary/70 ${
                  selectedImageIndex === index && "border-2 border-solid !border-black p-1"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[300px] xl:w-[500px] shrink-0 mt-10 lg:mt-0 overflow-y-scroll scrollbar-hide">
        <h1 className="text-2xl font-bold mb-2">Product Title</h1>
        <p className="text-xl text-gray-700 mb-4">$99.99</p>
        <div className="mb-4 flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Color:</label>
            <div className="flex gap-2 items-center">
                {colors.map((color, index) => (
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
            {sizes.map((size) => (
              <div
                key={size}
                className={`flex justify-center items-center border h-10 w-10 p-4 rounded-full cursor-pointer ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
          <Divider className="!mb-2" />
          <p className="text-sm text-gray-500 mt-2">Model is wearing a size Medium</p>
        </div>
        <button className="w-full py-3 bg-black text-white rounded-3xl mb-4">Add to cart</button>
        <button className="w-full py-3 border rounded-md font-semibold">Size Chart</button>
        <p className="text-sm my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum, purus a volutpat dapibus, metus lorem venenatis justo, vel tincidunt turpis libero non enim.
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
                  <p>{`${section.charAt(0).toUpperCase() + section.slice(1)} details go here. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel omnis dignissimos ipsum eius voluptas accusantium, debitis illum nihil soluta. Nemo aliquam optio fugiat ratione unde necessitatibus minus voluptate doloremque ullam? Vel omnis dignissimos ipsum eius voluptas accusantium, debitis illum nihil soluta. Nemo aliquam optio fugiat ratione unde necessitatibus minus voluptate doloremque ullam? `}</p>
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
