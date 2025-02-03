import { Button, Result } from "antd"
import { useLocation, useNavigate } from "react-router-dom"

const PaymentSuccessful = () => {

  const {state} = useLocation()

  const navigate = useNavigate()
  
  return (
    <div>
        <Result
            status="success"
            title={`Successfully Placed Order ${state.order_number}!`}
            subTitle="Kindly check your mail for order information, Delivery typically takes 2 weeks"
            extra={[
              <Button key="buy" size="large" type="primary" className="px-10 !shadow-none" onClick={() => navigate('/')}>Shop Again</Button>,
            ]}
        />
    </div>
  )
}

export default PaymentSuccessful