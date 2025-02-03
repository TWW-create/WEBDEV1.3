import { Spin } from "antd";
import ProductCard from "../../Components/ProductCard"
import dayjs from "dayjs";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetCreatorQuery } from "../../redux/slice/blogApiSlice";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";

const CreatorDetail = () => {

    const { slug } = useParams();
    // const productRefs = useRef([]); 
    // const containerRef = useRef(null);

    const { data, isLoading } = useGetCreatorQuery(slug);
    
    const { title, content, media, updated_at, products } = data || {}

    if (isLoading) return <div className='flex justify-center items-center h-[50vh] xl:h-[30vh]'><Spin /></div>;

  return (
    <div className=" pt-28">
            <div className="bg-white mb-6 max-w-sm md:max-w-lg w-[512px] shadow-lg rounded-lg mx-auto">
                <div className="flex flex-col">
                    <div className="p-10 text-center">
                        <h2 className="text-lg font-medium mb-2 uppercase">{title}</h2>
                        <p className="text-xs">{dayjs(updated_at).format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="w-[90%] mx-auto flex flex-col items-center gap-6">
                        {
                            media.length > 0 &&
                            media.map((item, index) => (
                                <img key={index} src={IMAGE_BASE_URL + "/" + item?.file_path} alt={title} className="w-[100%] h-full object-cover object-center" />
                            ))
                        }
                    </div>
                    <div className="flex-1">
                        <p className="text-sm mb-8 p-7">
                            <span dangerouslySetInnerHTML={{ __html: content }} />
                        </p>
                    </div>
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-center text-lg font-semibold">Products</h2>
                        </div>
                        <div
                            className="overflow-product-scroll px-4 ml-2 md:ml-1 scrollbar-hide"
                        >
                            <div className="flex flex-wrap w-full gap-1">
                            {products?.map((product, index) => (
                                <div
                                key={index}
                                className="flex-shrink-0 w-full md:w-[47%]  mx-2 xl:mx-1"
                                // ref={(el) => (productRefs.current[index] = el)}
                                >
                                <ProductCard product={product} />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CreatorDetail