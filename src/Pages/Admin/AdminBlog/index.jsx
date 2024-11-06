import { Button, Spin, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import BlogSection from "./BlogSection";
import { useGetBlogPostsQuery } from "../../../redux/slice/blogApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetBlogPostsQuery({ page: currentPage, per_page: 10 }); 
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page); 
    };

    if (isLoading) return <div className='flex justify-center items-center pt-10'><Spin size='large' /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog</h2>
                <Button type='primary' className="rounded-sm flex gap-2 items-center" onClick={() => navigate('/admin/blog/add')}>
                    <FaPlus />
                    <span>Create New Post</span>
                </Button>
            </div>

            <div className="md:col-span-2">
                <BlogSection blogs={data?.data} />
            </div>

            {data?.total > 0 && ( 
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage} 
                        pageSize={data?.per_page} 
                        total={data?.total} 
                        onChange={handlePageChange} 
                        showSizeChanger={false} 
                    />
                </div>
            )}
        </div>
    );
};

export default AdminBlog;
