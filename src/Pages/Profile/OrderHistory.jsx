import { Button, Spin, Table } from "antd"
import { useGetOrdersQuery } from "../../redux/slice/orderApiSlice"
import { useState } from "react";
import ViewOrder from "./ViewOrder";

const OrderHistory = () => {

    const { data, isLoading } = useGetOrdersQuery()

    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState()

    console.log(data);
    
    const columns = [
        // {
        //   title: '',
        //   dataIndex: 'checkbox',
        //   key: 'checkbox',
        //   render: () => <Checkbox />,
        // },
        {
          title: 'Order',
          dataIndex: 'order_number',
          key: 'order_number',
        },
        {
          title: 'Date',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (text) => new Date(text).toLocaleString('en-US', { dateStyle:'medium', timeStyle:'short' }),
        },
        {
          title: 'Order Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          render: (text) => `$${text}`,
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <span>
              <Button type="link" onClick={() => {
                setVisible(true);
                setOrder(record);
              }}>View</Button>
            </span>
          ),
        },
    ];
  return (
    <div>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-scroll scrollbar-hide">
            <div className="flex justify-between items-center mb-4">
            {/* <Input placeholder="Filter" style={{ width: '200px' }} /> */}
            {/* <Input prefix={<AiOutlineSearch />} placeholder="Search" className='w-[400px] p-2' /> */}
            </div>
            <Spin spinning={isLoading}>
              <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} className='whitespace-nowrap' />
            </Spin>
        </div>
        <ViewOrder visible={visible} setVisible={setVisible} data={order} />
    </div>
  )
}

export default OrderHistory