import { Link } from "react-router-dom"
import logo from '../../assets/images/logo.png';
import { Button, Form, Input, message } from "antd";
import { useCreateAccountMutation } from "../../redux/slice/authApiSlice";
import { errorCheck } from "../../utils/utils";

const Register = ({setActiveTab}) => {

    const [ createAccount, { isLoading } ] = useCreateAccountMutation();

    const onFinish = async (values) => {
        try {
            const res = await createAccount(values).unwrap();
            message.success("Account created successfully, Please login to continue");
            setActiveTab('1');
        } catch (error) {
            errorCheck(error);
        }
    };
  return (
    <div className="flex flex-col justify-center items-center pt-5 text-center">
        <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
        <div className="pt-4 text-sm">
            <p className="font-semibold text-xl pb-2">Register</p>
            {/* <p>Welcome back,</p> */}
            <p>Create an account with us</p>
        </div>
        <Form onFinish={onFinish} className="pt-7 px-0 !w-full">
            <Form.Item name={'email'} className="!mb-4">
                <Input type="email" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Email address" />
            </Form.Item>
            <Form.Item name={'password'}>
                <Input.Password type="password" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Password" />
            </Form.Item>
            <Form.Item name={'password_confirmation'}>
                <Input.Password type="password" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Repeat Password" />
            </Form.Item>
            <Form.Item name={'first_name'}>
                <Input className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="First Name" />
            </Form.Item>
            <Form.Item name={'last_name'}>
                <Input className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Last Name" />
            </Form.Item>
            {/* <Form.Item>
                <Input className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Country" />
            </Form.Item> */}
            <Button loading={isLoading} htmlType="submit" block type="primary" className="rounded-2xl !shadow-none">Join Us</Button>
        </Form>
    </div>
  )
}

export default Register