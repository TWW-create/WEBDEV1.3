import { Form, Input, Button, message } from 'antd';
import LOGO from '../../assets/images/logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassMutation } from '../../redux/slice/authApiSlice';
import { errorCheck } from '../../utils/utils';

const ResetPassword = () => {

  const {token} = useParams();
  const navigate = useNavigate();

  const [ resetPassword, {isLoading}] = useResetPassMutation()
  

  const onFinish = async (values) => {

    const payload = {
      ...values,
      token
    }
    
    try {
      const res = await resetPassword(payload).unwrap();
      message.success(res.message);
      navigate('/')
    } catch (error) {
      errorCheck(error)
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full h-screen flex flex-col justify-center items-center p-5 md:p-0">
      <img src={LOGO} alt="Logo" className='w-[150px] object-cover object-center mb-2' />
      <div className='w-full md:w-[500px] bg-white rounded-md p-5'>
        <h1 className='text-center text-2xl font-bold text-[#222222] pb-2'>Reset Your Password</h1>
        <Form
          layout='vertical'
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input className='p-2' />
          </Form.Item>
          
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password className='p-2' />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password className='p-2' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className='w-full !shadow-none py-2' loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* <p className='text-center text-sm text-[#595964]'>Remembered your password? <Link to={'/login'} className='font-bold'>Sign In</Link></p> */}
      </div>
    </div>
  );
}

export default ResetPassword;
