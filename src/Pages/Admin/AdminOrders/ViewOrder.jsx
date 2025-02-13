import { Button, Card, Form, message, Select, Spin, Table } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { errorCheck } from "../../../utils/utils";
import { useGetOrderQuery, useUpdateOrderStatusMutation } from "../../../redux/slice/orderApiSlice";
import { useEffect } from "react";
import { IMAGE_BASE_URL } from "../../../utils/apiConstants";

const ViewOrder = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetOrderQuery(id);
  
  const [ updateStatus, { isLoading: updateLoading } ] = useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (values) => {
   
    try {
      const res = await updateStatus({data: values, id}).unwrap();
      message.success(res.message);
      form.setFieldValue("order_status", values.order_status);
    } catch (error) {
      errorCheck(error)
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "name",
      render: (_,record) => {
        return(
            <div className="flex items-center gap-1">
              <img src={IMAGE_BASE_URL + "/" + record?.variant_image[0]?.image_path} alt="product" className="w-20 h-20 object-cover" />
              <p>{record?.product_name}</p>
            </div>
        )
      }
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "Qty",
    },
  ];

  useEffect(() => {
    form.setFieldValue({
      order_status: data?.order_status
    })
  }, [data?.order_status, form])
  

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center pt-4 h-[80vh]">
        <Spin spinning={isLoading} size="large" />
      </div>
    );
  }

  return (
    <div className="pt-3">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl leading-8 pb-1 text-[#1E1E1E]">{data?.order_number}</h3>
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
            <p><strong>Customer Name:</strong> {data?.shipping_details?.first_name} {data?.shipping_details?.last_name}</p>
            <p><strong>Total Price:</strong> ${data?.total_amount}</p>
            <p><strong>Order Date:</strong> {new Date(data?.order_date).toLocaleString('en-US', { dateStyle:'medium', timeStyle:'short' })}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-2 mb-5">
            <p><strong>Order Status:</strong> {data?.order_status === "pending" ? "Pending" : data?.order_status === "processing" ? "Processing" : data?.order_status === "in_route" ? "Shipped" : data?.order_status === "delivered" ? "Delivered" : "Cancelled" }</p>
            
          </div>
          <div className="mb-8">
            <p className="font-semibold text-lg">Products</p>
            <Table
              columns={columns}
              dataSource={data?.items}
              className="mt-1 overflow-x-scroll scrollbar-hide whitespace-nowrap"
              pagination={false}
            />
          </div>
        </Card>
        <Card title="Update Order Status" className="mt-3">
          <Form onFinish={handleStatusUpdate} form={form}>
            <Form.Item name={'order_status'} initialValue={data?.order_status}>
              <Select 
                options={[
                  { label: 'Pending', value: 'pending' },
                  { label: 'Processing', value: 'processing' },
                  { label: 'Shipped', value: 'in_route' },
                  { label: 'Delivered', value: 'delivered' },
                  { label: 'Cancelled', value: 'cancelled' },
                  // { label: 'Returned', value: 'Returned' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updateLoading}>Update Status</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="Shipping Details" className="mt-3">
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            <p><strong>Phone Number:</strong> {data?.shipping_details?.phone_no}</p>
            <p><strong>Email:</strong> {data?.shipping_details?.email}</p>
          </div>
          <div className="mb-2">
            <p><strong>Address:</strong> {data?.shipping_details?.street}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            <p><strong>Country:</strong> {data?.shipping_details?.country}</p>
            <p><strong>State:</strong> {data?.shipping_details?.state}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2 mb-2">
            <p><strong>City:</strong> {data?.shipping_details?.city}</p>
            <p><strong>Postal Code:</strong> {data?.shipping_details?.postal_code}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewOrder;
