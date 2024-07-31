import { Link } from "react-router-dom"
import logo from '../../assets/images/logo.png';
import { Button, Form, Input } from "antd";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-5 text-center">
        <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
        <div className="pt-4 text-sm">
            <p className="font-semibold text-xl pb-2">Sign In</p>
            <p>Welcome back,</p>
            <p>Login below to access your account.</p>
        </div>
        <Form className="pt-7 px-0 !w-full">
            <Form.Item className="!mb-4">
                <Input type="email" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Email address" />
            </Form.Item>
            <Form.Item>
                <Input.Password type="password" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Password" />
            </Form.Item>
            <Button htmlType="submit" block type="primary" className="rounded-2xl !shadow-none">Submit</Button>
        </Form>
    </div>
  )
}

export default Login