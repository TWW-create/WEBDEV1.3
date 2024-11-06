import { Tabs } from "antd"
import { useGetBannersQuery } from "../../redux/slice/bannerApiSlice";
import ProductsContainer from "../../Components/ProductsContainer";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/slice/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/slice/categoryApiSlice";
import { useParams } from "react-router-dom";

const Sales = () => {

  const {tab, subCat} = useParams();

  const [defaultKey, setDefaultKey] = useState()

    const { data: bannerData } = useGetBannersQuery();

    const banner = bannerData?.data?.find(banner => banner.location === 'Sales' && banner.is_active);

    const { data } = useGetCategoriesQuery();

  const category = data?.data?.find((cat) => cat.name === "accessories");

  const subCategory = category?.sub_categories?.find((sub) => sub.id === parseInt(subCat)) || []

  const productTypes = subCategory?.product_types || [];

  const { data: products, isLoading } = useGetAllProductsQuery({
    page: 1, 
    category_id: 4, 
    sub_category_id: defaultKey !== 'all' ? subCat : undefined, 
    product_type: defaultKey === 'all' ? undefined : defaultKey
  })

  const items = [
    {
      key: 'all',
      label: `All`,
      children: <ProductsContainer products={products?.data} isLoading={isLoading} />,
    },
    ...productTypes.map((type) => ({
      key: type.name.toLowerCase(), // Use lowercase for consistency with URL params
      label: <p className='capitalize'>{type.name}</p>,
      children: <ProductsContainer products={products?.data} isLoading={isLoading} />, // Filtered products could go here based on `type.id`
    })),
  ];
  
  useEffect(() => {
    setDefaultKey(tab || 'all')
  }, [tab])
  return (
    <div>
        <div className="w-full">
            <img src={banner} alt="sales banner" className="object-cover object-center w-full h-[200px]" />
        </div>
        <div className="container mx-auto px-4">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    </div>
  )
}

export default Sales