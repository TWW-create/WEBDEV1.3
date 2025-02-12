import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../../redux/slice/profileApiSlice";

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onFinish = async (values) => {
        try {
            await changePassword(values).unwrap();
            message.success("Password changed successfully!");
            form.resetFields(); 
        } catch (error) {
            message.error("Failed to change password. Please try again.");
        }
    };

    return (
        <div>
            <h1 className="font-bold text-2xl mb-5">Change Password</h1>
            <Form layout="vertical" form={form} className="max-w-sm" onFinish={onFinish}>
                <Form.Item
                    name="current_password"
                    label="Current Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password',
                        },
                    ]}
                >
                    <Input.Password className="p-2" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password',
                        },
                    ]}
                >
                    <Input.Password className="p-2" />
                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    label="Confirm New Password"
                    dependencies={['password']} // This ensures that the validation is triggered when the password field changes
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className="p-2" />
                </Form.Item>
                <Button className="px-5" type="primary" htmlType="submit" loading={isLoading} size="large">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ChangePassword;