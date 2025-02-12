import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accessories, AddBanner, AddCreator, AddProduct, Admin, AdminBlog, AdminCreator, AdminDashboard, AdminOrders, AdminProducts, AdminSettings, BlogDetail, Cart, Categories, CategoryInfo, Checkout, CreatorDetail, EditPost, EditProduct, Favorites, Home, HomeWrapper, MainBlog, Men, Newsletter, OrderHistory, PaymentSuccessful, PostForm, ProductDetail, Profile, ProfileInfo, ResetPassword, Sales, SlideBanner, SubCategoryInfo, UpdateBanner, ViewBlog, ViewOrder, Women } from "./Pages";
import ProtectedRoute from "./Components/ProtectedRoute";
import ScrollToTop from "./Components/ScrollToTop";
import { useSelector } from "react-redux";
import ChangePassword from "./Pages/Profile/ChangePassword";


function App() {

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
        <Routes>
          <Route path='/reset-password/:token' element={<ResetPassword />} />
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
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/success' element={<PaymentSuccessful />} />
            {user && <Route path='/favorites' element={<Favorites />} />}
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }>
              <Route index element={<ProfileInfo />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='order-history' element={<OrderHistory />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
            <Route path="/blog" element={<MainBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/creator/:slug" element={<CreatorDetail />} />
            <Route path='*' element={<Home />} />
          </Route>
          {user?.is_admin === 1 && <Route path="/admin" element={<Admin />}>
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
            <Route path="/admin/creators" element={<AdminCreator />} />
            <Route path="/admin/creators/add" element={<AddCreator />} />
            <Route path='/admin/orders' element={<AdminOrders />} />
            <Route path='/admin/orders/:id' element={<ViewOrder />} />
          </Route>}
            
        </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  )
}

export default App
