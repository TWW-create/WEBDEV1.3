import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ image, title, id }) => {

  const navigate = useNavigate();
  return (
      <div className="relative h-64 w-full md:w-1/3 lg:w-1/4 m-2 border-[12px] border-white cursor-pointer" onClick={() => navigate(`/blog/${id}`)}>
        <img src={image} alt={title} className="object-cover h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <h2 className="text-white text-sm font-semibold bg-black text-center p-6 md:p-2 lg:p-6 uppercase mx-5">{title}</h2>
        </div>
      </div>
  );
};

BlogCard.propTypes  = {
  image: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default BlogCard;
