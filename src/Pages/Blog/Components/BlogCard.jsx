
const BlogCard = ({ image, title }) => {
  return (
    <div className="relative h-64 w-full md:w-1/3 lg:w-1/4 m-2 border-[12px] border-white">
      <img src={image} alt={title} className="object-cover h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
        <h2 className="text-white text-sm font-semibold bg-black text-center p-6 md:p-2 lg:p-6">PACKING TIPS FOR A WEEKENDER</h2>
      </div>
    </div>
  );
};

export default BlogCard;
