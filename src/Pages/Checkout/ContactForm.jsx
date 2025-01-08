import { Button, Form, Input, Select } from "antd";
import { useGetCountriesQuery } from "../../redux/slice/profileApiSlice";
import { useEffect } from "react";

const {Option} = Select;
const ContactForm = ({setIsPayment, loading, formData, setFormData}) => {

    const [form] = Form.useForm();

    const { data: countryData } = useGetCountriesQuery();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setFormData(values);
        setIsPayment(true)
    };


    useEffect(() => {
        if (formData) {
          form.setFieldsValue(formData);
        }
    }, [formData, form]);
  return (
    <div>
        <div className="flex justify-between items-center text-[#323232] mb-3">
            <p className="md:text-lg">Shipping Address</p>
            {/* <p className="text-sm md:text-base">Have an account? <span className="text-black">Log In</span></p> */}
        </div>
        <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={loading}
            >
                <div className="grid md:grid-cols-2 gap-3">
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input className="p-2" />
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input className="p-2" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="address_1"
                    label="Address"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="address_2"
                    label="Optional"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="contact_number"
                    label="Mobile"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your mobile number!',
                        },
                    ]}
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name='country'
                    className='!mb-4'
                    label='Country'
                    rules={[
                        {
                        required: true,
                        message: 'Please input your country!',
                        },
                    ]}
                >
                    <Select
                    showSearch
                    className='!h-auto profile-select'
                    >
                    {countryData?.data.map((country) => (
                        <Option key={country.iso2} value={country.name}>
                        {country.name}
                        </Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="city"
                    label="Town/City"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="state_province"
                    label="County"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="zipcode"
                    label="Postal Code"
                >
                    <Input className="p-2" />
                </Form.Item>
                <div className="flex justify-end gap-2 mt-2">
                    <Button type='primary' htmlType='submit' className="!shadow-none h-auto py-3 px-6 rounded-3xl">Continue to Payment</Button>
                </div>
            </Form>
    </div>
  )
}

export default ContactForm