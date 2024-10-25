import { Button, Form, Input, Modal, Select, message } from "antd";
import { useGetActiveCouponQuery } from "../../../redux/slice/couponApiSlice";
import { errorCheck } from "../../../utils/utils";
import { useAddCouponToCategoryMutation } from "../../../redux/slice/categoryApiSlice";

const { Option } = Select;
const AddCoupon = ({visible, setVisible, category}) => {

    const [form] = Form.useForm();

    const {data, isLoading} = useGetActiveCouponQuery()
    const [addCoupon, {isLoading: submitLoading}] = useAddCouponToCategoryMutation();
    
    const onFinish = async (values) => {
      try {
        const res = await addCoupon({coupon_id:values.coupon, category_id:category.id}).unwrap();
        message.success(res.message);
        form.resetFields();
        setVisible(false)
      } catch (error) {
        errorCheck(error);
      }
    }

  return (
    <Modal
      open={visible}
      title="Add Coupon toBrand"
      okText="Add Coupon"
      cancelText="Cancel"
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="coupon"
          label="Coupon Name"
          rules={[
            {
              required: true,
              message: 'Please select the Coupon!',
            },
          ]}
        >
          <Select
            placeholder="Select Coupon"
            showSearch
            >
            {!isLoading && data.data?.map(coupon => (
                <Option key={coupon.id} value={coupon.id}>{coupon.name}</Option>
            ))}
            </Select>
        </Form.Item>
        <Form.Item
          name="brandDescription"
          label="Category Name"
          initialValue={category.name}
        >
          <Input disabled={true} />
        </Form.Item>
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => setVisible(false)}>Cancel</Button>
          <Button type='primary' htmlType='submit' loading={submitLoading}>Submit</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddCoupon