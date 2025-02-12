import { Modal, Table } from "antd"
import { IMAGE_BASE_URL } from "../../utils/apiConstants";

const ViewOrder = ({visible, setVisible, data}) => {

    const columns = [
        {
          title: "Product Name",
          dataIndex: "product_name",
          key: "name",
          render: (_,record) => {
            return(
                <div className="flex items-center gap-1">
                    <img src={IMAGE_BASE_URL + "/" + record?.variant_images[0]?.image_path} alt="product" className="w-10 h-10 object-cover" />
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
          key: "quantity",
        },
        {
          title: "Price($)",
          dataIndex: "price",
          key: "price",
        },
    ];

    // Parse the products array
    const products = JSON.parse(data?.products || "[]");

    // Calculate the total price of items
    const totalItemPrices = products.reduce(
        (sum, product) => sum + parseFloat(product.price || 0) * (product.Qty || 1),
        0
    );

    const date = new Date(data?.created_at).toLocaleString('en-US', { dateStyle:'medium', timeStyle:'short' })
    
  return (
    <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
    >
        <p className="font-bold text-lg mb-3">View Order</p>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="mb-2">
                <p className="text-sm">Order Id</p>
                <p className="font-semibold">{data?.order_number}</p>
            </div>
            <div className="mb-2">
                <p className="text-sm">Total Price</p>
                <p className="font-semibold">${data?.total}</p>
            </div>
            <div className="mb-2">
                <p className="text-sm">Delivery Fee</p>
                <p className="font-semibold">${parseInt(data?.shipping_cost).toFixed(2)}</p>
            </div>
            <div className="mb-2">
                <p className="text-sm">Order Date</p>
                <p className="font-semibold">{date}</p>
            </div>
            <div className="mb-2">
                <p className="text-sm">Order Status</p>
                <p className={`text-${data?.status === 'pending'? 'yellow-500' : data?.status === 'processing'? 'blue-500' : data?.status === 'in_route' ? 'green-500' :data?.status === 'delivered' ? 'green-500' : 'red-500'} text-sm font-medium`}>
                    {data?.status === "pending" ? "Pending" : data?.status === "processing" ? "Processing" : data?.status === "in_route" ? "Shipped" : data?.status === "delivered" ? "Delivered" : "Cancelled"}
                </p>
            </div>
            <div className="mb-2">
                <p className="text-sm">Order Status</p>
                <p className="font-semibold capitalize text-green-700">{data?.payment_status}</p>
            </div>
        </div>
        <Table
            columns={columns}
            dataSource={data?.order_items}
            className="mt-1 overflow-x-scroll scrollbar-hide whitespace-nowrap"
            pagination={false}
        />
    </Modal>
  )
}

export default ViewOrder