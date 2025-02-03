import { useState, useEffect } from "react";
import { Button, Card, Form, Input, List, message, Spin, Table } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
// import {  useGetOrderQuery, useUpdateOrderMutation } from "../../../redux/slice/orderApiSlice";
import { errorCheck } from "../../../utils/utils";

const ViewOrder = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [statusList, setStatusList] = useState([]);

  // const { data, isLoading } = useGetOrderQuery(id);
  // // const { data: historyData } = useGetOrderHistoryQuery(id);
  // const [ updateHistory, { isLoading: historyLoading } ] = useUpdateOrderMutation();

  // useEffect(() => {
  //   if (historyData?.status) {
  //     const statusArray = historyData.status.map(statusObj => statusObj.status);
  //     setStatusList(statusArray);
  //   }
  // }, [historyData]);

  // const handleStatusUpdate = async (values) => {
  //   const payload ={...values, order_id: id}
  //   try {
  //     const res = await updateHistory(payload).unwrap();
  //     message.success(res.message);
  //     form.resetFields();
  //   } catch (error) {
  //     errorCheck(error)
  //   }
  // };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Quantity",
      dataIndex: "Qty",
      key: "Qty",
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div className="w-full flex justify-center items-center pt-4 h-[80vh]">
  //       <Spin spinning={isLoading} size="large" />
  //     </div>
  //   );
  // }

  return (
    <div className="pt-3">
      {/* <div className="flex justify-between items-center">
        <h3 className="text-4xl leading-8 pb-1 text-[#1E1E1E]">{data?.Single_Order.order_id}</h3>
        <Button
          className="font-semibold flex items-center gap-1"
          type="primary"
          ghost
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={18} />
          Go back
        </Button>
      </div>
      <div className="mt-3">
        <Card title="Order Details">
          <div className="grid md:grid-cols-3 gap-2 mb-5">
            <p><strong>Customer Name:</strong> {data?.shipping_details?.name}</p>
            <p><strong>Total Price:</strong> ${data?.Single_Order.total_price}</p>
            <p><strong>Order Date:</strong> {data?.Single_Order.order_date}</p>
          </div>
          <div className="mb-8">
            <p className="font-semibold text-lg">Products</p>
            <Table
              columns={columns}
              dataSource={JSON.parse(data?.Single_Order?.products)}
              className="mt-1 overflow-x-scroll scrollbar-hide whitespace-nowrap"
              pagination={false}
            />
          </div>
          <List
            header={<strong>Order History</strong>}
            bordered
            dataSource={statusList}
            renderItem={(item) => <List.Item className="">{item}</List.Item>}
            className="mt-3"
          />
        </Card>
        <Card title="Update Order Status" className="mt-3">
          <Form onFinish={handleStatusUpdate} form={form}>
            <Form.Item name={'status'}>
              <Input
                placeholder="Enter new status"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={historyLoading}>Update Status</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="Shipping Details" className="mt-3">
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            <p><strong>Phone Number:</strong> {data?.shipping_details?.phone_no}</p>
            <p><strong>Email:</strong> {data?.shipping_details?.email}</p>
          </div>
          <div className="mb-2">
            <p><strong>Address:</strong> {data?.shipping_details?.address}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            <p><strong>Country:</strong> {data?.shipping_details?.country}</p>
            <p><strong>State:</strong> {data?.shipping_details?.state}</p>
          </div>
        </Card>
      </div> */}
    </div>
  );
};

export default ViewOrder;
