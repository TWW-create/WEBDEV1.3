import { Form, Input, Button, Upload, Checkbox, Select, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SingleHeader from "../components/SingleHeader";
import { useState } from 'react';
import { useCreateBannerMutation } from '../../../redux/slice/bannerApiSlice';
import { errorCheck } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';


const innerLinks = ['Home','Home/Men', 'Home/Women', 'Men', 'Women', 'Accessories', 'Sales']
const {Option} = Select;
const AddBanner = () => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const [ createBanner, {isLoading} ] = useCreateBannerMutation()

    const navigate = useNavigate();

    const onFinish = async (values) => {
      if (!fileList.length) {
          message.error('Please upload a banner image'); 
          return;
      }
  
      // Create a new FormData instance
      let formData = new FormData();
  
      // Extract the start and end dates from the date picker
      const [start_date, end_date] = values.duration || [];
  
      // Prepare the data structure
      let formattedData = {
          title: values.title,
          location: values.locationn,
          start_date: start_date ? start_date.format('YYYY-MM-DD') : null,
          end_date: end_date ? end_date.format('YYYY-MM-DD') : null,
          is_active: values.displayNameDesc ? 1 : 0
      };
  
      // Append the formatted data to formData
      Object.keys(formattedData).forEach(key => {
          formData.append(key, formattedData[key]);
      });

      if (values.description) {
        formData.append('content', values.description);
      }
  
      // Append the file separately
      formData.append('image', fileList[0].originFileObj);
  
      try {
          const res = await createBanner(formData).unwrap();
          message.success(res.message);
          navigate('/admin/banners');
      } catch (error) {
          errorCheck(error);
      }
    };
  
  

  return (
    <div>
      <SingleHeader header={'Add Banner'} />
      
      <div className="bg-white p-6 ">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Slide Title */}
          <Form.Item label="Banner Title" name="title" rules={[{ required: true, message: 'Please input the banner title!' }]}>
            <Input placeholder="Fast Charge Wireless Clipper" />
          </Form.Item>

          {/* Slide Description */}
          <Form.Item label="Banner Description" name="description">
            <Input placeholder="Buy two get one free, do not miss out on this offer!" />
          </Form.Item>

          {/* Banner Image */}
          <Form.Item label="Banner Image">
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
              <Button icon={<UploadOutlined />}>Add File</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Banner Location" name="locationn" rules={[{ required: true, message: 'Please select a banner location!' }]}>
              <Select 
                  placeholder='Select a post category' 
                  allowClear
                  showSearch 
                  className='capitalize'
              >
                  {innerLinks?.map(link => (
                      <Option key={link} value={link} className='capitalize'>{link}</Option>
                  ))}
              </Select>
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Please set the duration!' }]}
            className='mb-2'
            >
            <DatePicker.RangePicker style={{ width: '100%' }} allowEmpty />
          </Form.Item>

          {/* Display Name and Description on Slider */}
          <Form.Item name="displayNameDesc" valuePropName="checked">
            <Checkbox>Display Banner</Checkbox>
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBanner;
