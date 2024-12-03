import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
// import Register from './components/Register/Register'
import Navbar from './components/navbar/Navbar'
// import Home from './components/Home/Home'
import App from './App.jsx'
import User from './components/User/User'
import DonorDetails from './components/DonorDetails/DonorDetails.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import MainRegister from './components/Register/MainRegister.jsx'
import Register from './components/Register/Register.jsx'
import GoogleSuccess from './components/GoogleSuccess/GoogleSuccess.jsx'
import Chat from './components/Chat/Chat.jsx'

const Landing = () => {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<MainRegister />} />
        <Route path='/profile' element={<User />} />
        <Route path='/donor/:id' element={<DonorDetails />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/addDonor' element={<Register />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default Landing
