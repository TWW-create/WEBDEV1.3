import { Button } from "antd"

const ArticleCard = ({article}) => {
  return (
    <div className="w-full">
        <div className="w-full relative mx-auto h-auto overflow-hidden ">
            <img src={article.image} alt={article.name} className="w-full h-80 object-cover object-center transition-all duration-300 hover:scale-110" />
        </div>
        <div className="mt-4 flex justify-between items-center">
            <p className="text-sm lg:text-base">{article.name}</p>
            <Button ghost className="rounded-2xl !text-black !border-[#000000]">Explore</Button>
        </div>
    </div>
  )
}

export default ArticleCard