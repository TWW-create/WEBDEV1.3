import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import { Button, Form, Input, message } from "antd";
import { useForgotPasswordMutation, useSignInMutation } from "../../redux/slice/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slice/userSlice";
import { errorCheck } from "../../utils/utils";
import { useState } from "react";

const Login = ({ setOpen }) => {
    const [form] = Form.useForm();
    const [view, setView] = useState('login'); // 'login' or 'forgot-password'

    const [login, { isLoading }] = useSignInMutation();
    const [forgotPassword, { isLoading: forgotLoading }] = useForgotPasswordMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishLogin = async (values) => {
        try {
            const res = await login(values).unwrap();
            message.success('Logged In Successfully');
            dispatch(setCredentials({ ...res }));
            if (res.user.is_admin === 1) {
                navigate("/admin/dashboard");
            }
            setOpen(false);
            form.resetFields();
        } catch (error) {
            errorCheck(error);
        }
    };

    const onFinishForgotPassword = async (values) => {
        try {
            await forgotPassword(values).unwrap();
            message.success('Password reset instructions sent to your email.');
            setView('login'); // Switch back to login view after successful submission
            form.resetFields();
        } catch (error) {
            errorCheck(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-5 text-center">
            <Link to={'/'}><img src={logo} alt="logo" className='w-20 object-cover object-center' /></Link>
            <div className="pt-4 text-sm">
                <p className="font-semibold text-xl pb-2">
                    {view === 'login' ? 'Sign In' : 'Forgot Password'}
                </p>
                <p>Welcome back,</p>
                <p>{view === 'login' ? 'Login below to access your account.' : 'Enter your email to reset your password.'}</p>
            </div>

            {view === 'login' ? (
                <Form onFinish={onFinishLogin} form={form} className="pt-7 px-0 !w-full">
                    <Form.Item className="!mb-4" name={'email'}>
                        <Input type="email" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Email address" />
                    </Form.Item>
                    <Form.Item name={'password'}>
                        <Input.Password type="password" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Password" />
                    </Form.Item>
                    <Button htmlType="submit" block type="primary" className="rounded-2xl !shadow-none" loading={isLoading}>
                        Submit
                    </Button>
                </Form>
            ) : (
                <Form onFinish={onFinishForgotPassword} form={form} className="pt-7 px-0 !w-full">
                    <Form.Item className="!mb-4" name={'email'} rules={[{required: true}]}>
                        <Input type="email" className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Email address" />
                    </Form.Item>
                    <Button htmlType="submit" block type="primary" className="rounded-2xl !shadow-none" loading={forgotLoading}>
                        Submit
                    </Button>
                </Form>
            )}

            {view === 'login' && (
                <p className="pt-4 text-sm">
                    <span
                        className="text-gray-800 cursor-pointer"
                        onClick={() => setView('forgot-password')}
                    >
                        Forgot Password?
                    </span>
                </p>
            )}

            {view === 'forgot-password' && (
                <p className="pt-4 text-sm">
                    <span
                        className="text-gray-800 cursor-pointer"
                        onClick={() => setView('login')}
                    >
                        Back to Login
                    </span>
                </p>
            )}
        </div>
    );
};

export default Login;