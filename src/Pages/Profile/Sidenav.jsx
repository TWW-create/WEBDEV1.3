// import React from 'react'

import { NavLink } from "react-router-dom";

const Sidenav = () => {

    const navLinks = [
        {
          title: "Favorites",
          href: "/profile/favorites",
        },
        {
          title: "Order History",
          href: "/profile/favorites",
        },
        {
          title: "Addresses",
          href: "/profile/favorites",
        },
    ];
  return (
    <div className='lg:h-[100vh]'>
        <div className='hidden lg:w-[240px] xl:w-[284px] lg:fixe lg:flex px-[30px] h-full border-r'>
            <div className='w-full h-full pt-8'>
                <p className="font-bold text-3xl text-[#000000] mb-3">Hello,</p>
                <p className="font-semibold text-sm mb-10">Welcome back to Bara! You can manage your account settings here.</p>
                {navLinks?.map((link, i) => (
                    <NavLink
                    key={i}
                    to={link?.href}
                    // onClick={onClose}
                    exact
                    className={`w-full flex justify-start font-semibold text-sm items-center p-1 text-[#000000] mb-2`}
                    // className={({ isActive }) =>
                    //     `w-full flex justify-start font-medium text-sm items-center p-1 text-[#6B7280] ${
                    //     isActive && "text-primary bg-[#FFE2D2] p-2 rounded-md"
                    //     }`
                    // }
                    >
                    <span className=''>{link?.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidenav