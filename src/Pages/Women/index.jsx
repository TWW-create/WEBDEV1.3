import { Tabs } from "antd"
import ProductsContainer from "../../Components/ProductsContainer";
import { useGetBannersQuery } from "../../redux/slice/bannerApiSlice";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/slice/productApiSlice";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/slice/categoryApiSlice";

const Women = () => {

  const {tab, subCat} = useParams();

  const [defaultKey, setDefaultKey] = useState()
  const [filter, setFilter] = useState({
    size: '',
    sort_by: '',
    creator:  '',
    color: '',
    status: '',
  })

  const { data: bannerData } = useGetBannersQuery();

  const banner = bannerData?.data?.find(banner => banner.location === 'Women' && banner.is_active);

  const { data } = useGetCategoriesQuery();

  const category = data?.data?.find((cat) => cat.name === "women");

  const subCategory = category?.sub_categories?.find((sub) => sub.id === parseInt(subCat)) || []

  const productTypes = subCategory?.product_types || [];

  const { data: products, isLoading } = useGetAllProductsQuery({
    page: 1, 
    // category_id: 1, 
    category_slug: 'women',
    sub_category_id: defaultKey !== 'all' ? subCat : undefined, 
    product_type: defaultKey === 'all' ? undefined : defaultKey,
    size: filter.size,
    sort_by: filter.sort_by,
    creator: filter.creator,
    color: filter.color,
    status: filter.status,
  })

  const items = [
    {
      key: 'all',
      label: `All`,
      children: <ProductsContainer products={products?.data} isLoading={isLoading} setFilter={setFilter} filter={filter} />,
    },
    ...productTypes.map((type) => ({
      key: type.name.toLowerCase(), // Use lowercase for consistency with URL params
      label: <p className='capitalize'>{type.name}</p>,
      children: <ProductsContainer products={products?.data} isLoading={isLoading} setFilter={setFilter} filter={filter} />, // Filtered products could go here based on `type.id`
    })),
  ];
  
  useEffect(() => {
    setDefaultKey(tab || 'all')
  }, [tab])

  return (
    <div>
      <div className="w-full">
        <img src={banner?.image_url} alt="women banner" className="object-cover object-center w-full h-[200px]" />
      </div>
      <div className="container mx-auto px-4">
        <Tabs activeKey={defaultKey} onChange={setDefaultKey} items={items} />
      </div>
    </div>
  )
}

export default Women