import { Button } from "antd";


const CategoryCard = ({ name, items, image, onClick, btnTxt }) => {
  return (
    <div className="">
      <div className="bg-white p-4 rounded-lg flex justify-between">
        <h3 className="text-lg font-bold capitalize">{name}</h3>
        {/* <p className="text-gray-600">{items} items</p> */}
            <Button className="!text-[#000] flex gap-2 items-center" onClick={onClick}>
                {btnTxt}
            </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
