import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/images/logo.png';
import { Button, Form, Input, message } from "antd";
import { useSignInMutation } from "../../redux/slice/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slice/userSlice";

const Login = ({setOpen}) => {

    const [login, {isLoading}] = useSignInMutation()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            const res = await login(values).unwrap();
            message.success(res.message);
            dispatch(setCredentials({...res}));
            if (res.user.is_admin === 1) {
                navigate("/admin/dashboard");
            }
            setOpen(false);
            // message.success("Account created successfully, Please login to continue");
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div className="flex flex-col justify-center items-center pt-5 text-center">
        <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
        <div className="pt-4 text-sm">
            <p className="font-semibold text-xl pb-2">Sign In</p>
            <p>Welcome back,</p>
            <p>Login below to access your account.</p>
        </div>
        <Form onFinish={onFinish} className="pt-7 px-0 !w-full">
            <Form.Item className="!mb-4" name={'email'}>
                <Input type="email" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Email address" />
            </Form.Item>
            <Form.Item name={'password'}>
                <Input.Password type="password" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Password" />
            </Form.Item>
            <Button htmlType="submit" block type="primary" className="rounded-2xl !shadow-none" loading={isLoading}>Submit</Button>
        </Form>
    </div>
  )
}

export default Login