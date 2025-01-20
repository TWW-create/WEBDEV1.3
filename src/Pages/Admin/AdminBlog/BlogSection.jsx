import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';
import DeleteBlogPost from './DeleteBlogPost';
import { BASE_URL, IMAGE_BASE_URL } from '../../../utils/apiConstants';

const BlogSection = ({ blogs }) => {

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {blogs?.length > 0 ? (
        blogs.map((blog, index) => (
          <BlogItem key={index} blog={blog} />
        ))
      ) : (
        <div className="text-gray-500 text-center w-full py-10">
          You have no blog items to display
        </div>
      )}
    </div>
  );
};

const BlogItem = ({ blog }) => {

  const navigate = useNavigate()

  const [deleteVisible, setDeleteVisible] = useState(false);
  // Find the category name based on the category ID

  return (
    <div className="border rounded-md shadow-sm bg-white">
      {/* Image Container */}
      <div className="relative">
        {/* Full-width Image without padding */}
        <img
          src={IMAGE_BASE_URL+ "/" + blog?.media[0]?.file_path}  // Fallback to default image if `blog.image` is null
          alt={blog.title}
          className="w-full h-52 object-cover rounded-t-md"
        />
        <div className='top-2 px-2 py-1 rounded-md bg-white/80 border absolute inline-flex items-center justify-end right-2 '>

          {/* Edit and Delete Icons */}
          <div className="flex space-x-2">
            <FiEdit className="text-blue-500 cursor-pointer" onClick={() => navigate(`/admin/blog/edit/${blog.id}`)} />
            <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => setDeleteVisible(true)} />
          </div>
        </div>

        {/* Publish/Unpublish Button at the bottom-right corner of the image */}
        {/* <Button
          className="absolute bottom-2 right-2"
          type="primary"
          size="small"
        >
          {blog.isPublished === 1 ? 'Unpublish' : 'Publish'}
        </Button> */}
      </div>

      {/* Content with padding */}
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
        <p className="text-gray-600 text-sm mb-3">{blog.description}</p>

        <div className="flex justify-between items-center">
          <Link to={`/admin/blog/${blog.id}`} className='text-[#1E5EFF]'>Read More</Link>
          <span className="text-gray-400 text-sm">{dayjs(blog.updated_at).format('YYYY-MM-DD')}</span>
        </div>
      </div>
      <DeleteBlogPost deleteVisible={deleteVisible} setDeleteVisible={setDeleteVisible} id={blog.id} />
    </div>
  );
};

export default BlogSection;
