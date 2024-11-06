import { useState } from "react"
import ProductCard from "./ProductCard"
import Filters from "./Filters";
import { IoFilter } from "react-icons/io5";
import NewFilters from "./NewFilters";
import { Spin } from "antd";


const ProductsContainer = ({products, isLoading}) => {
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        category: [],
        color: [],
        price: [0, 550],
        sort: ''
    })


    if (isLoading) return <div className='flex justify-center items-center h-[50vh] xl:h-[30vh]'><Spin /></div>;

    
    return (
        <div className="container mx-auto relative">
          <div className="flex items-center justify-between mb-3 mt-6">
            {/* <p>All</p> */}
            {/* <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                <IoFilter />
                <p>Filters</p>
            </div> */}
          </div>
          <div className="mb-5">
            <NewFilters />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          {products?.length === 0 && <p className="font-medium text-lg text-center">No products found</p>}
          {/* {showFilters && (
            <Filters filters={filters} setFilters={setFilters} setShowFilters={setShowFilters} showFilters={showFilters} />
          )} */}
        </div>
      );
}

export default ProductsContainer