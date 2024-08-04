import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accessories, Blog, Cart, Favorites, Home, HomeWrapper, MainBlog, Men, ProductDetail, Profile, Sales, Women } from "./Pages";


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
          </Route>
          <Route path='/blog' element={<Blog />}>
            <Route index element={<MainBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
