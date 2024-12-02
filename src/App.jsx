import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accessories, AddBanner, AddProduct, Admin, AdminBlog, AdminDashboard, AdminProducts, AdminSettings, BlogDetail, Cart, Categories, CategoryInfo, EditPost, EditProduct, Favorites, Home, HomeWrapper, MainBlog, Men, Newsletter, PostForm, ProductDetail, Profile, ProfileInfo, Sales, SlideBanner, SubCategoryInfo, UpdateBanner, ViewBlog, Women } from "./Pages";
import ProtectedRoute from "./Components/ProtectedRoute";
import ScrollToTop from "./Components/ScrollToTop";


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
        <Routes>
          <Route element={<HomeWrapper />}>
            <Route path='/' element={<Home />} />
            <Route path='/men' element={<Men />} />
            <Route path='/men/:subCat/:tab' element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/women/:subCat/:tab' element={<Women />} />
            <Route path='/accessories' element={<Accessories />} />
            <Route path='/accessories/:subCat/:tab' element={<Accessories />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/sales/:subCat/:tab' element={<Sales />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }>
              <Route index element={<ProfileInfo />} />
              <Route path='favorites' element={<Favorites />} />
            </Route>
            <Route path="/blog" element={<MainBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
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
        </ScrollToTop>
      </BrowserRouter>
    </>
  )
}

export default App
