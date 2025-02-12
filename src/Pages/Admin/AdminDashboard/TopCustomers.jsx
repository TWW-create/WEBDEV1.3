import { Table } from 'antd'

const TopCustomers = ({data}) => {

    const columns = [
        {
          title: 'Customer',
          dataIndex: 'customer',
          render: (text, record) => <p className='capitalize'>{record.first_name} {record.last_name}</p>,
        },
        {
            title: 'Total Orders',
            dataIndex: 'orders_count'
        },
        {
            title: 'Total Order Amount (₦)',
            dataIndex: 'orders_sum_total',
            render: (_,record) => <p>${record?.orders_sum_total}</p>
        },
    ];
  return (
    <div className='p-5 bg-white rounded-md'>
        <div className="flex justify-between items-center">
            <p className='text-2xl'>Top Customers</p>
            {/* <Link to={'/admin/orders'} className='text-sm text-light-secondary cursor-pointer font-semibold'>View All</Link> */}
        </div>
        <Table columns={columns} dataSource={ data?.map(item => ({ ...item, key: item._id }))} className='mt-3 overflow-x-scroll scrollbar-hide' size="small" pagination={false}  />
    </div>
  )
}

export default TopCustomers