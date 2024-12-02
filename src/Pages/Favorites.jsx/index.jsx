import ProductCard from "../../Components/ProductCard";
import { useGetUserFavoritesQuery } from "../../redux/slice/profileApiSlice";
import EmptyFavorites from "./EmptyFavorites"

const Favorites = () => {

  const { data, isLoading } = useGetUserFavoritesQuery();

  return (
    <div>
      {data?.data?.length > 0 ? 
        <div className="container mx-auto px-4">
          <p className="text-2xl font-semibold pt-5">Your Favorite Bara Items</p>
          <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.map((product, index) => (
              <ProductCard key={index} product={product?.product} />
            ))}
          </div>
          </div>
        </div> :
        <EmptyFavorites />
      }
    </div>
  )
}

export default Favorites