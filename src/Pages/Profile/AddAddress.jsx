import { Button, Form, Input, message, Modal, Select } from "antd";
import { useAddUserAddressMutation, useGetCountriesQuery, useUpdateUserAddressMutation } from "../../redux/slice/profileApiSlice";
import { errorCheck } from "../../utils/utils";
import { useEffect } from "react";


const { Option } = Select;
const AddAddress = ({visible, onCancel, data}) => {

    const [form] = Form.useForm();

    const { data: countryData, isLoading: countriesLoading } = useGetCountriesQuery();
    const [ addAddress, { isLoading } ] = useAddUserAddressMutation();
    const [ updateAddress, { isLoading: isLoadingUpdate } ] = useUpdateUserAddressMutation();

    const onFinish = async (values) => {
        if (data) {
            try {
                const res = await updateAddress({data: values, id: data.id}).unwrap();
                message.success(res.message);
                form.resetFields();
                onCancel();
              } catch (error) {
                errorCheck(error);
              }
        }else{
            try {
                const res = await addAddress({...values}).unwrap();
                console.log(res);
                message.success("Address added successfully");
                form.resetFields();
                onCancel();
              } catch (error) {
                errorCheck(error);
              }
        }
    };

    useEffect(() => {
        if(data) {
            form.setFieldsValue(data);
        }
    }, [data, form])
    
  return (
    <div>
        <Modal
            open={visible}
            title={`${data ? 'Update' : 'Add' } Address`}
            footer={null}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="address_1"
                    label="Address"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="address_2"
                    label="Note"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="contact_number"
                    label="Mobile"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name='country'
                    className='!mb-4'
                    label='Country'
                >
                    <Select
                    showSearch
                    className='!h-auto profile-select'
                    >
                    {countryData?.data.map((country) => (
                        <Option key={country.iso2} value={country.name}>
                        {country.name}
                        </Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="city"
                    label="Town/City"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="state_province"
                    label="County"
                >
                    <Input className="p-2" />
                </Form.Item>
                <Form.Item
                    name="zipcode"
                    label="Postal Code"
                >
                    <Input className="p-2" />
                </Form.Item>
                <div className="flex justify-end gap-2 mt-2">
                    <Button onClick={() => {
                            onCancel();
                            form.resetFields();
                        }}>Cancel</Button>
                    <Button type='primary' htmlType='submit' loading={isLoading || isLoadingUpdate}>{data ? 'Update' : 'Submit'}</Button>
                </div>
            </Form>
        </Modal>
    </div>
  )
}

export default AddAddress