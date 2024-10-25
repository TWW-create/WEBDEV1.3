import { Button, Form, Input, message, Modal, Select } from "antd";
import { errorCheck } from "../../../utils/utils";
import { useGetActiveDiscountQuery } from "../../../redux/slice/discountApiSlice";
import { useAddDiscountToCategoryMutation } from "../../../redux/slice/categoryApiSlice";

const { Option } = Select;

const AddDiscount = ({visible, setVisible, category}) => {

    const [form] = Form.useForm();

    const {data, isLoading} = useGetActiveDiscountQuery();
    const [addDiscount, {isLoading: submitLoading}] = useAddDiscountToCategoryMutation();

    const onFinish = async (values) => {
      try {
        const res = await addDiscount({discount_id: values.discount, category_id: category.id}).unwrap();
        message.success(res.message);
        form.resetFields();
        setVisible(false);
      } catch (error) {
        errorCheck(error);
      }
    };

    return (
      <Modal
        open={visible}
        title="Add Discount to Category"
        okText="Add Discount"
        cancelText="Cancel"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            discount: '',
            categoryName: category.name
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="discount"
            label="Discount Name"
            rules={[
              {
                required: true,
                message: 'Please add Discount!',
              },
            ]}
          >
            <Select
              placeholder="Select Discount"
              showSearch
            >
              {!isLoading && data.data?.map(discount => (
                <Option key={discount.id} value={discount.id}>{discount.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="categoryName"
            label="Category Name"
          >
            <Input disabled={true} />
          </Form.Item>
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button type='primary' htmlType='submit' loading={submitLoading}>Submit</Button>
          </div>
        </Form>
      </Modal>
    );
}

export default AddDiscount;
