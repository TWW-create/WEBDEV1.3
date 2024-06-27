import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accessories, Home, HomeWrapper, Men, Sales, Women } from "./Pages";


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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
