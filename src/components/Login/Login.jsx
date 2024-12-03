import React, { useEffect, useState } from 'react'
import './Login.css'
import { API_URL } from '../../data/api'
import { useNavigate } from 'react-router-dom'
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const Login = () => {
    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 500, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false, // Only animate once
        });
        // Aos.refresh(); // Refresh animations if dynamically loaded content is added
    }, []);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/donor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();
            if (response.ok) {
                alert("Login Success...!!!")
                setEmail("")
                setPassword("")
                console.log(data)
                localStorage.setItem('userEmail', data.userEmail)
                localStorage.setItem('loginToken', data.token)
                localStorage.setItem('userId', data.userId)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            alert("Login Failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleLogin();
    }, [])

    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    }

    return (
        <div className='login password-group' data-aos="fade-up" >
            {loading ? (
                <div className="loading-container">
                    <div className="spinner">
                    </div>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <fieldset>
                        <legend>Login</legend>
                        <label>Email :</label>
                        <input
                            placeholder='Enter Your Email.....!!!'
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id=""
                        />
                        <label>Password :</label>
                        <div className="password-container">
                            <input
                                placeholder='Enter Your Password.....!!!'
                                required={true}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id=""
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="toggle-password-button"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </fieldset>
                    <div className="submitBtn">
                        <button type='submit'>Login</button>
                    </div>
                    <p onClick={() => navigate('/forgotPassword')}>Forgot Password</p>
                    <p onClick={() => navigate('/register')}>Don't have an account: Sign Up</p>
                </form>
            )}
        </div>
    )
}

export default Login
