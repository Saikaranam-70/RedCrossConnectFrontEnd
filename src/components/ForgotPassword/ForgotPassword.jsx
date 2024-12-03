import React, { useState } from 'react';
import './ForgotPassword.css';
import { API_URL } from '../../data/api';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const ForgotPassword = () => {
  useEffect(() => {
    // Initialize AOS
    Aos.init({
        duration: 500, // Animation duration in milliseconds
        easing: 'ease-in-out', // Animation easing
        once: false, // Only animate once
    });
    // Aos.refresh(); // Refresh animations if dynamically loaded content is added
}, []);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        alert('OTP sent to your email.');
      } else {
        alert('Failed to send OTP.');
      }
    } catch (error) {
      alert('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setIsOtpValid(true);
        alert('OTP verified. You can now set a new password.');
      } else {
        alert('Invalid OTP.');
      }
    } catch (error) {
      alert('An error occurred while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json()

      if (response.ok) {
        setIsPasswordUpdated(true);
        console.log(data)
        alert('Password updated successfully.');
      } else {
        alert('Failed to update password.');
      }
    } catch (error) {
      alert('An error occurred while updating the password.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {loading && <div className="loading-spinner"></div>}
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isOtpSent || loading}
        />
        <button onClick={handleSendOtp} disabled={isOtpSent || loading}>
          Send OTP
        </button>
      </div>

      {isOtpSent && (
        <div className="input-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            placeholder='Enter OTP'
          />
          <button onClick={handleVerifyOtp} disabled={loading}>
            Verify OTP
          </button>
        </div>
      )}

      {isOtpValid && (
        <div className="input-group" data-aos="fade-down" >
          <label htmlFor="newPassword">New Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            placeholder='Enter Your New Password...!!!'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
          <span onClick={togglePasswordVisibility} className="toggle-password-icon">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
          <button onClick={handleUpdatePassword} disabled={loading}>
            Update Password
          </button>
        </div>
      )}

      {isPasswordUpdated && (
        <p>Password updated successfully. You can now log in with your new password.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
