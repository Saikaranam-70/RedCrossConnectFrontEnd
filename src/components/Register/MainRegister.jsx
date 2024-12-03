import React, { useEffect, useState } from 'react'
import { API_URL } from '../../data/api'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './MainRegister.css'
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles


const MainRegister = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 500, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false, // Only animate once
        });
        // Aos.refresh(); // Refresh animations if dynamically loaded content is added
    }, []);

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const responce = await fetch(`${API_URL}/donor/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email, password, name})
            })
            const data = await responce.json();
            if(responce.ok){
                alert("Success...!!!")
                setEmail("")
                setPassword("")
                setName("")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            alert("Sign Up Failed")
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        handleLogin();
    }, [])

    const togglePassword = ()=>{
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }
    const handleGoogleSignUp = () => {
        // Redirect to the backend's Google OAuth route
        window.location.href = `${API_URL}/auth/google`;
      };
    
  return (
    <div className='login password-group' data-aos="fade-down" >
    {loading ? (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    ) : (
        <form onSubmit={handleLogin}>
            <fieldset>
                <legend>Sign Up</legend>
                <label>Email :</label>
                <input
                    placeholder='Enter Your Email.....!!!'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                />
                <label>Password :</label>
                <div className="password-container">
                    <input
                        placeholder='Enter Your Password.....!!!'
                        required
                        type={showPassword ? "password" : "text"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                    />
                    <button 
                        type="button" 
                        className="toggle-password-button" 
                        onClick={togglePassword}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Enter Your Name....!!!'
                    name="name"
                />
            </fieldset>
            <div className="submitBtn">
                <button>Sign Up</button>
            </div>
            <div className="google-signup">
                <button onClick={handleGoogleSignUp} className="google-button">
                    Sign Up with Google
                </button>
            </div>
            <p onClick={() => navigate('/login')}>Already have an Account : Sign In</p>
        </form>
    )}
</div>

  )
}

export default MainRegister
