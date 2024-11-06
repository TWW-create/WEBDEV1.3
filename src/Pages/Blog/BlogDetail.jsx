import { useParams } from "react-router-dom";
import { useGetBlogPostQuery } from "../../redux/slice/blogApiSlice";
import { Spin } from "antd";
import dayjs from "dayjs";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";

const BlogDetail = () => {

    const { id } = useParams();

    const { data, isLoading } = useGetBlogPostQuery(id);

    const { title, content, media, updated_at } = data || {}

    if (isLoading) return <div className='flex justify-center items-center h-[50vh] xl:h-[30vh]'><Spin /></div>;
    
  return (
    <div className=" pt-28">
        <div className="bg-white mb-6 max-w-sm md:max-w-lg w-[512px] shadow-lg rounded-lg mx-auto">
            <div className="flex flex-col">
                <div className="p-10 text-center">
                    <h2 className="text-lg font-medium mb-2 uppercase">{title}</h2>
                    <p className="text-xs">{dayjs(updated_at).format('DD/MM/YYYY')}</p>
                </div>
                <div className="w-[90%] mx-auto flex flex-col items-center gap-6">
                    {
                        media.length > 0 &&
                        media.map((item, index) => (
                            <img key={index} src={IMAGE_BASE_URL + "/" + item?.file_path} alt={title} className="w-[100%] h-full object-cover object-center" />
                        ))
                    }
                </div>
                <div className="flex-1">
                    <p className="text-sm mb-4 p-7">
                        <span dangerouslySetInnerHTML={{ __html: content }} />
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogDetail