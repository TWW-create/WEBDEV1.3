import { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { errorCheck } from '../../../utils/utils';
import { useUpdateCategoryMutation } from '../../../redux/slice/categoryApiSlice';

const EditCategory = ({ visible, setVisible, category }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();


  useEffect(() => {
    if (visible && category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
      setFileList([]);
    }
  }, [visible, category, form]);

  const onFinish = async (values) => {
    let formData = new FormData();
    if (fileList.length > 0) {
      formData.append("logo_url", fileList[0]?.originFileObj);
    }
    for (const key in values) {
      if (key in values) {
        formData.append(`${key}`, values[key]);
      }
    }    
    try {
      const res = await updateCategory({data: formData, id:category.id}).unwrap();
      message.success(res.message);
      form.resetFields();
      setFileList([]);
      setVisible(false);
    } catch (error) {
      errorCheck(error);
    }
  }

  return (
    <Modal
      open={visible}
      title="Edit Brand"
      footer={null}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
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
          name="name"
          label="Category Name"
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
          name="description"
          label="Category Description"
          rules={[
            {
              required: true,
              message: 'Please input the Category description!',
            },
          ]}
        >
          <Input placeholder="Doir is the best Category" />
        </Form.Item>
        <p className='pb-2'>Category Photo</p>
        <div className='border border-dotted flex items-center justify-center rounded-xl gap-y-1 py-8 px-8 md:px-0'>
            <div className='mt-6'>
                <Upload
                    name='photos'
                    listType='picture'
                    accept='image/*'
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={(info) => {
                      if (info.file.status === 'removed') {
                        setFileList([]);
                        return;
                      }
                      setFileList(info.fileList);
                    }}
                    fileList={fileList}
                >
                    <Button
                    htmlType='button'
                    size='large'
                    block
                    className='py-2 px-5 text-[#1E5EFF] font-semibold hover:!font-semibold text-xs'
                    >
                    Upload photo
                    </Button>
                </Upload>
            </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => {
                setVisible(false);
                form.resetFields();
            }}>Cancel</Button>
          <Button type='primary' htmlType='submit' loading={isLoading}>Submit</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCategory;
