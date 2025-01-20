import { Button, Checkbox, Form, Input, message, Select, Upload } from "antd";
import SingleHeader from "../components/SingleHeader"
import { useState } from "react";
import { useCreateBlogPostMutation } from "../../../redux/slice/blogApiSlice";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { errorCheck } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/slice/productApiSlice";

const PostForm = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [publish, setPublish] = useState(false)

  const navigate = useNavigate()

  const [createPost, {isLoading}] = useCreateBlogPostMutation()
  const { data } = useGetAllProductsQuery({page: 1})

    const onFinish = async (values) => {
        let formData = new FormData();

        if (!fileList.length) {
            message.error("No image selected");
            return;
        } else {
            // Append all originFileObj from fileList to formData
            fileList.forEach((file) => {
                formData.append("media[]", file.originFileObj);  // Append as an array
            });
        }
        Object.keys(values).forEach(key => {
            if (key === 'products') {
              values[key].forEach((slug, index) => {
                  formData.append(`product_slugs[${index}]`, slug);
              });
          } else {
              formData.append(key, values[key]);
          }
        });
        formData.append('is_published', publish ? 1 : 0);
        try {
            const res = await createPost(formData).unwrap();
            message.success(res.message);
            form.resetFields();
            navigate('/admin/blog')
        } catch (error) {
            errorCheck(error);
        }
    }

  return (
    <div>
        <SingleHeader header={'Create Blog Post'} />
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
                <Form.Item
                    name="products"
                    label="Related Products"
                >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select the size"
                  options={data?.data?.map((item) => ({
                    label: item.name,
                    value: item.slug,
                  }))}
                />
              </Form.Item>
                <Form.Item>
                    <Checkbox checked={publish} onChange={(e) => setPublish(e.target.checked)}>Create and Publish</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={isLoading} htmlType="submit" className='py-2 px-6'>
                    Create Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  )
}

export default PostForm