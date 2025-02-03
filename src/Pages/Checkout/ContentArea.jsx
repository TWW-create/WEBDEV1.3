import { useEffect, useState } from "react"
import CartSummary from "./CartSummary"
import ContactForm from "./ContactForm"
import PaymentForm from "./PaymentForm"
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserAddressesQuery } from "../../redux/slice/profileApiSlice";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../../redux/slice/orderApiSlice";
import { message, Spin } from "antd";
import { errorCheck } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/slice/cartSlice";

const ContentArea = () => {

  const {user} = useSelector(state => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: addresses, isLoading: isLoadingAddress } = useGetUserAddressesQuery(user?.id);
  const [ createOrder, { isLoading }] = useCreateOrderMutation();
    const [ verifyPayment, { isLoading: verifyLoading }] = useVerifyPaymentMutation();

    const [isPayment, setIsPayment] = useState(false)
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      address_1: "",
      address_2: "",
      contact_number: "",
      country: "",
      city: "",
      state_province: "",
      zipcode: "",
    });

    const handlePaySuccess = async (response) => {      
      const payload ={
        items: cart?.map(item => {
          return {
            product_id: item.id,
            variant_id: item.variant_id,
            quantity: item.quantity,
            size: item.selectedSize,
            price: item.price
          }
        }),
        shipping_address: {
            street: formData.address_1,
            city: formData.city,
            state: formData.state_province,
            postal_code: formData.zipcode,
            country: formData.country,
            optional: formData.address_2,
            first_name: formData.first_name,
            last_name: formData.last_name,
        },
        shipping_cost: 1500,
        email: formData.email,
        phone: formData.contact_number
      }
      try {
        const res = await createOrder(payload).unwrap();
        await verifyPayment({
          payment_reference: response.reference,
          order_id: res.data.id
        }).unwrap();
        console.log(res);
        message.success(res.message)
        navigate('/checkout/success',{state: res.data});
        dispatch(resetCart())
      } catch (error) {
        errorCheck(error)
      }
    }


    useEffect(() => {
      if (Cookies.get('jwtbara') && addresses) {
        const loggedInUser = addresses?.data.find(address => address.delivery_address === '1');
        setFormData({
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          email: user?.email || "",
          address_1: loggedInUser?.address_1 || "",
          address_2: loggedInUser?.address_2 || "",
          contact_number: loggedInUser?.contact_number || "",
          country: loggedInUser?.country || "",
          city: loggedInUser?.city || "",
          state_province: loggedInUser?.state_province || "",
          zipcode: loggedInUser?.zipcode || "",
        });
      }
    }, [addresses, user?.email, user?.first_name, user?.last_name]);

  return (
    <Spin spinning={isLoading || verifyLoading}>
      <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
              {isPayment ? <PaymentForm setIsPayment={setIsPayment} formData={formData} handlePaySuccess={handlePaySuccess} /> : <ContactForm setIsPayment={setIsPayment} formData={formData} setFormData={setFormData} loading={isLoadingAddress}   />}
              <CartSummary />
          </div>
      </div>
    </Spin>
  )
}

export default ContentArea