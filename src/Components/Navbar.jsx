import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import men1 from '../assets/images/men1.png';
import men2 from '../assets/images/men2.png'
import men3 from '../assets/images/men3.png'
import women1 from '../assets/images/women1.png'
import women2 from '../assets/images/women2.png'
import women3 from '../assets/images/women3.png'


const MegaMenu = ({ categoryName }) => {
    const { data, isLoading } = useGetCategoriesQuery();

    const navigate = useNavigate();
  
    const category = data?.data?.find((cat) => cat.name === categoryName);
  
    const onMenuItemClick = (item) => {
      const clickedSubCategory = category?.sub_categories.find(subCat =>
        subCat.product_types.some(type => type.id === parseInt(item.key))
      );
      
      const clickedType = category?.sub_categories
        .flatMap(subCat => subCat.product_types)
        .find(type => type.id === parseInt(item.key));        
        
      if (clickedType) {
        navigate(`/${categoryName}/${clickedSubCategory.id}/${clickedType.name.toLowerCase()}`);
      }
    };    
    
    if (!category || isLoading || !category.sub_categories) return null;

    const [firstSubCategory, secondSubCategory] = category.sub_categories || [];
    
    return (
      <>
      {categoryName === 'accessories' || categoryName === 'sales' ? 
         <div className="bg-white px-5 py-5 grid grid-cols-7 max-w-6xl gap-8 min-h-[422px]">
         {/* First column: Category image */}
         <div className="flex items-center col-span-1">
             <img src={
                 (categoryName === 'men' && MenB) || (categoryName === 'women' && WomenB) || (categoryName === 'accessories' && AccesoriesB) || (categoryName === 'sales' && SalesB)
             } alt="" className='max-w-[20vh] object-contain' />
         </div>

         {/* Second column: First subcategory */}
         <div className="col-span-1">
             <Menu
                 key={firstSubCategory.id}
                 onClick={onMenuItemClick}
                 selectedKeys={[]}
                 items={[
                     {
                         label: <span className="text-gray-500">{firstSubCategory.name.toUpperCase()}</span>,
                         key: firstSubCategory.id,
                         type: 'group',
                     },
                     ...firstSubCategory.product_types.map((type) => ({
                         label: type.name,
                         key: type.id,
                     })),
                 ]}
                 style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
             />
         </div>

         {/* Third column: First image */}
         <div className="col-span-2">
             <img src={IMAGE} alt="first subcategory" className="w-full h-[350px] object-cover object-center" />
         </div>

         {/* Fourth column: Second subcategory */}
         <div className="col-span-1">
             <Menu
                 key={secondSubCategory.id}
                 onClick={onMenuItemClick}
                 selectedKeys={[]}
                 items={[
                     {
                         label: <span className="text-gray-500">{secondSubCategory.name.toUpperCase()}</span>,
                         key: secondSubCategory.id,
                         type: 'group',
                     },
                     ...secondSubCategory.product_types.map((type) => ({
                         label: type.name,
                         key: type.id,
                     })),
                 ]}
                 style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
             />
         </div>

         {/* Fifth column: Second image */}
         <div className="col-span-2">
             <img src={IMAGE} alt="second subcategory" className="w-full h-[350px] object-cover object-center" />
         </div>
     </div> :
        <div className="bg-white px-5 py-5 grid grid-cols-6 max-w-6xl gap-8 min-h-[422px]">
          <div className="flex items-center col-span-1">
            <img src={
              (categoryName === 'men' && MenB) || (categoryName === 'women' && WomenB) || (categoryName === 'accessories' && AccesoriesB) || (categoryName === 'sales' && SalesB)
            } alt="" className='max-w-[20vh] object-contain' />
          </div>
          <Space direction="horizontal" className="flex items-start col-span-2">
            {category.sub_categories.map((subCategory) => (
              <Menu
                key={subCategory.id}
                onClick={onMenuItemClick}
                selectedKeys={[]}
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
                <img src={(categoryName === 'men' && men1) || (categoryName === 'women' && women1) || IMAGE} alt="best season" className="w-full h-[350px] object-cover object-center" />
              </div>
              {/* Remaining two images */}
              <div className="col-span-3 space-y-4">
                <img src={(categoryName === 'men' && men2) || (categoryName === 'women' && women2) || IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
                <img src={(categoryName === 'men' && men3) || (categoryName === 'women' && women3) || IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
              </div>
            </div>
          </div>
        </div>}
      </>
    );
  };

  
  const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState('');

    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart); 

    const navigate = useNavigate();
    
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


    const handleProfileClick = () => {
      const token = Cookies.get('jwtbara')  
      if (token) {
        if (user.is_admin === 1) {
          navigate("/admin/dashboard");
        }else{
          navigate('/profile');
        }
      } else{
        setOpen(true);
      }

    };

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
                    <ul className="hidden lg:flex space-x-8 font-bold">
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('women')} placement='bottom' >
                                <Link to={'/women'}>Women</Link>
                            </Dropdown>
                        </li>
                        {/* <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('men')} placement='
                            bottom'>
                                <Link to={'/men'}>Men</Link>
                            </Dropdown>
                        </li> */}
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('men')} placement='bottom' >
                                <Link to={'/men'}>Men</Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('accessories')} placement='bottom' >
                                <Link to={'/accessories'}>Accessories</Link>
                            </Dropdown>
                        </li>
                        <li><Dropdown menu={{ items }} trigger={['hover']} onMouseEnter={() => setHoveredCategory('sales')} placement='bottom' ><Link to={'/sales'}>Sales</Link></Dropdown></li>
                        <li><Link to={'/blog'}>Baraworld</Link></li>
                    </ul>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <GoSearch className="text-xl" />
                    <div onClick={() => handleProfileClick()} className='cursor-pointer'><LuUser2 className="text-xl" /></div>
                    {user && <Link to={'/favorites'}><FaRegHeart className="text-xl" /></Link>}
                    <div className="relative">
                        <Link to={'/cart'}>
                            <RiShoppingBag3Line className="text-xl" />
                        </Link>
                        {cart.length > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <Authentication open={open} setOpen={setOpen} />
        </div>
    );
};

MegaMenu.propTypes = {
  categoryName: PropTypes.string
}

export default Navbar;