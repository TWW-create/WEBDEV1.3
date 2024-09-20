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

// const menItems = [
//     {
//         title: 'Tops',
//         parent: 'men',
//         links: [
//             { text: 'All tops', href: 'all-tops' },
//             { text: 'T-Shirts', href: 't-shirts' },
//             { text: 'Hoodies & Sweaters', href: 'hoodies-sweaters' },
//             { text: 'Jackets', href: 'jackets' },
//             { text: 'Knitwear', href: 'knitwear' },
//             { text: 'Longsleeves', href: 'longsleeves' },
//             { text: 'Shirts', href: 'shirts' }
//         ]
//     },
//     {
//         title: 'Bottoms',
//         parent: 'men',
//         links: [
//             { text: 'All bottoms', href: 'all-bottoms' },
//             { text: 'Pants', href: 'pants' },
//             { text: 'Jeans', href: 'jeans' },
//             { text: 'Sweatpants', href: 'sweatpants' },
//             { text: 'Shorts', href: 'shorts' },
//             { text: 'Swimwear', href: 'swimwear' }
//         ]
//     }
// ];

// const womenItems = [
//     {
//         title: 'Tops',
//         parent: 'women',
//         links: [
//             { text: 'All tops', href: 'all-tops-women' },
//             { text: 'T-Shirts', href: 't-shirts-women' },
//             { text: 'Hoodies & Sweaters', href: 'hoodies-sweaters-women' },
//             { text: 'Jackets', href: 'jackets-women' },
//             { text: 'Knitwear', href: 'knitwear-women' },
//             { text: 'Longsleeves', href: 'longsleeves-women' },
//             { text: 'Shirts', href: 'shirts-women' }
//         ]
//     },
//     {
//         title: 'Bottoms',
//         parent: 'women',
//         links: [
//             { text: 'All bottoms', href: 'all-bottoms-women' },
//             { text: 'Pants', href: 'pants-women' },
//             { text: 'Jeans', href: 'jeans-women' },
//             { text: 'Sweatpants', href: 'sweatpants-women' },
//             { text: 'Shorts', href: 'shorts-women' },
//             { text: 'Skirts', href: 'skirts-women' }
//         ]
//     }
// ];

// const accessoriesItems = [
//     {
//         parent: 'accessories',
//         title: 'Accessories',
//         links: [
//             { text: 'Bags', href: 'bags' },
//             { text: 'Watches', href: 'watches' },
//             { text: 'Belts', href: 'belts' },
//             { text: 'Hats', href: 'hats' },
//             { text: 'Scarves', href: 'scarves' },
//             { text: 'Sunglasses', href: 'sunglasses' }
//         ]
//     }
// ];

// const generateMenu = (items) => (
//     <Menu>
//         {items.map((item) => (
//             <Menu.SubMenu key={item.title} title={item.title}>
//                 {item.links.map((link) => (
//                     <Menu.Item key={link.href}>
//                         <Link to={`/${item.parent}/${link.href}`}>{link.text}</Link>
//                     </Menu.Item>
//                 ))}
//             </Menu.SubMenu>
//         ))}
//     </Menu>
// );

const MegaMenu = () => {
    const [selectedKey, setSelectedKey] = useState()

    const onMenuItemClick = (item) => {
        setSelectedKey([item.key])
    }
    return (
        <div className='bg-white px-5 py-5 grid grid-cols-6 max-w-5xl gap-8'>
            {/* <div className='space-x-8 flex'> */}
                <div className="inline-block  h-full col-span-1">
                    <div className='h-full border-r-2 font-bold flex justify-end items-end text-end text-5xl border-black pr-1'>
                        <div className="-rotate-90 pb-12">
                            <p>Men</p>
                        </div>
                    </div>
                </div>
                <Space direction='horizontal' className='flex items-start col-span-2'>
                    <Menu 
                    onClick={onMenuItemClick}
                    selectedKeys={selectedKey}
                    items={[
                        {
                            label: 'READY TO WEAR',
                            key: 'readyToWear',
                            type: 'group'
                        },
                        {
                            label: 'All',
                            key: 'all',
                        },
                        {
                            label: 'New in',
                            key: 'new',
                        },
                        {
                            label: 'Dungarees',
                            key: 'dungarees',
                        },
                        {
                            label: 'Shorts',
                            key: 'shorts',
                        },
                        {
                            label: 'Shirts',
                            key: 'shirts',
                        },
                        {
                            label: 'Tops',
                            key: 'tops',
                        },
                        {
                            label: 'Pants',
                            key: 'pants',
                        },
                        {
                            label: 'Hoodies',
                            key: 'hoodies',
                        },
                        {
                            label: 'Jackets',
                            key: 'jackets',
                        },
                    ]}
                    style={{ boxShadow: 'none', border: 'none' }}
                    />
                    <Menu 
                    onClick={onMenuItemClick}
                    selectedKeys={selectedKey}
                    items={[
                        {
                            label: 'READY TO WEAR',
                            key: 'readyToWear1',
                            type: 'group'
                        },
                        {
                            label: 'All',
                            key: 'all1',
                        },
                        {
                            label: 'New in',
                            key: 'new1',
                        },
                        {
                            label: 'Dungarees',
                            key: 'dungarees1',
                        },
                        {
                            label: 'Shorts',
                            key: 'shorts1',
                        },
                        {
                            label: 'Shirts',
                            key: 'shirts1',
                        },
                    ]} 
                    style={{ boxShadow: 'none', border: 'none' }}
                    />
                </Space>
                <div className='h-[350px] max-w-xl col-span-3'>
                    <p className='text-center mb-4'>Best of Seasons</p>
                    <div className="grid grid-cols-5 gap-5 h-full">
                        {/* First image container */}
                        <div className='w-full h-[350px] col-span-2'>
                            <img src={IMAGE} alt="male" className='w-full h-[350px] object-cover object-center' />
                        </div>
                        {/* The remaining two images */}
                        <div className='col-span-3 space-y-4'>
                            <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' />
                            <img src={IMAGE} alt="male" className='w-full h-[165px] object-cover object-center' /> 
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}


const items = [
    {
      key: '1',
      label: <MegaMenu />,
      style: {
        height: 'fit-content',
        padding: '0px',
        backgroundColor: 'white',
        boxShadow: 'none',
      }
    },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

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
                            <Dropdown menu={{ items }} trigger={['hover']}>
                                <Link to={'/women/all'}>Women</Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']}>
                                <Link to={'/men/all'}>Men</Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['hover']}>
                                <Link to={'/accessories/all'}>Accessories</Link>
                            </Dropdown>
                        </li>
                        <li><Dropdown menu={{ items }} trigger={['hover']}><Link to={'/sales'}>Sales</Link></Dropdown></li>
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