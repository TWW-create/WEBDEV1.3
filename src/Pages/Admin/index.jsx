import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidenav from "./components/Sidenav";
import Topnav from "./components/Topnav";

const Admin = () => {

    const [open, setOpen] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setOpen(!open);
        setOverlayVisible(!overlayVisible);
    };

    useEffect(() => {
        if (!Cookies.get('jwtbara')) {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null; // Do not render anything if not authenticated
    }


    return (
        <div className="w-full flex bg-[#f8f9fc] text-[#1E1E1E] h-screen">   
        <Sidenav open={open} toggleSidebar={toggleSidebar} />
        {overlayVisible && <div className="overlay fixed inset-0 bg-purple-100/30 z-20 lg:hidden" onClick={toggleSidebar}></div>}
        <div className={`absolute top-0 ${open ? 'left-0 lg:left-64' : 'left-0 lg:left-16'} right-0 bottom-0 overflow-auto`}>
            <Topnav open={open} toggleSidebar={toggleSidebar} />
            <div className='p-2 md:p-3 lg:p-5'>
            <Outlet />
            </div>
        </div>
        </div>
    )
}

export default Admin