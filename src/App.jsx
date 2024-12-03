import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home/Home'
// import { Route, Routes } from 'react-router-dom'
// import Register from './components/Register/Register'
// import Login from './components/Login/Login'
import Contact from './components/Contact/Contact'
import BloodCompatibility from './components/BloodCompatibility/BloodCompatibility'
import Footer from './components/Footer/Footer'
import User from './components/User/User'

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
      </Routes> */}
      <Home />
      <BloodCompatibility />
      <Contact />
      <Footer />
      
    </div>
  )
}

export default App
