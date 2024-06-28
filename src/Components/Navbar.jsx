import { GoSearch } from 'react-icons/go';
import { LuUser2 } from 'react-icons/lu';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png'; // Make sure the path to your logo image is correct
import DropdownMenu from './DropdownMenu'; // Import the DropdownMenu component
import { Link } from 'react-router-dom';

const menItems = [
    {
        title: 'Tops',
        parent: 'men',
        links: [
            { text: 'All tops', href: 'all-tops' },
            { text: 'T-Shirts', href: 't-shirts' },
            { text: 'Hoodies & Sweaters', href: 'hoodies-sweaters' },
            { text: 'Jackets', href: 'jackets' },
            { text: 'Knitwear', href: 'knitwear' },
            { text: 'Longsleeves', href: 'longsleeves' },
            { text: 'Shirts', href: 'shirts' }
        ]
    },
    {
        title: 'Bottoms',
        parent: 'men',
        links: [
            { text: 'All bottoms', href: 'all-bottoms' },
            { text: 'Pants', href: 'pants' },
            { text: 'Jeans', href: 'jeans' },
            { text: 'Sweatpants', href: 'sweatpants' },
            { text: 'Shorts', href: 'shorts' },
            { text: 'Swimwear', href: 'swimwear' }
        ]
    }
];

const womenItems = [
    {
        title: 'Tops',
        parent: 'women',
        links: [
            { text: 'All tops', href: 'all-tops-women' },
            { text: 'T-Shirts', href: 't-shirts-women' },
            { text: 'Hoodies & Sweaters', href: 'hoodies-sweaters-women' },
            { text: 'Jackets', href: 'jackets-women' },
            { text: 'Knitwear', href: 'knitwear-women' },
            { text: 'Longsleeves', href: 'longsleeves-women' },
            { text: 'Shirts', href: 'shirts-women' }
        ]
    },
    {
        title: 'Bottoms',
        parent: 'women',
        links: [
            { text: 'All bottoms', href: 'all-bottoms-women' },
            { text: 'Pants', href: 'pants-women' },
            { text: 'Jeans', href: 'jeans-women' },
            { text: 'Sweatpants', href: 'sweatpants-women' },
            { text: 'Shorts', href: 'shorts-women' },
            { text: 'Skirts', href: 'skirts-women' }
        ]
    }
];

const accessoriesItems = [
    {
        parent: 'accessories',
        title: 'Accessories',
        links: [
            { text: 'Bags', href: 'bags' },
            { text: 'Watches', href: 'watches' },
            { text: 'Belts', href: 'belts' },
            { text: 'Hats', href: 'hats' },
            { text: 'Scarves', href: 'scarves' },
            { text: 'Sunglasses', href: 'sunglasses' }
        ]
    }
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState('');
    const [dropdownTimeout, setDropdownTimeout] = useState(null);
    const [onDropdown, setOnDropdown] = useState(false);

    const handleDropdownVisible = (active) => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
            setDropdownTimeout(null);
        }
        setDropdownVisible(true);
        setActiveDropdown(active);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            if (!onDropdown) {
                setDropdownVisible(false);
                setActiveDropdown('');
            }
        }, 500);
        setDropdownTimeout(timeout);
    };

    const handleDropdownMouseEnter = () => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
            setDropdownTimeout(null);
        }
        setOnDropdown(true);
    };

    const handleDropdownMouseLeave = () => {
        setOnDropdown(false);
        setDropdownVisible(false);
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

    let dropdownItems;
    if (activeDropdown === 'men') {
        dropdownItems = menItems;
    } else if (activeDropdown === 'women') {
        dropdownItems = womenItems;
    } else if (activeDropdown === 'accessories') {
        dropdownItems = accessoriesItems;
    }

    return (
        <div className='relative'>
            <nav className={`flex justify-between items-center py-5 px-12 top-0 ${scrolled ? 'fixed bg-white shadow-md bg-opacity-100 w-full z-50' : 'static'}`}>
                <div className="flex gap-10 items-center">
                    <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
                    <ul className="hidden lg:flex space-x-8 text-sm font-bold">
                        <li
                            onMouseEnter={() => handleDropdownVisible('men')}
                            onMouseLeave={handleMouseLeave}
                            className="relative"
                        >
                            <Link to={'/men/all'}>Men</Link>
                        </li>
                        <li
                            onMouseEnter={() => handleDropdownVisible('women')}
                            onMouseLeave={handleMouseLeave}
                            className="relative"
                        >
                            <Link to={'/women/all'}>Women</Link>
                        </li>
                        <li
                            onMouseEnter={() => handleDropdownVisible('accessories')}
                            onMouseLeave={handleMouseLeave}
                            className="relative"
                        >
                            <Link to={'/accessories/all'}>Accessories</Link>
                        </li>
                        <li><Link to={'/sales'}>Sales</Link></li>
                    </ul>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <GoSearch />
                    <LuUser2 />
                    <FaRegHeart />
                    <RiShoppingBag3Line />
                </div>
            </nav>
            {dropdownVisible && (
                <div
                    className='fixed w-full z-50 bg-white shadow-md'
                    style={{ top: `${scrolled ? '4.5rem' : '6.5rem'}`}}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                >
                    <DropdownMenu items={dropdownItems} isVisible={dropdownVisible} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
