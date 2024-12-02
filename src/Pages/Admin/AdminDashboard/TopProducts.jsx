import { Table } from 'antd'
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../utils/apiConstants';

const TopProducts = ({data}) => {

    const columns = [
        {
            title: 'Product',
            dataIndex: "image",
            render: (text, record) => {
              return (<img src={IMAGE_BASE_URL + "/" +  record.featured_image} alt='product' className="w-12 h-12 object-cover rounded-md shadow-sm" />)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <p className='capitalize'>{ record.name}</p>,
        },
        {
            title: 'Total Sold',
            dataIndex: 'totalQuantitySold',
            render: (_, { orders_count }) => {
              return ( <p>{orders_count} </p> );
            },
        },
    ];
  return (
    <div className='p-5 bg-white  rounded-md'>
        <div className="flex justify-between items-center">
            <p className='text-2xl'>Top Products</p>
            <Link to={'/admin/products'} className='text-sm cursor-pointer font-semibold'>View All</Link>
        </div>
        <Table columns={columns} dataSource={ data?.map(item => ({ ...item, key: item._id }))} className='mt-3 overflow-x-scroll scrollbar-hide ' size="small" pagination={false}  />
    </div>
  )
}

export default TopProducts