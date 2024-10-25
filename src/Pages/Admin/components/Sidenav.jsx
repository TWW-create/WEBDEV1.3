import { NavLink } from "react-router-dom";
import { IoBarChartOutline, IoPricetagOutline, IoRibbonOutline } from "react-icons/io5";
import { HiOutlineHome, } from "react-icons/hi";
import { MdOutlineChat, MdOutlineMenu, MdOutlineSettings } from "react-icons/md";
import { FaRegFolder, FaRegStar, FaRegUser } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";
import { FaRegCircleQuestion } from "react-icons/fa6";

const Sidenav = ({ open, toggleSidebar }) => {
//   const { user } = useSelector((state) => state.user)

//   const ref1 = useRef(null);


    const handleNavLinkClick = () => {
        if (window.innerWidth <= 912) {
        // Check if screen width is less than or equal to 768px (adjust as needed)
        toggleSidebar();
        }
    };

    const navlinks = [
      {
          name: "Dashboard",
          path: "/admin/dashboard",
          icon: <HiOutlineHome size={20} />,
      },
      // {
      //     name: "Orders",
      //     path: "/orders",
      //     icon: <MdOutlineMenu size={20} />,
      // },
      {
          name: "Products",
          path: "/admin/products",
          icon: <IoPricetagOutline size={20} />,
      },
      {
          name: "Categories",
          path: "/admin/categories",
          icon: <FaRegFolder size={20} />,
      },
    //   {
    //       name: "Brands",
    //       path: "/brands",
    //       icon: <FaRegFolder size={20} />,
    //   },
    //   {
    //       name: "Specifications",
    //       path: "/specifications",
    //       icon: <FaRegFolder size={20} />,
    //   },
    //   {
    //       name: "Product Attributes",
    //       path: "/attributes",
    //       icon: <FaRegFolder size={20} />,
    //   },
      {
          name: "Slide Banner",
          path: "/admin/banners",
          icon: <FaRegFolder size={20} />,
      },
      {
          name: "Blog",
          path: "/admin/blog",
          icon: <FaRegFolder size={20} />,
      },
      {
          name: "Newsletter",
          path: "/admin/newsletter",
          icon: <FaRegFolder size={20} />,
      },
    //   {
    //       name: "Customers",
    //       path: "/customers",
    //       icon: <PiUsersBold size={20} />,
    //   },
      // {
      //     name: "Reports",
      //     path: "/reports",
      //     icon: <IoBarChartOutline size={20} />,
      // },
    //   {
    //       name: "Discounts",
    //       path: "/discounts",
    //       icon: <IoPricetagOutline size={20} />,
    //   },
    //   {
    //       name: "Coupons",
    //       path: "/coupons",
    //       icon: <FaRegStar size={20} />,
    //   },
      // {
      //     name: "Inbox",
      //     path: "/inbox",
      //     icon: <MdOutlineChat size={20} />,
      // },
    ]


    // const others = [
    //   {
    //     name: "Blog",
    //     path: "/blog",
    //     icon: <FaRegCircleQuestion size={20} />,
    //   },
    // //   {
    // //       name: "Product Updates",
    // //       path: "/product-updates",
    // //       icon: <IoRibbonOutline size={20} />,
    // //   },
    // ]
    
    // const settings = [
    //   {
    //     name: "Personal Settings",
    //     path: "/personal-settings",
    //     icon: <FaRegUser size={20} />,
    //   },
    //   {
    //       name: "Global Settings",
    //       path: "/global-settings",
    //       icon: <MdOutlineSettings size={20} />,
    //   },
    // ]
  return (
    <div
      className={`!h-screen ease-in-out ${
        open ? "w-72 md:w-64 lg:w-64" : "hidden lg:block w-16"
      } bg-[#1E2753] p-3 relative z-50 text-white`}
    >
      <div className=' flex justify-center items-center'>
        {/* <div className='flex flex-col items-center '>
          <img
            src={LOGO}
            alt='logo'
            className={`w-[50%] ${!open && "hidden"} `}
          />
        </div> */}
      </div>
      {/* <Divider /> */}
        <div
            className={`pt-8 flex flex-col gap-4 relative ${
            open ? "h-[90vh] overflow-y-scroll scrollbar-hide" : "h-auto"
            }`}
        >
            {navlinks.map((link, index) => (
              <NavLink
              key={index}
              to={link.path}
              onClick={handleNavLinkClick}
              className={({ isActive }) =>
                  isActive
                  ? "bg-white text-[#5A607F] font-medium flex items-center text-sm gap-3 p-2 rounded-md group"
                  : "flex items-center text-sm gap-3 font-medium p-2 hover:bg-primary/10 rounded-md group"
              }
              >
                <div>
                    {link.icon}
                </div>
                <h2
                    className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                    style={{
                    transitionDelay: `300ms`,
                    }}
                >
                    {link.name}
                </h2>
                <h2
                    className={`${
                    open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
                >
                    {link.name}
                </h2>
              </NavLink>
            ))}
        {/* {open && <p className="text-xs py-4">Other Information</p>} */}
        {/* {others.map((link, index) => (
          <NavLink
          key={index}
          to={link.path}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
              isActive
              ? "bg-white text-[#5A607F] font-medium flex items-center text-sm gap-3 p-2 rounded-md group"
              : "flex items-center text-sm gap-3 font-medium p-2 hover:bg-primary/10 rounded-md group"
          }
          >
            <div>
                {link.icon}
            </div>
            <h2
                className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
                style={{
                transitionDelay: `300ms`,
                }}
            >
                {link.name}
            </h2>
            <h2
                className={`${
                open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
            >
                {link.name}
            </h2>
          </NavLink>
        ))} */}
        {/* {open && <p className="text-xs py-4">Settings</p>}
        {settings.map((link, index) => (
          <NavLink
          key={index}
          to={link.path}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
              isActive
              ? "bg-white text-[#5A607F] font-medium flex items-center text-sm gap-3 p-2 rounded-md group"
              : "flex items-center text-sm gap-3 font-medium p-2 hover:bg-primary/10 rounded-md group"
          }
          >
            <div>
                {link.icon}
            </div>
            <h2
                className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
                style={{
                transitionDelay: `300ms`,
                }}
            >
                {link.name}
            </h2>
            <h2
                className={`${
                open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
            >
                {link.name}
            </h2>
          </NavLink>
        ))} */}
        </div>
    </div>
  );
};

export default Sidenav;
