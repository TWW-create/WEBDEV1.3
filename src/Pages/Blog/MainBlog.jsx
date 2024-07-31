// import { Button } from "antd";
import image1 from '../../assets/images/shopm.png';
import image2 from '../../assets/images/shopw.png';
import BlogCard from './Components/BlogCard';

// Utility function to truncate text to 20 words
const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  
  const BlogItem = ({ title, description, image, category, comments }) => {
    const truncatedDescription = truncateText(description, 20);
  
    return (
      <div className="bg-white mb-6 max-w-sm md:max-w-lg shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <div className="p-10 text-center">
            <p className="text-xs mb-2">{category}</p>
            <h2 className="text-lg font-medium mb-2">{title}</h2>
            <p className="text-xs">07/10/24</p>
          </div>
          <img src={image} alt={title} className="w-full object-cover object-center h-[500px]" />
          <div className="flex-1">
            <p className="text-sm mb-4 p-7">
              {truncatedDescription}
              {description.split(' ').length > 20 && <span className="uppercase font-medium cursor-pointer"> Continue Reading</span>}
            </p>
          </div>
        </div>
      </div>
    );
  };

  
const MainBlog = () => {
    const blogs = [
        {
          title: "Unpopular Opinion: Layering is Overrated",
          description: "I get it. I see everyone loves summer and the clothes that go along with it. I can barely contain my excitement to",
          image: image1,
          category: "Rant",
          comments: 19,
        },
        {
          title: "No One Asked, But Here's How I Switch Between Bags Easily",
          description: "Yeah, gym bras are still a no. Often hard to take. Some decisions that somehow work around 2021",
          image: image2,
          category: "Daily Outfits",
          comments: 2,
        },
        {
          title: "Summer Camp Vibes, But Make It Minimal",
          description: "My lovely get together last weekend was fun night of fireworks, grilling out, and a nice hidden hammock",
          image: image1,
          category: "Daily Outfits",
          comments: 2,
        },
      ];
    
      return (
        <div className=" pt-28">
            <div className='flex flex-col md:flex-row justify-center items-center mb-10 px-3'>
              {blogs.map((blog, index) => {
                return (
                  <BlogCard
                    key={index}
                    title={blog.title}
                    image={blog.image}
                  />
                );
              })}
            </div>
            <div className="flex justify-center items-center flex-col">
                {blogs.map((blog, index) => (
                <BlogItem
                    key={index}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    category={blog.category}
                    comments={blog.comments}
                />
                ))}
            </div>
        </div>
      );
    };

export default MainBlog