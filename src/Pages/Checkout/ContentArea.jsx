import { useEffect, useState } from "react"
import CartSummary from "./CartSummary"
import ContactForm from "./ContactForm"
import PaymentForm from "./PaymentForm"
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useGetUserAddressesQuery } from "../../redux/slice/profileApiSlice";

const ContentArea = () => {

  const {user} = useSelector(state => state.user);

  const { data: addresses, isLoading: isLoadingAddress } = useGetUserAddressesQuery(user?.id);

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


    useEffect(() => {
      if (Cookies.get('jwtbara') && addresses) {
        const loggedInUser = addresses.data.find(address => address.delivery_address === '1');
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          address_1: loggedInUser.address_1 || "",
          address_2: loggedInUser.address_2 || "",
          contact_number: loggedInUser.contact_number || "",
          country: loggedInUser.country || "",
          city: loggedInUser.city || "",
          state_province: loggedInUser.state_province || "",
          zipcode: loggedInUser.zipcode || "",
        });
      }
    }, [addresses, user?.email, user?.first_name, user?.last_name]);

  return (
    <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
            {isPayment ? <PaymentForm setIsPayment={setIsPayment} formData={formData} /> : <ContactForm setIsPayment={setIsPayment} formData={formData} setFormData={setFormData} loading={isLoadingAddress} />}
            <CartSummary />
        </div>
    </div>
  )
}

export default ContentArea