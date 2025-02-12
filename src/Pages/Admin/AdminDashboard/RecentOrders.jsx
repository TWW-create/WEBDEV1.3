import { Button, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom';

const RecentOrders = ({data}) => {

    const navigate = useNavigate()

    const columns = [
        {
            title: 'Order',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
              <p className={`${text === 'pending'? 'text-yellow-500' : text === 'processing'? 'text-blue-500' : text === 'in_route' ? 'text-green-500' : text === 'delivered' ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                {text === "pending" ? "Pending" : text === "processing" ? "Processing" : text === "in_route" ? "Shipped" : text === "delivered" ? "Delivered" : "Cancelled"}
              </p>
            )
        },
        {
            title: 'Total Price',
            dataIndex: 'total',
            key: 'totalPrice',
            render: (text) => <p>${text}</p>
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
              <span>
                <Button type="link" onClick={() => navigate(`/admin/orders/${record.id}`)}>View</Button>
              </span>
            ),
          },
    ];
  return (
    <div className='p-5 bg-white  rounded-md'>
        <div className="flex justify-between items-center">
            <p className='text-2xl'>Recent Orders</p>
            <Link to={'/admin/orders'} className='text-sm cursor-pointer font-semibold'>View All</Link>
        </div>
        <Table size="small" columns={columns} dataSource={ data?.map(item => ({ ...item, key: item._id }))} className='mt-3 overflow-x-scroll scrollbar-hide ' pagination={false}  />
    </div>
  )
}

export default RecentOrders