import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/redcrossconnect.png'
import menu from '../../assets/menu-icon.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import 'aos/dist/aos.css';
import Aos from 'aos';


const Navbar = () => {
  useEffect(()=>{
    Aos.init({
      duration: 300,
      easing:'ease-in-out',
      once: true,
    })
  }, [])
    const [mobilemenu, setMobilemenu] = useState(false);
    const loginToken = localStorage.getItem('loginToken')
    const logOut = !!loginToken
    const navigate = useNavigate();
    const location = useLocation()
    
    const toggleMeu = ()=>{
        mobilemenu ? setMobilemenu(false) : setMobilemenu(true);
    }
    useEffect(()=>{
      setMobilemenu(false)
    },[location])
  return (
    <nav className='navbar'  >
      <Link className='link' to='/'><img data-aos="fade-right" src={logo} className='logo' alt="" /></Link>
        
        <ul className={mobilemenu ? '': 'hide'} >
        <Link className='link' to='/'><li>Home</li></Link>
        {/* <li>Donor Compatibility</li>
        <li>Contact Us</li> */}
        

        
        {
          logOut ? (
            <Link className='link' to='/profile'><li data-aos="fade-up" >My Profile</li></Link>
            
          ):
          <Link to='/register'><li data-aos="fade-up" >Sign Up</li></Link>
        }
        {
          logOut ? (
            <Link className='link' to='/addDonor'><li data-aos="fade-up" >Add Your Self As Donor</li></Link>
  ):(
    <span></span>
  )
        }
        
        {/* <Link to='/login'><li>Login</li></Link> */}
        {logOut ? (
          <li data-aos="fade-up"  onClick={() => {
            const confirmed = window.confirm("Are You want to LogOut");
            if(confirmed){
            localStorage.removeItem('loginToken');
            localStorage.removeItem('donorData');
            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')

            navigate('/login')
            }
            // window.location.reload(); 
          }}>Logout</li>
        ) : (
          <Link className='link' to='/login'><li data-aos="fade-up" >Login</li></Link>
          
        )}
        </ul>
      <img className='menu-icon' onClick={toggleMeu} src={menu} alt="" data-aos="fade-left"/>
    </nav>
  )
}

export default Navbar
