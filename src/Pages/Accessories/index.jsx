import { Tabs } from "antd"
import ProductsContainer from "../../Components/ProductsContainer";
import shirt1 from '../../assets/images/shirt1.png';
import shirt2 from '../../assets/images/shirt2.png';
import shirt3 from '../../assets/images/shirt3.png';
import shirt4 from '../../assets/images/shirt4.png';
import { useGetBannersQuery } from "../../redux/slice/bannerApiSlice";

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
const Accessories = () => {

    const items = [
        {
          key: '1',
          label: 'All 1',
          children: <ProductsContainer products={products} />,
        },
        {
          key: '2',
          label: 'Essentials 2',
          children: <ProductsContainer products={products} />,
        },
        {
          key: '3',
          label: 'T-Shirts 4',
          children: <ProductsContainer products={products} />,
        },
        {
          key: '4',
          label: 'Swimwear 4',
          children: <ProductsContainer products={products} />,
        },
        {
          key: '5',
          label: 'Hoodies & Sweaters 4',
          children: <ProductsContainer products={products} />,
        },
    ];

    const { data: bannerData } = useGetBannersQuery();

  const banner = bannerData?.data?.find(banner => banner.location === 'Accessories' && banner.is_active);
  return (
    <div>
        <div className="w-full">
            <img src={banner} alt="accessories banner" className="object-cover object-center w-full h-[200px]" />
        </div>
        <div className="container mx-auto px-4">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    </div>
  )
}

export default Accessories