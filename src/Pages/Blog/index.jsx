import { Outlet } from "react-router-dom"
import Footer from "../../Components/Footer"
import Navbar from "./Components/Navbar"

const Blog = () => {
  return (
    <div>
        <div className="bg-white text-center py-2">
            <p className="text-xs font-medium">Discover: New Fashions with BARA</p>
        </div>
        <Navbar />
        <div className="pb-28 bg-[#D9D9D9]">
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Blog