import { PlusOutlined } from "@ant-design/icons"
import { Avatar, Button, Spin, Table } from "antd"
import { IMAGE_BASE_URL } from "../../../utils/apiConstants";
import { useGetCreatorsQuery } from "../../../redux/slice/creatorApiSlice";
import { useNavigate } from "react-router-dom";

const AdminCreator = () => {

  const navigate = useNavigate()

  const { data, isLoading } = useGetCreatorsQuery()

  const columns = [
    {
      title: 'Creator',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {record.image && <Avatar src={IMAGE_BASE_URL+ "/" + record?.image} size={48} shape='square' />}
          <div>
            <div className="font-bold">{record.name}</div>
            {/* <div className="text-gray-500">{record.category}</div> */}
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <div className="space-x-2">
    //       <Button icon={<EditOutlined />} className='!text-[#000] p-2' onClick={() => navigate(`/admin/products/${record.id}`)} />
    //       <Button icon={<DeleteOutlined />} className='!text-[#000] p-2' onClick={() =>{
    //         setActiveId(record.id)
    //         setVisible(true)
    //       }} />
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Creators</h2>
        <div className="space-x-2">
          {/* <Button icon={<ExportOutlined />}>Export</Button> */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/creators/add')} >Add Creator</Button>
        </div>
      </div>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-scroll scrollbar-hide">
            <div className="flex justify-between items-center mb-4">
            {/* <Input prefix={<SearchOutlined />} placeholder="Search" className='w-[400px]' /> */}
            </div>
            <Spin spinning={isLoading}>
              <Table 
                columns={columns} 
                dataSource={data?.data} 
                className='whitespace-nowrap'
              //   pagination={{
              //     current: currentPage,
              //     pageSize: data?.per_page,
              //     total: data?.total, // Total number of products
              //     onChange: handlePageChange,
              // }}
              />
            </Spin>
        </div> 
    </div>
  )
}

export default AdminCreator