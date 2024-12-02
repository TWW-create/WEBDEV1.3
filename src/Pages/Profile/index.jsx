import { Outlet, useNavigate } from "react-router-dom"
import Sidenav from "./Sidenav"
import { Tabs } from "antd"
import Favorites from "../Favorites.jsx"
import { useEffect } from "react"
import Cookies from "js-cookie";


const Profile = () => {

    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: 'Favorites',
            children: <Favorites />
        },
        {
            key: '2',
            label: 'Order History',
            children: <Favorites />
        },
        {
            key: '3',
            label: 'Addresses',
            children: <Favorites />
        },
        
    ]

    useEffect(() => {
        if (!Cookies.get('jwtbara')) {
          navigate('/');
        }
      }, [navigate]);


  return (
    <div className="lg:flex gap-0">
        <div className="lg:hidden px-6">
            <Tabs
                items={items} defaultActiveKey='1' size="large"
            />
        </div>
        <Sidenav />
        <section className='hidden lg:block w-full lg:w-[calc(100vw_-_284px)] '>
            <div className='p-8 lg:px-8 h-[100vh] w-full overflow-y-scroll scrollbar-hide pb-24'>
                <div>
                    <Outlet />
                </div>
            </div>
        </section>
    </div>
  )
}

export default Profile