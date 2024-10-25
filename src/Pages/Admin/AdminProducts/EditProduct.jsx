import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, Checkbox, message, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SingleHeader from '../components/SingleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProductMutation, useGetSingleProductQuery } from '../../../redux/slice/productApiSlice';
import { useGetCategoriesQuery, useGetCategoryDetailsQuery, useGetSubCategoryDetailsQuery } from '../../../redux/slice/categoryApiSlice';
import { errorCheck } from '../../../utils/utils';


const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const params = useParams()

  const [fileList, setFileList] = useState([]);
  const [featuredFileList, setFeaturedFileList] = useState([]);
  const [selectedCat, setSelectedCat] = useState()
  const [selectedSubCat, setSelectedSubCat] = useState()

  const {data: cat} = useGetCategoriesQuery()
  const {data: subCat, } = useGetCategoryDetailsQuery(selectedCat)
  const {data: productType} = useGetSubCategoryDetailsQuery(selectedSubCat)

  const {data, isLoading} = useGetSingleProductQuery(params.id)

  const [ createProduct, {isLoading: updateLoading} ] = useCreateProductMutation()

    const onFinish = async (values) => {
        let formData = new FormData();

        // Handle file upload
        if (!fileList.length) {
            message.error('Please upload an image');
            return;
        } else {
            formData.append("image_url", fileList[0].originFileObj);
        }

        Object.keys(values).forEach(key => {
          if (key === 'size') {
            values[key].forEach((size, index) => {
                formData.append(`sizes[${index}]`, size);
            });
        } else if (key === 'colors') {
            values[key].forEach((color, index) => {
                formData.append(`colors[${index}]`, color);
            });
        } else {
            formData.append(key, values[key]);
        }
        });
        
        try {
            const res = await createProduct(formData).unwrap();
            message.success(res.message);
            form.resetFields();
            navigate('/admin/products')
        } catch (error) {
            errorCheck(error);
        }
    };

    useEffect(() => {
      if (data) {
  
        form.setFieldsValue({
          name: data?.name,
          description: data?.description,
          price: data?.price,
          creator: data?.creator,
          size: data?.sizes,
          colors: data?.colors,
          qty: data?.qty,
          category_id: data?.category_id,
          sub_category_id: data?.sub_category_id,
          product_type_id: data?.product_type_id,
        });
        setSelectedCat(data?.category_id)
        setSelectedSubCat(data?.sub_category_id)
        // setFileList([
        //   {
        //     uid: '-1',
        //     name: 'image.jpg',
        //     status: 'done',
        //     url: product.image_url,
        //   },
        // ]);
        }
    }, [data, form]);

    
    
    if (isLoading) {
      return(
        <div className="flex justify-center items-center h-[70vh]">
          <Spin size='large' />
        </div>
      )
    }
    

  return (
    <div className="p-4">
      <SingleHeader header={'Add Product'} />
      <div className="">
        <Form form={form} className='' onFinish={onFinish} layout="vertical">
          <div className=" bg-white p-4 rounded-lg shadow-md">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input placeholder='Enter product name' />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input.TextArea placeholder='Enter product description' />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                name="category_id"
                label="Product Category"
                rules={[{ required: true, message: 'Please add the category for this product!' }]}
              >
                <Select
                  onChange={(value) => {
                    setSelectedCat(value)
                    form.setFieldsValue({ sub_category_id: null, product_type_id: null });
                  }}
                  placeholder="Please select the category for this product"
                  options={cat?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="sub_category_id"
                label="Product Sub-Category"
                rules={[{ required: true, message: 'Please add the subcategory for this product!' }]}
              >
                <Select
                  onChange={(value) => {
                    setSelectedSubCat(value)
                    form.setFieldsValue({ product_type_id: null });
                  }}
                  placeholder="Please select the category for this product"
                  options={subCat?.sub_categories?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </div>
            <Form.Item
                name="product_type_id"
                label="Product Type"
                rules={[{ required: true, message: 'Please add the product type for this product!' }]}
              >
                <Select
                  placeholder="Please select the category for this product"
                  options={productType?.product_types?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
              <p className='pb-2'>Featured Image</p>
            <div className=''>
              <div className='m-6'>
                <Upload
                  name='photos'
                  listType='picture'
                  accept='image/*'
                  beforeUpload={() => false}
                  multiple
                  onChange={(info) => {
                    let updatedFileList = [...info.fileList];
                
                    // Only keep successfully uploaded files in the list
                    if (info.file.status === 'removed') {
                      updatedFileList = updatedFileList.filter(file => file.uid !== info.file.uid);
                    }
                    
                    setFeaturedFileList(updatedFileList);
                  }}
                  fileList={featuredFileList}
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
            <p className='pb-2'>Image</p>
            <div className='border border-dotted flex items-center justify-center rounded-xl gap-y-1 py-8 px-8 md:px-0 mb-6'>
              <div className='m-6'>
                <Upload
                  name='photos'
                  listType='picture'
                  accept='image/*'
                  beforeUpload={() => false}
                  multiple
                  onChange={(info) => {
                    let updatedFileList = [...info.fileList];
                
                    // Only keep successfully uploaded files in the list
                    if (info.file.status === 'removed') {
                      updatedFileList = updatedFileList.filter(file => file.uid !== info.file.uid);
                    }
                    
                    setFileList(updatedFileList);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                name="price"
                label="Product Price"
                rules={[{ required: true, message: 'Please input the product price!' }]}
              >
                <InputNumber placeholder='Enter product base price' type='number' style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="qty"
                label="Product Count"
                rules={[{ required: true, message: 'Please input the quantity!' }]}
              >
                <InputNumber placeholder='Enter product quantity' style={{ width: '100%' }} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                name="size"
                label="Size"
                rules={[{ required: true, message: 'Please input the size!' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select the size"
                  options={['XS', 'SM', 'M', 'L', 'XL', 'XXL', 'XXXL']?.map((size) => ({
                    label: size,
                    value: size,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="creator"
                label="Creator"
                rules={[{ required: true, message: 'Please add the creator' }]}
              >
                <Select
                  placeholder="Please select the creator"
                  options={[
                    {
                      value: 'Dior',
                      label: 'Dior',
                    },
                    {
                      value: 'Loius Vuitton',
                      label: 'Loius Vuitton',
                    },
                    {
                      value: 'Versace',
                      label: 'Versace',
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <p className='mb-1'>Product Colors</p>
            <Form.List name="colors" initialValue={['']}>
              {(fields, { add, remove }) => (
                <div className='w-[50%]'>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-4 items-center mb-2">
                      <Form.Item
                        {...restField}
                        name={[name]}
                        rules={[{ required: true, message: 'Please input the color!' }]}
                        className='!mb-2 w-full'
                      >
                        <Input placeholder="Enter product color" />
                      </Form.Item>
                      {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </div>
                  ))}
                  <Form.Item className=''>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                    >
                      Add Color
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
            <Form.Item name="displayNameDesc" valuePropName="checked">
              <Checkbox>Available?</Checkbox>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" loading={updateLoading} htmlType="submit" className='py-2 px-6'>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
