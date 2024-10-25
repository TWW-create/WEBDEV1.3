import { Button, message, Modal } from "antd";
import { useDeleteBlogPostMutation } from "../../../redux/slice/blogApiSlice";
import { errorCheck } from "../../../utils/utils";

const DeleteBlogPost = ({deleteVisible, setDeleteVisible, id}) => {

    const [deletePost, { isLoading }] = useDeleteBlogPostMutation();

    const handleDelete = async () => {
        try {
          const res = await deletePost({id}).unwrap();
          message.success(res.message);
          setDeleteVisible(false);
        } catch (error) {
          errorCheck(error);
        }
    }

    return (
        <Modal
        open={deleteVisible}
        title="Delete Blog Post"
        footer={null}
        onCancel={() => {
            setDeleteVisible(false);
        }}
        >
            <div>
                <p>Are you sure you want to delete this Post?</p>
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

export default DeleteBlogPost