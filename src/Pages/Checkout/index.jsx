import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"


const Checkout = () => {
  return (
    <div>
        <div className="px-10 xl:px-20 pt-12 flex gap-4 flex-col lg:flex-row">
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
    </div>
  )
}

export default Checkout