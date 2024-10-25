import { Table, Spin, } from 'antd';
import { useGetNewsletterSubscribersQuery } from '../../../redux/slice/newsletterApiSlice';



const Newsletter = () => {

  const {data, isLoading} = useGetNewsletterSubscribersQuery()


  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
            {/* {data?.data?.length > 0 && <div className="space-x-2">
            <Button icon={<ExportOutlined />}>Export</Button>
            </div>} */}
        </div>    
        {<div className="p-4 bg-white rounded-lg shadow-md">
            {/* <div className="flex justify-between items-center mb-4">
                <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ width: 400 }} />
            </div> */}
            <Spin spinning={isLoading}>
              <Table columns={columns} dataSource={data?.data} pagination={{ pageSize: 10 }} />
            </Spin>
        </div> 
        }
    </div>
  );
};

export default Newsletter;
