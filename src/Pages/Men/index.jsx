import { Tabs } from 'antd'
// import banner from '../../assets/images/menb.png'
import ProductsContainer from '../../Components/ProductsContainer'
import shirt1 from '../../assets/images/shirt1.png';
import shirt2 from '../../assets/images/shirt2.png';
import shirt3 from '../../assets/images/shirt3.png';
import shirt4 from '../../assets/images/shirt4.png';
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../redux/slice/categoryApiSlice';
import { useGetBannersQuery } from '../../redux/slice/bannerApiSlice';

const products = [
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Orange Identity T-Shirt',
    image: shirt2,
    price: '€84.95',
    label: 'New',
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Red Identity T-Shirt',
    image: shirt4,
    price: '€59.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
  },
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Orange Identity T-Shirt',
    image: shirt2,
    price: '€84.95',
    label: 'New',
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Red Identity T-Shirt',
    image: shirt4,
    price: '€59.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
  },
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Orange Identity T-Shirt',
    image: shirt2,
    price: '€84.95',
    label: 'New',
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Red Identity T-Shirt',
    image: shirt4,
    price: '€59.95',
    label: 'New',
    isLiked: true,
  },
  {
    name: 'Black Identity T-Shirt',
    image: shirt1,
    price: '€84.95',
    label: 'Online Exclusive',
    isLiked: true,
  },
  {
    name: 'Pink Identity T-Shirt',
    image: shirt3,
    price: '€84.95',
    label: 'New',
  },
];
const Men = () => {

  const items = [
    {
      key: 'all',
      label: 'All 1',
      children: <ProductsContainer products={products} />,
    },
    {
      key: 'essential',
      label: 'Essentials 2',
      children: <ProductsContainer products={products} />,
    },
    {
      key: 't-shirt',
      label: 'T-Shirts 4',
      children: <ProductsContainer products={products} />,
    },
    {
      key: 'swimwear',
      label: 'Swimwear 4',
      children: <ProductsContainer products={products} />,
    },
    {
      key: 'hoodies',
      label: 'Hoodies & Sweaters 4',
      children: <ProductsContainer products={products} />,
    },
  ];

  const { data, isLoading } = useGetCategoriesQuery();

  const { data: bannerData } = useGetBannersQuery();

  const banner = bannerData?.data?.find(banner => banner.location === 'Men' && banner.is_active);
  
  const category = data?.data?.find((cat) => cat.name === "men");

    console.log(category);
    
  const params = useParams();

  console.log(params);
  

    
  return (
    <div>
      <div className="w-full">
        <img src={banner} alt="men banner" className="object-cover object-center w-full h-[200px]" />
      </div>
      <div className="container mx-auto px-4">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}

export default Men