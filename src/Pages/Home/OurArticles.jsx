import ArticleCard from "../../Components/ArticleCard"
import art1  from '../../assets/images/art1.png'
import { useGetBlogPostsQuery } from "../../redux/slice/blogApiSlice";


const articles = [
    {
      name: 'How We Started At BARA',
      image: art1,
    },
    {
      name: 'Lauch Of Our New Store',
      image: art1,
    },
    {
      name: 'Lauch Of Our New Store',
      image: art1,
    },
];

const OurArticles = () => {

  const { data, isLoading } = useGetBlogPostsQuery({ page: 1, per_page: 10 }); 

  return (
    <section className="pt-10 mb-12 bg-white px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
            <h2 className="text-center text-lg mb-4 font-medium">Baraworld</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 xl:gap-4">
          {data?.data.slice(0,3).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurArticles