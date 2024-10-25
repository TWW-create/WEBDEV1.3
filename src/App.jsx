import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accessories, AddBanner, AddProduct, Admin, AdminBlog, AdminDashboard, AdminProducts, Cart, Categories, CategoryInfo, EditPost, EditProduct, Favorites, Home, HomeWrapper, MainBlog, Men, Newsletter, PostForm, ProductDetail, Profile, Sales, SlideBanner, SubCategoryInfo, UpdateBanner, ViewBlog, Women } from "./Pages";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeWrapper />}>
            <Route path='/' element={<Home />} />
            <Route path='/men/:tab' element={<Men />} />
            <Route path='/women/:tab' element={<Women />} />
            <Route path='/accessories/:tab' element={<Accessories />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='profile' element={<Profile />}>
              <Route path='favorites' element={<Favorites />} />
            </Route>
            <Route path="/blog" element={<MainBlog />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/products/add" element={<AddProduct/>} />
            <Route path="/admin/products/:id" element={<EditProduct/>} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/categories/:id" element={<CategoryInfo />} />
            <Route path="/admin/subcategories/:id" element={<SubCategoryInfo />} />
            <Route path="/admin/newsletter" element={<Newsletter />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/blog/:id" element={<ViewBlog />} />
            <Route path="/admin/blog/edit/:id" element={<EditPost />} />
            <Route path="/admin/blog/add" element={<PostForm />} />
            <Route path="/admin/banners" element={<SlideBanner />} />
            <Route path="/admin/banners/:id" element={<UpdateBanner />} />
            <Route path="/admin/banners/add" element={<AddBanner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
