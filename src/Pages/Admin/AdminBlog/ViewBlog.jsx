import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBlogMediaMutation, useGetBlogPostQuery } from "../../../redux/slice/blogApiSlice";
import { Button, message, Spin } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import dayjs from "dayjs";
import DeleteBlogPost from "./DeleteBlogPost";
import { errorCheck } from "../../../utils/utils";

const ViewBlog = () => {
  const { id } = useParams();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteMediaVisible, setDeleteMediaVisible] = useState(null); // Track which media to delete
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlogPostQuery(id);

  const [deleteImage, {isLoading: deleteLoading}] = useDeleteBlogMediaMutation()

  const handleDeleteMedia = async (mediaId) => {
    try {
      const res = await deleteImage(mediaId).unwrap();
      message.success(res.message);
      setDeleteMediaVisible(false);
    } catch (error) {
      errorCheck(error);
    }
  };

  const blog = data;


  if (isLoading) return <div className='flex justify-center items-center pt-10'><Spin size='large' /></div>;

  return (
    <div>
      <div className="flex md:gap-0 flex-row items-center justify-between py-5">
        <div className='flex flex-wrap flex-row gap-2 items-center'>
          <p onClick={() => navigate(-1)} className='flex items-center gap-1 cursor-pointer hover:text-light-secondary whitespace-nowrap'>
            <IoIosArrowBack /> Go Back
          </p>
        </div>
      </div>

      <div className="bg-white">
        {/* <img src={blog?.img_url} alt={blog?.title} className='w-full h-96 object-cover object-center' /> */}
        <div className="p-3 md:p-7 lg:p-12">
          <div className="flex items-center justify-between mb-4">
            <div className='px-4 py-1 rounded-md bg-white/80 border'>
              <span className="text-[#131523] text-sm">{dayjs(blog.created_at).format('DD MMMM, YYYY')}</span>
            </div>
            <div className='px-2 py-1 rounded-md bg-white/80 border flex items-center justify-between gap-20'>
              {/* Edit and Delete Icons */}
              <div className="flex space-x-2">
                <FiEdit className="text-blue-500 cursor-pointer" onClick={() => navigate(`/admin/blog/edit/${blog.id}`)} />
                <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => setDeleteVisible(true)} />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#131523] tracking-tight mb-7">
            {blog.title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Media Images */}
          {blog.media?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {blog.media.map((mediaItem) => (
                  <div key={mediaItem.id} className="relative">
                    <img 
                      src={"https://api-baraweb.bam-techservices.com/storage" + "/" + mediaItem.file_path} 
                      alt={`Media ${mediaItem.id}`} 
                      className="w-full h-48 object-cover rounded" 
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
      </div>
      <DeleteBlogPost deleteVisible={deleteVisible} setDeleteVisible={setDeleteVisible} id={blog.id} />
    </div>
  );
};

export default ViewBlog;
