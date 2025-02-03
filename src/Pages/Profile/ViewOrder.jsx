import { Modal, Table } from "antd"

const ViewOrder = ({visible, setVisible, data}) => {

  console.log(data);
  

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
                <p className="font-semibold">{data?.status}</p>
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