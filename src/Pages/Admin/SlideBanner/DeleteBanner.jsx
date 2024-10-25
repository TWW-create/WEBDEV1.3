import { Button, message, Modal } from "antd";
import { errorCheck } from "../../../utils/utils";
import { useDeleteBannerMutation } from "../../../redux/slice/bannerApiSlice";

const DeleteBanner = ({deleteVisible, setDeleteVisible, id}) => {

    const [deleteBanner, { isLoading }] = useDeleteBannerMutation();

    const handleDelete = async () => {
        try {
          const res = await deleteBanner({id}).unwrap();
          message.success(res.message);
          setDeleteVisible(false);
        } catch (error) {
          errorCheck(error);
        }
    }

    return (
        <Modal
        open={deleteVisible}
        title="Delete Banner"
        footer={null}
        onCancel={() => {
            setDeleteVisible(false);
        }}
        >
            <div>
                <p>Are you sure you want to delete this Banner?</p>
                <div className="flex justify-end gap-2 mt-2">
                <Button onClick={() => {
                    setDeleteVisible(false);
                }}>Cancel</Button>
                <Button type='primary' className="!bg-[#F0142F]" htmlType='submit' onClick={() => handleDelete()} loading={isLoading}>Yes, Delete</Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteBanner