import SingleHeader from "../components/SingleHeader"
import { useNavigate, useParams } from "react-router-dom";
import { Spin} from "antd";
import CategoryCard from "./CategoryCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import AddSubCat from "./AddSubCat";
import { useGetCategoryDetailsQuery } from "../../../redux/slice/categoryApiSlice";


  const CategoryInfo = () => {
    const [visible, setVisible] = useState(false)
    
    const params = useParams()
    
    const {data, isLoading} = useGetCategoryDetailsQuery(params.id)
    
    
    const navigate= useNavigate()
    
    if (isLoading) {
      return(
        <div className="flex justify-center items-center h-[70vh]">
          <Spin size='large' />
        </div>
      )
    }
  return (
    <div>
        <SingleHeader header={data?.data?.name} />
        <div className="mt-10">
            <p className="text-xl font-bold">Sub Categories</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                {data?.data?.sub_categories?.map((category, index) => (
                    <CategoryCard
                    key={index}
                    name={category.name}
                    // items={category.items}
                    onClick={() => navigate(`/admin/subcategories/${category.id}`)}
                    btnTxt={'View Sub Category'}
                    />
                ))}
                <div className="bg-white flex justify-center items-center text-[#5A607F] py-3 gap-3 border border-dashed border-[#A1A7C4] cursor-pointer rounded-md hover:text-[#000]/80 hover:border-[#000]/80" onClick={() => setVisible(true)} >
                    <AiOutlinePlus size={25} />
                    <p>Add Sub Category</p>
                </div>
            </div>
        </div>
        <AddSubCat
            visible={visible}
            // onCreate={onCreate}
            onCancel={() => {
            setVisible(false);
            }}
            category={data}
        />
    </div>
  )
}

export default CategoryInfo