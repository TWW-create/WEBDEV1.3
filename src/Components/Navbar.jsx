import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { LuUser2 } from 'react-icons/lu';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { Dropdown } from 'antd';
import logo from '../assets/images/logo.png';
import Authentication from '../Pages/Authentication';
import { FaRegHeart } from 'react-icons/fa';
import { useGetCategoriesQuery } from '../redux/slice/categoryApiSlice';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import MenMenu from './MenMenu';
import AccessoriesSalesMenu from './AccessoriesSalesMenu';


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
    
    return (
      <>
      {categoryName === 'accessories' || categoryName === 'sales' ? 
          <AccessoriesSalesMenu 
            categoryName={categoryName}
            onMenuItemClick={onMenuItemClick}
            category={category}
          />
        :
        <MenMenu 
          categoryName={categoryName}
          onMenuItemClick={onMenuItemClick}
          category={category}
        />
      }
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