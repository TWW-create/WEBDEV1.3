import { Button, Form, Input, message, Spin } from "antd"
import { useGetReturnPolicyQuery, useGetShippingPolicyQuery, useStoreReturnPolicyMutation, useStoreShippingPolicyMutation } from "../../../redux/slice/settingsApiSlice"
import { errorCheck } from "../../../utils/utils"
import { useEffect } from "react"

const AdminSettings = () => {

    const [form] = Form.useForm()

    const { data: shippingData, isLoading: shippingLoading } = useGetShippingPolicyQuery()
    const { data: returnData, isLoading: returnLoading } = useGetReturnPolicyQuery()

    const [ storeShipping, {isLoading: storeShippingLoading}] = useStoreShippingPolicyMutation()
    const [ storeReturn, {isLoading: storeReturnLoading}] = useStoreReturnPolicyMutation()

    const onFinish = async (values) => {
        try {
            if (values.shipping_details) {
                await storeShipping({ content: values.shipping_details}).unwrap();
            }
            if (values.return_details) {
                await storeReturn({ content: values.return_details}).unwrap();
            }
            message.success('Policy Updated Successfully')
        } catch (error) {
            errorCheck(error)
        }
    };

    useEffect(() => {
      if (shippingData) {
        form.setFieldsValue({ shipping_details: shippingData?.data?.content })
      }
      if (returnData) {
        form.setFieldsValue({ return_details: returnData?.data?.content })
      }
    }, [form, returnData, shippingData])
    
    
    
  return (
    <div>
        <Spin spinning={shippingLoading || returnLoading}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item name={'shipping_details'} label='Shipping Policy'>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name={'return_details'} label='Return Policy'>
                    <Input.TextArea />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={storeReturnLoading || storeShippingLoading}>Save Changes</Button>
            </Form>
        </Spin>
    </div>
  )
}

export default AdminSettings