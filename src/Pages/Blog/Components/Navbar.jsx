import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

function Navbar() {
  // const [scroll, setScroll] = useState(false);
  const [flip, setFlip] = useState(false);
  const location = useLocation();

  function handleBurger() {
    setFlip(!flip);
  }

  const toggleClose = () => {
    setFlip(!flip);
  };

  return (
    <nav
    className={`absolute w-full h-20 z-50 flex items-center bg-transparent transition-colors duration-300 ${location.pathname !== '/' ? 'text-black' : 'text-white'} bg-white`}
    >
      <div className='w-full py-5 px-12 flex justify-between items-center'>
        <div className='hidden lg:flex gap-10 items-center  uppercase text-sm'>
          <NavLink to={'/'} 
              className={({ isActive }) =>
            isActive
              ? "text-sm"
              : `${location.pathname !== '/' ? 'text-black' : 'text-white'} text-sm`
          }
            >Style</NavLink>
            <NavLink to={'/portfolio'}
              className={({ isActive }) =>
            isActive
              ? "text-sm"
              : `${location.pathname !== '/' ? 'text-black' : 'text-white'} text-sm`
          }
            >Travel</NavLink>
            <p>&nbsp; </p>
        </div>
        <Link to={"/"}>
            <img src={logo} alt="logo" className='w-20 object-cover object-center' />
        </Link>
        <div className={`hidden lg:flex gap-10 items-center  uppercase text-sm`}>
            <NavLink to={'/portraits'} 
              className={({ isActive }) =>
            isActive
              ? "text-sm"
              : `${location.pathname !== '/' ? 'text-black' : 'text-white'} text-sm`
          }
            >Portraits</NavLink>
        </div>
        <div className="burger-menu lg:hidden" onClick={handleBurger}>
            <div className="flex flex-col items-center justify-center w-[24px] h-[24px] cursor-pointer relative">
                <div
                    className={`${
                    flip && "top-bar"
                    } top w-[10px] h-[2px] ${location.pathname !== '/' ? 'bg-black' : 'bg-white'} absolute left-0 top-[4px]`}
                ></div>
                <div
                    className={`${
                    flip && "center-bar"
                    } center w-[20px] h-[2px] ${location.pathname !== '/' ? 'bg-black' : 'bg-white'}`}
                ></div>
                <div
                    className={`${
                    flip && "bottom-bar"
                    } bottom w-[10px] h-[2px] ${location.pathname !== '/' ? 'bg-black' : 'bg-white'} absolute right-0 bottom-[4px]`}
                ></div>
            </div>
        </div>
        <div
            className={`lg:hidden inline-flex text-right flex-col justify-between absolute top-[100%] right-5 bg-white ${!flip ? "h-0" : "h-[15rem]"}  ease-in-out transition-all duration-500 text-black text-sm uppercase font-medium overflow-hidden shadow-md`}
        >
            <Link to={'/'} className=" px-4 py-3 whitespace-nowrap" onClick={toggleClose}>
                Home
            </Link>
            <Link to={'/portfolio'} className=" px-4 py-3 whitespace-nowrap" onClick={toggleClose}>
                Portfolio
            </Link>
            <Link to={'/portraits'} className=" px-4 py-3 whitespace-nowrap" onClick={toggleClose}>
                Portraits
            </Link>
            <Link to={'/contact'} className=" px-4 py-3 whitespace-nowrap" onClick={toggleClose}>
                Contact
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;