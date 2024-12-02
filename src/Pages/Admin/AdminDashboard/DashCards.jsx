import PropTypes from "prop-types";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";

const DashCards = ({data}) => {

  return (
    <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7 '>
        <div className='p-3 bg-white rounded-md'>
            <div className="flex items-center gap-3 pb-2">
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-blue-500/30 p-1">
                    <HiOutlineUserGroup size={18} className='text-blue-500' />
                </div>
                <p className='text-sm'>Total Users</p>
            </div>
            <div>
                <p className='font-bold text-3xl'>{(data?.total_users)?.toLocaleString()}</p>
            </div>
        </div>
        <div className='p-3 bg-white rounded-md'>
            <div className="flex items-center gap-3 pb-2">
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#8d67c8]/40 p-1 ">
                    <TbReportMoney size={18} className='text-[#8d67c8]' />
                </div>
                <p className='text-sm'>Total Revenue</p>
            </div>
            <div>
                 <p className='font-bold text-[25px]'>${(data?.total_revenue)?.toLocaleString()}</p>
            </div>
        </div>
        <div className='p-3 bg-white rounded-md'>
            <div className="flex items-center gap-3 pb-2">
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#db4954]/30 p-1">
                    <LiaShoppingBasketSolid size={18} className='text-[#db4954]' />
                </div>
                <p className='text-sm'>Total Product</p>
            </div>
            <div>
                <p className='font-bold text-3xl'>{(data?.total_products)?.toLocaleString()}</p>
            </div>
        </div>
        <div className='p-3 bg-white rounded-md'>
            <div className="flex items-center gap-3 pb-2">
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#e2ad4f]/30 p-1">
                    <IoWalletOutline size={18} className='text-[#e2ad4f]' />
                </div>
                <p className='text-sm'>Total Orders</p>
            </div>
            <div>
                <p className='font-bold text-3xl'>{(data?.total_orders)?.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}


DashCards.propTypes = {
    data: PropTypes.object
}

export default DashCards