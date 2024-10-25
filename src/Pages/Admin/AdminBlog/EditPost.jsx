import { Button, Form, Input, message, Spin, Upload } from "antd";
import SingleHeader from "../components/SingleHeader";
import { useState, useEffect } from "react";
import { useGetBlogPostQuery, useUpdateBlogPostMutation } from "../../../redux/slice/blogApiSlice";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { errorCheck } from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading: postLoading } = useGetBlogPostQuery(id);
  const [updatePost, { isLoading }] = useUpdateBlogPostMutation();

  // Prefill form when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.title,
        content: data?.content,
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    let formData = new FormData();

    if (fileList.length > 0) {
        // Append all originFileObj from fileList to formData
        fileList.forEach((file) => {
            formData.append("media[]", file.originFileObj);  // Append as an array
        });
    }
    Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
    });
    try {
        const res = await updatePost({data:formData, id}).unwrap();
        message.success(res.message);
        form.resetFields();
        navigate('/admin/blog')
    } catch (error) {
        errorCheck(error);
    }
}

  if (postLoading) return <div className='flex justify-center items-center pt-10'><Spin size='large' /></div>;

  return (
    <div>
        <SingleHeader header={'Update Blog Post'} />
        <div className="bg-white p-6">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <p className='pb-2'>Image</p>
                <div className='border border-dotted flex items-center justify-center rounded-xl gap-y-1 py-8 px-8 md:px-0 mb-6'>
                    <div className='m-6'>
                        <Upload
                        name='photos'
                        listType='picture'
                        accept='image/*'
                        beforeUpload={() => false}
                        maxCount={4}
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
                    name="title"
                    label="Post Title"
                    rules={[{ required: true, message: 'Please input the post title!' }]}
                    >
                    <Input placeholder='Learn How to Drive in 30mins' />
                </Form.Item>
                <Form.Item label="Post Content" name="content" className="h-48" rules={[{ required: true, message: 'Please enter post content!' }]}>
                    <ReactQuill 
                        modules={{
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, { font: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'blockquote', 'code-block'],
                            [{ align: [] }],
                            [{ color: [] }, { background: [] }],
                            ['clean'],
                        ],
                        }}
                        formats={[
                        'header',
                        'font',
                        'bold',
                        'italic',
                        'underline',
                        'list',
                        'bullet',
                        'link',
                        'blockquote',
                        'code-block',
                        'align',
                        'color',
                        'background',
                        ]}
                        placeholder="Put your content here..."
                        className="h-32"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={isLoading} htmlType="submit" className='py-2 px-6'>
                    Update Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  );
};

export default EditPost;
