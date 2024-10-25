import { Spin } from 'antd';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../redux/slice/categoryApiSlice';


const Categories = () => {

  const {data, isLoading} = useGetCategoriesQuery()

  const navigate = useNavigate();

  if (isLoading) {
    return(
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size='large' />
      </div>
    )
  }
    
    
    return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold ">Categories</h2>
        </div>
        {
            data?.data?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.map((category, index) => (
                    <CategoryCard
                    key={index}
                    name={category.name}
                    items={category.items}
                    image={category.logo_url}
                    onClick={() => navigate(`/admin/categories/${category.id}`)}
                    btnTxt={'View Category'}
                    />
                ))}
                </div> :
            <div className="text-gray-500 text-center w-full py-10">
            You have no blog items to display
          </div>
        }
    </div>
)};

export default Categories;
