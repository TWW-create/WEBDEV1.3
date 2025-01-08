import { Divider } from "antd"
import { IoIosArrowBack } from "react-icons/io"
import { PaystackButton } from "react-paystack"
import { useSelector } from "react-redux";


const PaymentForm = ({ setIsPayment, formData }) => {

    const cart = useSelector((state) => state.cart.cart);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const componentProps = {
        email: formData?.email,
        amount: subtotal * 100,
        currency: "NGN",
        metadata: {
          name: `${formData?.first_name} ${formData?.last_name}`,
          phone: formData?.contact_number,
        },
        publicKey: 'pk_test_78a2b26de2b71280b29ab79a478ca3105f32dd55',
        // text: "Pay Now",
        onSuccess: () => handlePaySuccess(),
        // onClose: () => alert("Wait! Don't leave :("),
    }

    const handlePaySuccess = () => {
        // Handle successful payment
        console.log("Payment Reference:");
        // Add your success logic here
    }


    return (
        <div>
            <p className="text-sm text-[#FF6D6D]">
                Please check if your shipping addresses are up-to-date before making payment.
            </p>
            <Divider />
            <div className="w-full border-2 border-black bg-white text-sm px-3 py-4">
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">First Name</p>
                    <p>{formData?.first_name}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Last Name</p>
                    <p>{formData?.last_name}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Address</p>
                    <p>{formData?.address_1}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Optional</p>
                    <p>{formData?.address_2 || '-'}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Mobile</p>
                    <p>{formData?.contact_number}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Country</p>
                    <p>{formData?.country}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Town/City</p>
                    <p>{formData?.city}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">County</p>
                    <p>{formData?.state_province}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-6">
                    <p className="text-[#737373] w-20">Postal Code</p>
                    <p>{formData?.zipcode}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-7">
                <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => setIsPayment(false)}
                >
                    <IoIosArrowBack size={14} />
                    <p className="text-sm">Return to shipping</p>
                </div>
                <PaystackButton {...componentProps} className="py-4 px-6 bg-black rounded-3xl text-white text-sm">
                    {/* <Button 
                        type="primary" 
                        className="!shadow-none h-auto py-3 px-6 rounded-3xl"
                    > */}
                        Pay ${subtotal.toFixed(2)}
                    {/* </Button> */}
                </PaystackButton>
            </div>
        </div>
    )
}

export default PaymentForm