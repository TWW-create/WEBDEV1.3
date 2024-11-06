// import { Button } from "antd";
import { useState } from 'react';
import { useGetBlogPostsQuery } from '../../redux/slice/blogApiSlice';
import BlogCard from './Components/BlogCard';
import { IMAGE_BASE_URL } from '../../utils/apiConstants';
import dayjs from 'dayjs';
import { Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const stripHtmlTags = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

// Utility function to truncate text to 20 words
const truncateText = (text, wordLimit) => {
    const plainText = stripHtmlTags(text);

      const words = typeof plainText === "string" ? plainText.split(" ") : [];
  
  if (words.length > wordLimit) {
    const truncatedText = words.slice(0, wordLimit).join(" ") + "...";
    return `<div>${truncatedText}</div>`;
  }
  
  return text;
  };
  
  const BlogItem = ({ title, description, image, date, id }) => {
    const truncatedDescription = truncateText(description, 20);

    return (
      <div className="bg-white mb-6 max-w-sm md:max-w-lg w-[512px] shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="p-10 text-center">
            {/* <p className="text-xs mb-2">{category}</p> */}
            <h2 className="text-lg font-medium mb-2 uppercase">{title}</h2>
            <p className="text-xs">{dayjs(date).format('DD/MM/YYYY')}</p>
          </div>
          <img src={image} alt={title} className="w-full object-cover object-center h-[500px]" />
          <div className="flex-1">
            <p className="text-sm mb-4 p-7">
            <span dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
            <Link to={`/blog/${id}`}>
              <span className="uppercase font-medium cursor-pointer"> Continue Reading</span>
            </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  
const MainBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetBlogPostsQuery({ page: currentPage, per_page: 10 }); 

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  if (isLoading) return <div className='flex justify-center items-center h-[50vh] xl:h-[30vh]'><Spin /></div>;
    
      return (
        <div className=" pt-28">
            <div className='flex flex-col md:flex-row justify-center items-center mb-10 px-3'>
              {data?.data.slice(0,3).map((blog, index) => {
                return (
                  <BlogCard
                    key={index}
                    title={blog.title}
                    image={IMAGE_BASE_URL + "/" + blog?.media[0]?.file_path}
                    id={blog.id}
                  />
                );
              })}
            </div>
            <div className="flex justify-center items-center flex-col">
                {data?.data?.map((blog, index) => (
                <BlogItem
                    key={index}
                    title={blog.title}
                    description={blog.content}
                    image={IMAGE_BASE_URL + "/" + blog?.media[0]?.file_path}
                    date={blog.updated_at}
                    id={blog.id}
                    // category={blog.category}
                    // comments={blog.comments}
                />
                ))}
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

BlogItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number.isRequired,
};

export default MainBlog