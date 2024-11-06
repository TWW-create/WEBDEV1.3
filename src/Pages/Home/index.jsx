import Hero from "./Hero"
import NewArrival from "./NewArrival"
import OurArticles from "./OurArticles"
import Shop from "./Shop"
// import TrendingItems from "./TrendingItems"

const Home = () => {
  return (
    <div>
        <Hero />
        <Shop />
        {/* <TrendingItems /> */}
        <NewArrival />
        <OurArticles />
    </div>
  )
}

export default Home