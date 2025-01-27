import { Button, Form, Input, message, Upload } from "antd";
import { useState } from "react";
import SingleHeader from "../components/SingleHeader";
import { errorCheck } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAddCreatorsMutation } from "../../../redux/slice/creatorApiSlice";

const AddCreator = () => {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [createCreator, {isLoading}] = useAddCreatorsMutation()

  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    let formData = new FormData();
    if (!fileList.length) {
        message.error("No image selected");
        return;
    } else {
        // Append all originFileObj from fileList to formData
        fileList.forEach((file) => {
            formData.append("image", file.originFileObj);  // Append as an array
        });
    }
    Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
    });
    try {
        const res = await createCreator(formData).unwrap();
        message.success(res.message);
        form.resetFields();
        navigate('/admin/creators')
    } catch (error) {
        errorCheck(error);
    }
  }

  return (
    <div>
      <SingleHeader header={'Add Creator'} />
      <div className="bg-white p-6">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <p className='pb-2'>Image</p>
            <div className='border border-dotted flex items-center justify-center rounded-xl gap-y-1 py-8 px-8 md:px-0 mb-6'>
                <div className='m-6'>
                    <Upload
                    name='photos'
                    listType='picture'
                    accept='image/*'
                    multiple={false}
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
            <Form.Item
                name="name"
                label="Creator Name"
                rules={[{ required: true, message: 'Please input the creator name!' }]}
                >
                <Input  />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
                >
                  <Input.TextArea rows={4} placeholder='' />
            </Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" className='py-2 px-6'>Submit </Button>
        </Form>
      </div>
    </div>
  )
}

export default AddCreator