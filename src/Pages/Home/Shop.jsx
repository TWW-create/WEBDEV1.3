import { Button } from 'antd';
import { useGetBannersQuery } from '../../redux/slice/bannerApiSlice';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const { data, isLoading } = useGetBannersQuery();
  const navigate = useNavigate();

  // Filter active banners based on location
  const homeBanner = data?.data?.find(banner => banner.location === 'Home/Men' && banner.is_active);
  const womenBanner = data?.data?.find(banner => banner.location === 'Home/Women' && banner.is_active);

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-2 mt-2">
      {/* Men Banner Section */}
      <div className="md:w-[50%] flex-1 shrink-0 relative overflow-hidden">
        {isLoading || !homeBanner ? (
          // Display an empty div if loading or no banner image
          <div className="w-full h-[600px] bg-gray-100"></div>
        ) : (
          <img 
            src={homeBanner.image_url} 
            alt="Shop Men" 
            className="w-full h-[600px] object-cover object-center transition-transform duration-300 hover:scale-110"
          />
        )}
        {/* Banner Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between z-10">
          <div className="mt-9 bg-white/30 text-white rounded-xl px-5 py-1">
            <p className="font-bold text-sm">Men</p>
          </div>
          <div className="mb-9">
            <Button 
              className="bg-white text-black px-5 py-6 font-medium" 
              onClick={() => navigate('/men')}
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>

      {/* Women Banner Section */}
      <div className="md:w-[50%] flex-1 shrink-0 relative overflow-hidden">
        {isLoading || !womenBanner ? (
          // Display an empty div if loading or no banner image
          <div className="w-full h-[600px] bg-gray-100"></div>
        ) : (
          <img 
            src={womenBanner.image_url} 
            alt="Shop Women" 
            className="w-full h-[600px] object-cover object-center transition-transform duration-300 hover:scale-110"
          />
        )}
        {/* Banner Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between z-10">
          <div className="mt-9 bg-white/30 text-white rounded-xl px-5 py-1">
            <p className="font-bold text-sm">Women</p>
          </div>
          <div className="mb-9">
            <Button 
              className="bg-white text-black px-5 py-6 font-medium" 
              onClick={() => navigate('/women')}
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;