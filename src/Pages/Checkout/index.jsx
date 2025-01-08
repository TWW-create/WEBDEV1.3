import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"
import ContentArea from "./ContentArea"


const Checkout = () => {
  return (
    <div className="bg-[#f8f8f8] pb-16">
        <div className="container mx-auto px-4 py-5">
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/cart'}>Cart</Link>,
                    },
                    {
                        title: <p>Checkout</p>,
                    },
                ]}
            />
        </div>
        <ContentArea />
    </div>
  )
}

export default Checkout