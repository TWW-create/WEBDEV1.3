import { Button } from "antd"
import { IMAGE_BASE_URL } from "../utils/apiConstants"
import { useNavigate } from "react-router-dom"

const ArticleCard = ({article}) => {
  const navigate = useNavigate()
  
  return (
    <div className="w-full">
        <div className="w-full relative mx-auto h-auto overflow-hidden ">
            <img src={IMAGE_BASE_URL + "/" + article?.media[0]?.file_path} alt={article?.title} className="w-full h-80 object-cover object-center transition-all duration-300 hover:scale-110" />
        </div>
        <div className="mt-4 flex justify-between items-center gap-5">
            <p className="text-sm lg:text-base">{article?.title}</p>
            <Button onClick={() => navigate(`/blog/${article?.id}`)} ghost className="rounded-2xl !text-black !border-[#000000] hover:!text-white hover:!bg-black">Explore</Button>
        </div>
    </div>
  )
}

export default ArticleCard