import { Spin } from "antd";
import { useGetDashQuery } from "../../../redux/slice/dashboardApiSlice";
import DashCards from "./DashCards";
import TopProducts from "./TopProducts";
import LowStock from "./LowStock";
import TopCustomers from "./TopCustomers";
import RecentOrders from "./RecentOrders";
import RevenueByMonth from "./RevenueByMonth";

const AdminDashboard = () => {

  const {data, isLoading, isFetching} = useGetDashQuery();

  console.log(data);
  
  return (
    <div>
      <h3 className='text-2xl xl:text-3xl font-bold'>Dashboard</h3>
      <Spin spinning={isLoading || isFetching} size="large" className='my-auto w-30'>
        <div></div>
      </Spin>
      <DashCards data={data?.data?.metrics} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <TopProducts data={data?.data?.top_selling_products} />
        <LowStock data={data?.data?.low_stock_alerts} />
        <RevenueByMonth data={data?.data?.monthly_sales} />
        <TopCustomers data={data?.data?.top_customers} />
        <RecentOrders data={data?.data?.recent_orders} />
      </div>
    </div>
  )
}

export default AdminDashboard