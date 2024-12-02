import { useGetProfileQuery, useGetUserAddressesQuery, useSetDeliveryAddressMutation } from "../../redux/slice/profileApiSlice";
import { Button, Checkbox, message } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddAddress from "./AddAddress";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { data, isLoading } = useGetProfileQuery();
  const { data: addresses, isLoading: isLoadingAddress } = useGetUserAddressesQuery(user.id);
  const [setDeliveryAddress, { isLoading: isLoadingDelivery }] = useSetDeliveryAddressMutation();

  const userData = data?.data?.user;

  const handleSetDeliveryAddress = async (addressId) => {
    setSelectedAddressId(addressId); // Optimistic update
    try {
      await setDeliveryAddress(addressId);
      message.success("Delivery address set successfully.");
    } catch (error) {
      message.error("Failed to set delivery address.");
      setSelectedAddressId(null); // Revert state in case of error
    }
  };

  return (
    <div>
      <div className="mb-9">
        <h1 className="font-bold text-2xl">Profile Information</h1>
        <div className="grid grid-cols-3 mt-5">
          <div>
            <p className="text-sm font-medium text-black/80">First Name</p>
            <p>{userData?.first_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-black/80">Last Name</p>
            <p>{userData?.last_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-black/80">Email</p>
            <p>{userData?.email}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Addresses</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
            Add Address
          </Button>
        </div>
        <div className="mt-5">
          {addresses?.data?.length === 0 && <p className="text-gray-500">You haven&apos;t added any address yet</p>}
          {isLoadingAddress && <p>Loading addresses...</p>}
          {addresses?.data?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5">
              {addresses?.data?.map((address, index) => (
                <div key={address.id} className="border border-gray-300 p-4 rounded-md mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-lg">Address {index + 1}</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setAddress(address);
                        setVisible(true);
                      }}
                    >
                      <EditOutlined />
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-black/80">Address:</p>
                    <p>{address.address_1}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-black/80">Optional:</p>
                    <p>{address.address_2}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-black/80">Phone Number:</p>
                    <p>{address.contact_number}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-black/80">Country:</p>
                      <p>{address.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black/80">Town/City:</p>
                      <p>{address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black/80">County:</p>
                      <p>{address.state_province}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black/80">Postal Code:</p>
                      <p>{address.zipcode}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Checkbox
                      checked={selectedAddressId === address.id}
                      onChange={() => handleSetDeliveryAddress(address.id)}
                      disabled={isLoadingDelivery && selectedAddressId === address.id}
                    >
                      Set as Delivery Address
                    </Checkbox>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddAddress
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setAddress(null);
        }}
        data={address}
      />
    </div>
  );
};

export default ProfileInfo;
