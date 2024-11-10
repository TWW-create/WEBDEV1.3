import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/slice/productApiSlice";
import ProductInfo from "./ProductInfo"
import RecommendedItems from "./RecommendedItems"
import { Spin } from "antd";

const ProductDetail = () => {

  const params = useParams();

  const {data, isLoading} = useGetSingleProductQuery(params.id)


  if (isLoading) return <div className='flex justify-center items-center h-[50vh] xl:h-[30vh]'><Spin /></div>;

  
  return (
    <div>
      <ProductInfo product={data?.data?.product}/>
      <RecommendedItems products={data?.data?.related_products} />
    </div>
  )
}

export default ProductDetail