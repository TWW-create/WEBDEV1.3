
import { useGetBannersQuery } from '../../redux/slice/bannerApiSlice';

const Hero = () => {

  const {data, isLoading} = useGetBannersQuery()

  const homeBanner = data?.data?.filter(banner => banner.location === 'Home' && banner.is_active)[0];

  if (isLoading || !homeBanner) {
    return (
      <section className="flex justify-center items-center h-screen">
      </section>
    );
  }

  return (
    <section className="relative">
      <img src={homeBanner?.image_url} alt="Hero" className="w-full h-screen object-cover" />
    </section>
  );
};

export default Hero;
