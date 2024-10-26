import { Table, Button, Input, Avatar, Spin } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../redux/slice/productApiSlice';
import { useState } from 'react';
import DeleteProduct from './DeleteProduct';

// const getStatusTag = (inventory) => {
//   if (inventory === 'Out of Stock') {
//     return <Tag color="red">Out of Stock</Tag>;
//   }
//   return inventory;
// };

const AdminProducts = () => {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [activeId, setActiveId] = useState()

    const { data, isLoading } = useGetAllProductsQuery()
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {record.image_url && <Avatar src={record.image_url} size={48} shape='square' />}
          <div>
            <div className="font-bold">{record.name}</div>
            {/* <div className="text-gray-500">{record.category}</div> */}
          </div>
        </div>
      ),
    },
    // {
    //   title: 'Inventory',
    //   dataIndex: 'inventory',
    //   key: 'inventory',
    //   render: (text) => getStatusTag(text),
    // },
    // {
    //   title: 'Color',
    //   dataIndex: 'color',
    //   key: 'color',
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button icon={<EditOutlined />} className='!text-[#000] p-2' onClick={() => navigate(`/admin/products/${record.id}`)} />
          <Button icon={<DeleteOutlined />} className='!text-[#000] p-2' onClick={() =>{
            setActiveId(record.id)
            setVisible(true)
          }} />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return(
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size='large' />
      </div>
    )
  }


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        {data?.data.length > 0 && <div className="space-x-2">
          {/* <Button icon={<ExportOutlined />}>Export</Button> */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/products/add')} >Add Product</Button>
        </div>}
      </div>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-scroll scrollbar-hide">
            <div className="flex justify-between items-center mb-4">
            {/* <Input prefix={<SearchOutlined />} placeholder="Search" className='w-[400px]' /> */}
            </div>
            <Spin spinning={isLoading}>
              <Table columns={columns} dataSource={data?.data} className='whitespace-nowrap' />
            </Spin>
        </div> 
        <DeleteProduct id={activeId} setActiveId={setActiveId} deleteVisible={visible} setDeleteVisible={setVisible} />
    </div>
  );
};

export default AdminProducts;
