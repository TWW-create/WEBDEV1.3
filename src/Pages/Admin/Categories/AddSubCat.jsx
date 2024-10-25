import { Modal, Form, Input, Button, message } from 'antd';
import { errorCheck } from '../../../utils/utils';
import { useCreateSubCategoryMutation } from '../../../redux/slice/categoryApiSlice';


const AddSubCat = ({visible, onCancel, category}) => {

    const [form] = Form.useForm();

    const [createCategory, { isLoading }] = useCreateSubCategoryMutation();


    const onFinish = async (values) => {
        const payload = {
            name: values.name,
            category_id: category.id
        }
        try {
          const res = await createCategory(payload).unwrap();
          message.success("Sub Category Created Successfully");
          form.resetFields();
          onCancel();
        } catch (error) {
          errorCheck(error);
        }
      }


  return (
    <div>
        <Modal
            open={visible}
            title="Add Sub Category"
            okText="Add Category"
            cancelText="Cancel"
            footer={null}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    categoryName: category.name
                }}
                onFinish={onFinish}
            >
                <Form.Item
                name="name"
                label="SubCategory Name"
                rules={[
                    {
                    required: true,
                    message: 'Please input the Category name!',
                    },
                ]}
                >
                <Input placeholder="Doir" />
                </Form.Item>
                <Form.Item
                    name="categoryName"
                    label="Category Name"
                    >
                    <Input disabled={true} />
                    </Form.Item>
                <div className="flex justify-end gap-2 mt-2">
                    <Button onClick={() => {
                            onCancel();
                            form.resetFields();
                        }}>Cancel</Button>
                    <Button type='primary' htmlType='submit' loading={isLoading}>Submit</Button>
                </div>
            </Form>
        </Modal>
    </div>
  )
}

export default AddSubCat