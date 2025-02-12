import { Button, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../utils/apiConstants';
import { EditOutlined } from '@ant-design/icons';

const TopProducts = ({data}) => {

  const navigate = useNavigate()

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
            // render: (_, { orders_count }) => {
            //   return ( <p>{orders_count} </p> );
            // },
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_, record) => (
            <div className="space-x-2">
              <Button icon={<EditOutlined />} className='!text-[#000] p-2' onClick={() => navigate(`/admin/products/${record.id}`)} />
            </div>
          ),
        },
    ];
  return (
    <div className='p-5 bg-white  rounded-md'>
        <div className="flex justify-between items-center">
            <p className='text-2xl'>Top Products</p>
            <Link to={'/admin/products'} className='text-sm cursor-pointer font-semibold'>View All</Link>
        </div>
        <Table size="small" columns={columns} dataSource={ data?.map(item => ({ ...item, key: item._id }))} className='mt-3 overflow-x-scroll scrollbar-hide ' pagination={false}  />
    </div>
  )
}

export default TopProducts