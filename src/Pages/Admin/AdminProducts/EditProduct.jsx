import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, message, Spin } from 'antd';
import SingleHeader from '../components/SingleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductMediaMutation, useGetSingleProductQuery, useUpdateProductMutation } from '../../../redux/slice/productApiSlice';
import { useGetCategoriesQuery, useGetCategoryDetailsQuery, useGetSubCategoryDetailsQuery } from '../../../redux/slice/categoryApiSlice';
import { errorCheck } from '../../../utils/utils';
import { FiTrash2 } from 'react-icons/fi';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useGetCreatorsQuery } from '../../../redux/slice/creatorApiSlice';


const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const params = useParams()

  const [featuredFileList, setFeaturedFileList] = useState([]);
  const [selectedCat, setSelectedCat] = useState()
  const [selectedSubCat, setSelectedSubCat] = useState()
  const [deleteMediaVisible, setDeleteMediaVisible] = useState(null);
  

  const {data: cat, isLoading: catLoading} = useGetCategoriesQuery()
  const {data: subCat, isLoading: subCatLoading } = useGetCategoryDetailsQuery(selectedCat)
  const {data: productType, isLoading: productLoading} = useGetSubCategoryDetailsQuery(selectedSubCat)
  const { data: creator } = useGetCreatorsQuery()


  const {data, isLoading} = useGetSingleProductQuery(params.id)  

  const [ updateProduct, {isLoading: updateLoading} ] = useUpdateProductMutation()

  const [deleteImage, {isLoading: deleteLoading}] = useDeleteProductMediaMutation()

  const handleDeleteMedia = async (mediaId) => {
    try {
      const res = await deleteImage(mediaId).unwrap();
      message.success(res.message);
      setDeleteMediaVisible(false);
    } catch (error) {
      errorCheck(error);
    }
  };

  const onFinish = async (values) => {
    let formData = new FormData();
  
    // Add featured image
    if (featuredFileList.length) {
      formData.append("featured_image", featuredFileList[0].originFileObj);
    }
  
    // Append other fields
    Object.keys(values).forEach((key) => {
      if (key === 'variants') {
        values[key].forEach((variant, index) => {
          if (variant.id) {
            formData.append(`variants[${index}][id]`, variant.id);
          }
          formData.append(`variants[${index}][color]`, variant.color);
          formData.append(`variants[${index}][stock]`, variant.stock);
          variant?.sizes.forEach((size, sizeIndex) => {
            formData.append(`variants[${index}][sizes][${sizeIndex}]`, size);
          });
          if (variant?.images?.fileList) {
              variant?.images?.fileList.forEach((image, imgIndex) => {
                formData.append(`variants[${index}][images][${imgIndex}]`, image.originFileObj);
              });
          }
        });
      } else {
        formData.append(key, values[key]);
      }
    });
  
    try {
      const res = await updateProduct({ data: formData, id: params.id }).unwrap();
      message.success(res.message);
      form.resetFields();
      navigate("/admin/products");
    } catch (error) {
      errorCheck(error);
    }
  };
  

    useEffect(() => {
      if (data?.data?.product) {
        const product = data.data.product;
        console.log(product.creator_id);
        
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          price: product.price,
          creator: product.creator_id,
          composition: product.composition,
          shipping_details: product.shipping_details,
          category_id: product.category_id,
          sub_category_id: product.sub_category_id,
          product_type_id: product.product_type_id,
          variants: product.variants.map((variant) => ({
            color: variant.color,
            sizes: variant.sizes,
            stock: variant.stock,
            id: variant.id,
          })),
        });
    
        setSelectedCat(product.category_id);
        setSelectedSubCat(product.sub_category_id);
      }
    }, [data, form]);
    
    if (isLoading && catLoading && subCatLoading && productLoading) {
      return(
        <div className="flex justify-center items-center h-[70vh]">
          <Spin size='large' />
        </div>
      )
    }
    

  return (
    <div className="p-4">
      <SingleHeader header={'Update Product'} />
      <div className="">
        <div className=" bg-white p-4 rounded-lg shadow-md mb-10">
        <div className="mt-6">
          <h3 className="text-xl font-bold">Featured Image</h3>
          <div>
            <img 
              src={"https://api-baraweb.bam-techservices.com/storage" + "/" + data?.data?.product?.featured_image} 
              alt={`Media ${data?.id}`} 
              className="w-full lg:w-4/12 h-60 object-cover rounded" 
            />
          </div>
        </div>
        {data?.data?.product?.images?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {data?.data?.product?.images.map((mediaItem) => (
                  <div key={mediaItem.id} className="relative">
                    <img 
                      src={"https://api-baraweb.bam-techservices.com/storage" + "/" + mediaItem.image_path} 
                      alt={`Media ${mediaItem.id}`} 
                      className="w-full h-60 object-cover rounded" 
                    />
                    <button
                      className="absolute top-2 right-2 text-red-500 bg-white/70 p-1 rounded-sm border border-white"
                      onClick={() => setDeleteMediaVisible(mediaItem.id)} // Set delete state for media
                    >
                      <FiTrash2 size={20} />
                    </button>
                    {/* Display delete confirmation for media */}
                    {deleteMediaVisible === mediaItem.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
                        <div className="bg-white p-4 rounded-lg">
                          <p>Are you sure you want to delete this image?</p>
                          <div className="flex space-x-2 mt-2">
                            <Button
                              type="primary"
                              danger
                              onClick={() => handleDeleteMedia(mediaItem.id)}
                              loading={deleteLoading}
                            >
                              Delete
                            </Button>
                            <Button onClick={() => setDeleteMediaVisible(null)}>Cancel</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
                  options={subCat?.data?.sub_categories?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </div>
            <Form.Item name={'composition'} label="Product Composition">
              <Input.TextArea placeholder='Enter product composition' />
            </Form.Item>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                name="price"
                label="Product Price"
                rules={[{ required: true, message: 'Please input the product price!' }]}
              >
                <InputNumber placeholder='Enter product base price' type='number' style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="creator"
                label="Creator"
                rules={[{ required: true, message: 'Please add the creator' }]}
              >
                <Select
                  placeholder="Please select the creator"
                  options={creator?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
          <p className="pt-5">Variants</p>
            <Form.List name="variants" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border p-4 mb-4 rounded">
                      <div className="flex justify-between items-center">
                        <h4>Variant {key + 1}</h4>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                      <Form.Item
                        {...restField}
                        name={[name, 'color']}
                        label="Color"
                        rules={[{ required: true, message: 'Please input the color!' }]}
                      >
                        <Input placeholder="Enter color" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'stock']}
                        label="Stock Number"
                        rules={[{ required: true, message: 'Please input the stock Number!' }]}
                      >
                        <Input placeholder="Enter stock number" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'sizes']}
                        label="Sizes"
                        rules={[{ required: true, message: 'Please select sizes!' }]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select sizes"
                          options={['XS', 'SM', 'M', 'L', 'XL', 'XXL'].map((size) => ({
                            label: size,
                            value: size,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'images']}
                        label="Images"
                        // rules={[{ required: true, message: 'Please upload images!' }]}
                      >
                        <Upload
                          name="photos"
                          listType="picture"
                          accept="image/*"
                          beforeUpload={() => false}
                          multiple
                          onChange={(info) => {
                            const updatedFileList = [...info.fileList];
                            form.setFields([
                              {
                                name: [name, 'images'],
                                value: updatedFileList,
                              },
                            ]);
                          }}
                        >
                          <Button type="button" size="large">
                            Upload photos
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Variant
                  </Button>
                </>
              )}
            </Form.List>

          <Form.Item>
            <Button type="primary" loading={updateLoading} htmlType="submit" className='py-3 px-8 mt-5'>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
