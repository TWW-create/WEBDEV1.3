import { useNavigate, useParams } from "react-router-dom";
import { useGetBannerQuery, useUpdateBannerMutation } from "../../../redux/slice/bannerApiSlice";
import { Button, Checkbox, DatePicker, Form, Input, message, Select, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SingleHeader from "../components/SingleHeader";
import { useEffect, useState } from "react";
import { errorCheck } from "../../../utils/utils";
import dayjs from "dayjs";


const innerLinks = ['Home','Home/Men', 'Home/Women', 'Men', 'Women', 'Accessories', 'Sales'] 
const {Option} = Select;
const UpdateBanner = () => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const { data: bannerData, isLoading } = useGetBannerQuery(id);
    const [updateBanner, {isLoading: updateLoading}] = useUpdateBannerMutation()

    const onFinish = async (values) => {
  
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
      if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
      }
  
      try {
          const res = await updateBanner({data:formData, id}).unwrap();
          message.success(res.message);
          navigate('/admin/banners');
      } catch (error) {
          errorCheck(error);
      }
    };

    console.log(bannerData);
    

    useEffect(() => {
      if (bannerData) {
          form.setFieldsValue({
              title: bannerData?.data?.title || '',  // Ensure title is passed or fallback to empty
              description: bannerData?.data?.content || '',  // Use 'content' for the description field
              locationn: bannerData?.data?.location || '',  // Map location
              duration: [
                  bannerData?.data?.start_date ? dayjs(bannerData.data.start_date) : null,
                  bannerData?.data?.end_date ? dayjs(bannerData.data.end_date) : null
              ],  // Set duration as a range
              displayNameDesc: !!bannerData?.data?.is_active,  // Map is_active to checkbox
          });
      }
  }, [bannerData, form]);

    if (isLoading) return <div className='flex justify-center items-center pt-10'><Spin size='large' /></div>;
    
  return (
    <div>
      <SingleHeader header={'Update Banner'} />
      
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
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UpdateBanner