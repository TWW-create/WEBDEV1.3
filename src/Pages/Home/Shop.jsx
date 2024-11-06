// import { Button } from 'antd';
// // import shopm from '../../assets/images/shopm.png';
// // import shopw from '../../assets/images/shopw.png';
// import { useGetBannersQuery } from '../../redux/slice/bannerApiSlice';

// const Shop = () => {

//   const {data, isLoading} = useGetBannersQuery()

//   const homeBanner = data?.data?.filter(banner => banner.location === 'Home/Men' && banner.is_active)[0];
//   const womenBanner = data?.data?.filter(banner => banner.location === 'Home/Women' && banner.is_active)[0];

//   // if (isLoading || !homeBanner) {
//   //   return (
//   //     <section className="flex justify-center items-center h-screen">
//   //     </section>
//   //   );
//   // }
//   return (
//     <div className='flex flex-col md:flex-row items-center gap-2 mt-2'>
//         <div className="md:w-[50%] flex-1 shrink-0 relative">
//             <img src={homeBanner} alt="Shop Men" className='w-full object-cover object-center relative' />
//             {/* <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 text-white rounded-xl px-5 py-1 flex items-center justify-center">
//               <p className='font-bold text-sm'>Men</p>
//             </div> */}
//             <div className="absolute inset-0 flex items-start mt-9 justify-center">
//                 <div className="bg-white/30 text-white rounded-xl px-5 py-1">
//                     <p className='font-bold text-sm'>Men</p>
//                 </div>
//                 <div className="absolute inset-0 flex items-end mb-9 justify-center">
//                   <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
//               </div>
//             </div>
//         </div>
//         <div className="md:w-[50%] flex-1 shrink-0 relative">
//             <img src={womenBanner} alt="Shop Men" className='w-full object-cover object-center' />
//             {/* <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 text-white rounded-xl px-5 py-1 flex items-center justify-center">
//               <p className='font-bold text-sm'>Women</p>
//             </div> */}
//             <div className="absolute inset-0 flex items-start mt-9 justify-center">
//                 <div className="bg-white/30 text-white rounded-xl px-5 py-1">
//                     <p className='font-bold text-sm'>Women</p>
//                 </div>
//             </div>
//             <div className="absolute inset-0 flex items-end mb-9 justify-center">
//                 <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Shop
import { Button } from 'antd';
import { useGetBannersQuery } from '../../redux/slice/bannerApiSlice';

const Shop = () => {
  const { data, isLoading } = useGetBannersQuery();

  // Filter active banners based on location
  const homeBanner = data?.data?.find(banner => banner.location === 'Home/Men' && banner.is_active);
  const womenBanner = data?.data?.find(banner => banner.location === 'Home/Women' && banner.is_active);

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
      
      {/* Men Banner Section */}
      <div className="md:w-[50%] flex-1 shrink-0 relative">
        {isLoading || !homeBanner ? (
          // Display an empty div if loading or no banner image
          <div className="w-full h-[600px] bg-gray-100"></div>
        ) : (
          <img src={homeBanner.image_url} alt="Shop Men" className="w-full h-[600px] object-cover object-center" />
        )}
        {/* Banner Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between">
          <div className="mt-9 bg-white/30 text-white rounded-xl px-5 py-1">
            <p className="font-bold text-sm">Men</p>
          </div>
          <div className="mb-9">
            <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
          </div>
        </div>
      </div>

      {/* Women Banner Section */}
      <div className="md:w-[50%] flex-1 shrink-0 relative">
        {isLoading || !womenBanner ? (
          // Display an empty div if loading or no banner image
          <div className="w-full h-[600px] bg-gray-100"></div>
        ) : (
          <img src={womenBanner.image_url} alt="Shop Women" className="w-full h-[600px] object-cover object-center" />
        )}
        {/* Banner Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between">
          <div className="mt-9 bg-white/30 text-white rounded-xl px-5 py-1">
            <p className="font-bold text-sm">Women</p>
          </div>
          <div className="mb-9">
            <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Shop;
