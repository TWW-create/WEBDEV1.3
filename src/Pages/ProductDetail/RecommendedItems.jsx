import  { useRef, useState, useEffect } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import ProductCard from "../../Components/ProductCard";
import PropTypes from 'prop-types';


const RecommendedItems = ({products}) => {
  const containerRef = useRef(null);
  const productRefs = useRef([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const tolerance = 30; // Tolerance for scroll position checks

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


  return (
    <section className="mt-16 px-6 lg:px-10 xl:px-20 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center text-lg font-semibold">Recommended Items</h2>
          <div className="hidden md:flex gap-2 items-center">
            <IoIosArrowDropleft
              onClick={scrollToPrevious}
              className={`cursor-pointer ${!canScrollPrev ? 'text-gray-400' : 'text-black'}`}
              size={30}
            />
            <IoIosArrowDropright
              onClick={scrollToNext}
              className={`cursor-pointer ${!canScrollNext ? 'text-gray-400' : 'text-black'}`}
              size={30}
            />
          </div>
        </div>
        <div
          className="overflow-product-scroll px-4 ml-2 md:ml-1 scrollbar-hide"
          ref={containerRef}
        >
          <div className="flex flex-nowrap w-full">
            {products?.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-2 xl:mx-1 h-full"
                ref={(el) => (productRefs.current[index] = el)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


RecommendedItems.propTypes = {
  products: PropTypes.array,
};

export default RecommendedItems;
