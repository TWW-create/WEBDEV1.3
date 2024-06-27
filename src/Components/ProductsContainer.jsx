import { useState } from "react"
import ProductCard from "./ProductCard"
import Filters from "./Filters";
import { IoFilter } from "react-icons/io5";


const ProductsContainer = ({products}) => {
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        category: [],
        color: [],
        price: [0, 550],
        sort: ''
    })

    
    return (
        <div className="container mx-auto relative">
          <div className="flex items-center justify-between mb-3 mt-12">
            <p>All</p>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                <IoFilter />
                <p>Filters</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          {showFilters && (
            <Filters filters={filters} setFilters={setFilters} setShowFilters={setShowFilters} showFilters={showFilters} />
          )}
        </div>
      );
}

export default ProductsContainer