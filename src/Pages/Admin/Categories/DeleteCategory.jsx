import { Button, Modal, message } from "antd";
import { errorCheck } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../../redux/slice/categoryApiSlice";

const DeleteCategory = ({deleteVisible, setDeleteVisible, category}) => {

  const [updateCategory, { isLoading }] = useDeleteCategoryMutation();

  const navigate = useNavigate()


    const handleDelete = async () => {
        try {
          const res = await updateCategory({id:category.id}).unwrap();
          message.success(res.message);
          setDeleteVisible(false);
          navigate('/categories')
        } catch (error) {
          errorCheck(error);
        }
      }
  return (
    <Modal
      open={deleteVisible}
      title="Delete Category"
      footer={null}
      onCancel={() => {
        setDeleteVisible(false);
      }}
    >
      <div>
        <p>Are you sure you want to delete this Category?</p>
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

export default DeleteCategory