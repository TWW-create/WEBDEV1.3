import { useParams } from "react-router-dom";
import { useGetBlogPostQuery } from "../../redux/slice/blogApiSlice";
import { Spin } from "antd";
import dayjs from "dayjs";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";
import ProductCard from "../../Components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const BlogDetail = () => {

    const { id } = useParams();
    const productRefs = useRef([]); 
    const containerRef = useRef(null);


    const [canScrollPrev, setCanScrollPrev] = useState(false);
      const [canScrollNext, setCanScrollNext] = useState(true);

    const { data, isLoading } = useGetBlogPostQuery(id);

    const { title, content, media, updated_at, products } = data || {}

    const tolerance = 30;

    const updateArrowStates = () => {
        const container = containerRef.current;
        if (container) {
          const atStart = container.scrollLeft <= tolerance;
          const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - tolerance;
          setCanScrollPrev(!atStart);
          setCanScrollNext(!atEnd);
        }
      };
    
      useEffect(() => {
          const container = containerRef.current;
          updateArrowStates(); // Ensure initial state is set correctly
          if (container) {
            container.addEventListener('scroll', updateArrowStates);
          }
      
          return () => {
            if (container) {
              container.removeEventListener('scroll', updateArrowStates);
            }
          };
        }, []);

    const scrollToNext = () => {
        const firstVisibleIndex = productRefs.current.findIndex(
          (ref) => ref && ref.getBoundingClientRect().left >= 0
        );
        if (firstVisibleIndex !== -1 && firstVisibleIndex < products.length - 1) {
          productRefs.current[firstVisibleIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      };
    
      const scrollToPrevious = () => {
        const firstVisibleIndex = productRefs.current.findIndex(
          (ref) => ref && ref.getBoundingClientRect().left >= 0
        );
        if (firstVisibleIndex !== -1 && firstVisibleIndex > 0) {
          productRefs.current[firstVisibleIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      };
    

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
                    {products.length > 0 && <div className="flex justify-between items-center mb-4">
                        <h2 className="text-center text-lg font-semibold">Products</h2>
                    </div>}
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

export default BlogDetail