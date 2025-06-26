import { useState } from 'react'
import { Routes,Route, Navigate, BrowserRouter } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import productDetails from './components/productDetails'
import PageNotFound from './components/PageNotFound'
import Dummy from './components/dummy'
import SignInPage from './components/SignInPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>     
    <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/product/:id" element={<productDetails/>}></Route>
        <Route path='/dummy' element= {<Dummy/>}> </Route>
         <Route path='/signInPage' element= {<SignInPage/>}> </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
