import { Button, message, Modal } from "antd";
import { errorCheck } from "../../../utils/utils";
import { useDeleteProductMutation } from "../../../redux/slice/productApiSlice";

const DeleteProduct = ({deleteVisible, setDeleteVisible, id, setActiveId}) => {

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleDelete = async () => {
        try {
          const res = await deleteProduct(id).unwrap();
          message.success(res.message);
          setDeleteVisible(false);
          setActiveId(null);
        } catch (error) {
          errorCheck(error);
        }
    }

    return (
        <Modal
        open={deleteVisible}
        title="Delete Product"
        footer={null}
        onCancel={() => {
            setDeleteVisible(false);
        }}
        >
            <div>
                <p>Are you sure you want to delete this Product?</p>
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

export default DeleteProduct