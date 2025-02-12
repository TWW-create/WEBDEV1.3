import { Table, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAdminOrdersQuery } from '../../../redux/slice/orderApiSlice';

const columns = (navigate) => [
  {
    title: 'Order',
    dataIndex: 'order_number',
    key: 'order_number',
  },
  {
    title: 'Customer Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => {
      try {
        const shippingAddress = JSON.parse(record?.shipping_address || '{}');
        return <p>{shippingAddress?.first_name} {shippingAddress?.last_name}</p>;
      } catch (error) {
        return <p>N/A</p>;
      }
    }
  },
  {
    title: 'Total Price',
    dataIndex: 'total',
    key: 'totalPrice',
    render: (text) => <p>${text}</p>
  },
  {
    title: 'Order Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text) => new Date(text).toLocaleString('en-US', { dateStyle:'medium', timeStyle:'short' }),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Pending', value: 'pending' },
      { text: 'Processing', value: 'processing' },
      { text: 'Shipped', value: 'in_route' },
      { text: 'Delivered', value: 'delivered' },
      { text: 'Cancelled', value: 'cancelled' },
    ],
    onFilter: (value, record) => record.status === value,
    render: (text) => (
      <p className={`${text === 'pending'? 'text-yellow-500' : text === 'processing'? 'text-blue-500' : text === 'in_route' ? 'text-green-500' :text === 'delivered' ? 'green-500' : 'text-red-500'} text-sm font-medium`}>
        {text === "pending" ? "Pending" : text === "processing" ? "Processing" : text === "in_route" ? "Shipped" : text === "delivered" ? "Delivered" : "Cancelled"}
      </p>
    )
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

const AdminOrders = () => {
  const navigate = useNavigate();

  const {data, isLoading} = useGetAdminOrdersQuery()


  return (
    <div className='pt-3'>
      <div className='flex justify-between items-center'>
        <h3 className='text-4xl leading-8 pb-1 text-[#1E1E1E]'>Orders</h3>
      </div>
      <div className='w-full bg-white p-3 mt-3'>
        <div className=''>
          <Spin spinning={isLoading}>
          <Table
            columns={columns(navigate)}
            dataSource={data}
            className='mt-3 overflow-x-scroll scrollbar-hide whitespace-nowrap'
          />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
