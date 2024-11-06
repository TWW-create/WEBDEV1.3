import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { LuUser2 } from 'react-icons/lu';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { Dropdown, Menu, Space } from 'antd';
import logo from '../assets/images/logo.png';
import Authentication from '../Pages/Authentication';
import IMAGE from '../assets/images/shopm.png'
import { FaRegHeart } from 'react-icons/fa';
import { useGetCategoriesQuery } from '../redux/slice/categoryApiSlice';
import MenB from "../assets/images/men.png";
import WomenB from "../assets/images/women.png";
import AccesoriesB from "../assets/images/accessories.png";
import SalesB from "../assets/images/sales.png";


// const MegaMenu = () => {
//     const [selectedKey, setSelectedKey] = useState()

//   const {data, isLoading} = useGetCategoriesQuery()

//   console.log(data);
  

//     const onMenuItemClick = (item) => {
//         setSelectedKey([item.key])
//     }
//     return (
//         <div className='bg-white px-5 py-5 grid grid-cols-6 max-w-6xl gap-8'>
//             {/* <div className='space-x-8 flex'> */}
//                 <div className="inline-block  h-full col-span-1">
//                     <div className='h-full border-r-2 font-bold flex justify-end items-end text-end text-5xl border-black pr-1'>
//                         <div className="-rotate-90 pb-12">
//                             <p>Men</p>
//                         </div>
//                     </div>
//                 </div>
//                 <Space direction='horizontal' className='flex items-start col-span-2'>
//                     <Menu 
//                     onClick={onMenuItemClick}
//                     selectedKeys={selectedKey}
//                     items={[
//                         {
//                             label: 'READY TO WEAR',
//                             key: 'readyToWear',
//                             type: 'group'
//                         },
//                         {
//                             label: 'All',
//                             key: 'all',
//                         },
//                         {
//                             label: 'New in',
//                             key: 'new',
//                         },
//                         {
//                             label: 'Dungarees',
//                             key: 'dungarees',
//                         },
//                         {
//                             label: 'Shorts',
//                             key: 'shorts',
//                         },
//                         {
//                             label: 'Shirts',
//                             key: 'shirts',
//                         },
//                         {
//                             label: 'Tops',
//                             key: 'tops',
//                         },
//                         {
//                             label: 'Pants',
//                             key: 'pants',
//                         },
//                         {
//                             label: 'Hoodies',
//                             key: 'hoodies',
//                         },
//                         {
//                             label: 'Jackets',
//                             key: 'jackets',
//                         },
//                     ]}
//                     style={{ boxShadow: 'none', border: 'none' }}
//                     />
//                     <Menu 
//                     onClick={onMenuItemClick}
//                     selectedKeys={selectedKey}
//                     items={[
//                         {
//                             label: 'READY TO WEAR',
//                             key: 'readyToWear1',
//                             type: 'group'
//                         },
//                         {
//                             label: 'All',
//                             key: 'all1',
//                         },
//                         {
//                             label: 'New in',
//                             key: 'new1',
//                         },
//                         {
//                             label: 'Dungarees',
//                             key: 'dungarees1',
//                         },
//                         {
//                             label: 'Shorts',
//                             key: 'shorts1',
//                         },
//                         {
//                             label: 'Shirts',
//                             key: 'shirts1',
//                         },
//                     ]} 
//                     style={{ boxShadow: 'none', border: 'none' }}
//                     />
//                 </Space>
//                 <div className='h-[350px] max-w-xl col-span-3'>
//                     <p className='text-center mb-4'>Best of Seasons</p>
//                     <div className="grid grid-cols-5 gap-5 h-full">
//                         {/* First image container */}
//                         <div className='w-full h-[350px] col-span-2'>
//                             <img src={IMAGE} alt="male" className='w-full h-[350px] object-cover object-center' />
//                         </div>
//                         {/* The remaining two images */}
//                         <div className='col-span-3 space-y-4'>
//                             <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' />
//                             <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' /> 
//                         </div>
//                     </div>
//                 </div>
//             {/* </div> */}
//         </div>
//     )
// }

// const MegaMenu = ({categoryName}) => {
//     const [selectedKey, setSelectedKey] = useState();
//     const { data, isLoading } = useGetCategoriesQuery();
    
  
//     // Assuming the 'men' category is at index 0 in `data`.
//     const menCategory = data?.data?.find(category => category.name === categoryName);
  
//     const onMenuItemClick = (item) => {
//       setSelectedKey([item.key]);
//     };
  
//     if (!menCategory || isLoading) return null;
  
//     return (
//       <div className='bg-white px-5 py-5 grid grid-cols-6 max-w-6xl gap-8 min-h-[450px]'>
//         {/* Displaying the main category label */}
//         {/* <div className="inline-block h-full col-span-1">
//           <div className='h-full border-r-2 font-bold flex justify-end items-end text-end text-4xl border-black pr-1'>
//             <div className="-rotate-90 pb-12 capitalize">
//               <p>{categoryName}</p>
//             </div>
//           </div>
//         </div> */}
  
//         {/* Displaying subcategories and their product types */}
//         <Space direction='horizontal' className='flex items-start col-span-2 cap'>
//           {menCategory.sub_categories.map(subCategory => (
//             <Menu
//               key={subCategory.id}
//               onClick={onMenuItemClick}
//               selectedKeys={selectedKey}
//               items={[
//                 {
//                   label: subCategory.name.toUpperCase(),
//                   key: subCategory.id,
//                   type: 'group'
//                 },
//                 ...subCategory.product_types.map(type => ({
//                   label: type.name,
//                   key: type.id,
//                 }))
//               ]}
//               style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
//             />
//           ))}
//         </Space>
  
//         {/* Sample image content */}
//         <div className='h-[350px] max-w-xl col-span-3'>
//           <p className='text-center mb-4'>Best of Seasons</p>
//           <div className="grid grid-cols-5 gap-5 h-full">
//             {/* First image container */}
//             <div className='w-full h-[350px] col-span-2'>
//               <img src={IMAGE} alt="male" className='w-full h-[350px] object-cover object-center' />
//             </div>
//             {/* Remaining two images */}
//             <div className='col-span-3 space-y-4'>
//               <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' />
//               <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

const MegaMenu = ({ categoryName }) => {
    const [selectedKey, setSelectedKey] = useState();
    const { data, isLoading } = useGetCategoriesQuery();
  
    // Finding the category based on the dynamic `categoryName`
    const category = data?.data?.find((cat) => cat.name === categoryName);
  
    const onMenuItemClick = (item) => {
      setSelectedKey([item.key]);
    };
  
    if (!category || isLoading) return null;
  
    return (
      <div className="bg-white px-5 py-5 grid grid-cols-6 max-w-6xl gap-8 min-h-[422px]">
        {/* Displaying the main category label with vertical rotation */}
        <div className="flex items-center col-span-1">
          <img src={
            (categoryName === 'men' && MenB) || (categoryName === 'women' && WomenB) || (categoryName === 'accessories' && AccesoriesB) || (categoryName === 'sales' && SalesB)
          } alt="" />
        </div>
  
        {/* Displaying subcategories and their product types */}
        <Space direction="horizontal" className="flex items-start col-span-2">
          {category.sub_categories.map((subCategory) => (
            <Menu
              key={subCategory.id}
              onClick={onMenuItemClick}
              selectedKeys={selectedKey}
              items={[
                {
                  label: <span className="text-gray-500">{subCategory.name.toUpperCase()}</span>,
                  key: subCategory.id,
                  type: 'group',
                },
                ...subCategory.product_types.map((type) => ({
                  label: type.name,
                  key: type.id,
                })),
              ]}
              style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
            />
          ))}
        </Space>
  
        {/* Sample image content */}
        <div className="h-[350px] max-w-xl col-span-3">
          <p className="text-center mb-4 text-gray-600">Best of Seasons</p>
          <div className="grid grid-cols-5 gap-5 h-full">
            {/* First image container */}
            <div className="w-full h-[350px] col-span-2">
              <img src={IMAGE} alt="best season" className="w-full h-[350px] object-cover object-center" />
            </div>
            {/* Remaining two images */}
            <div className="col-span-3 space-y-4">
              <img src={IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
              <img src={IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState('');
    
    const items = [
        {
          key: '1',
          label: <MegaMenu categoryName={hoveredCategory} />,
          style: {
            height: 'fit-content',
            padding: '0px',
            backgroundColor: 'white',
            boxShadow: 'none',
          }
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 41;
            setScrolled(isScrolled);
        };
        
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className=''>
            <nav className={`flex justify-between items-center py-5 px-12 top-0 ${scrolled ? 'fixed bg-white shadow-md bg-opacity-100 w-full z-50' : 'static'}`}>
                <div className="flex gap-10 items-center">
                    <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
                    <ul className="hidden lg:flex space-x-8 text-sm font-bold">
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('women')} >
                                <Link to={'/women/all'}>Women</Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('men')} >
                                <Link to={'/men/all'}>Men</Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('accessories')} >
                                <Link to={'/accessories/all'}>Accessories</Link>
                            </Dropdown>
                        </li>
                        <li><Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('sales')} ><Link to={'/sales'}>Sales</Link></Dropdown></li>
                        <li><Link to={'/blog'}>Blog</Link></li>
                    </ul>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <GoSearch />
                    <div onClick={() => setOpen(true)} className='cursor-pointer'><LuUser2 /></div>
                    <FaRegHeart />
                    <Link to={'/cart'}><RiShoppingBag3Line /></Link>
                </div>
            </nav>
            <Authentication open={open} setOpen={setOpen} />
        </div>
    );
};

export default Navbar;