import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CategoryInfoHeader = ({ category, addDiscount, addCoupon, handleEdit, clickCategoryProducts, handleDelete }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between p-4 bg-white shadow rounded-md">
      <div className="flex items-center">
        <img src={category.logo_url} alt={category.name} className="w-32 h-32 object-cover rounded-md" />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold flex-wrap">{category.name}</h2>
          <p className="text-gray-500 flex-wrap">{category.description}</p>
          <div className="flex items-center my-2">
            <span>{category.total_product} Products</span>
            <span className="ml-4 text-yellow-500">{category.ratings} ⭐</span>
          </div>
          <Button className='!text-[#1E5EFF] px-2' onClick={clickCategoryProducts}>View category Products</Button>
        </div>
      </div>
      <div className="flex flex-col justify-between ">
        <div className="flex items-center space-x-2 mb-2">
            <Button icon={<EditOutlined />} className='!text-[#1E5EFF] p-2' onClick={handleEdit} />
            <Button icon={<DeleteOutlined />} className='!text-[#1E5EFF] p-2' onClick={handleDelete}  />
            </div>
        <div className="flex items-center space-x-2">
            <Button type="primary" onClick={addCoupon}>+ Add Coupon</Button>
            <Button type="primary" onClick={addDiscount}>+ Add Discount</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoHeader;
