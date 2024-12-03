import React, { useState, useEffect } from 'react';
import './Contact.css';
import { API_URL } from '../../data/api';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles


const Contact = () => {
  useEffect(() => {
    // Initialize AOS
    Aos.init({
        duration: 500, // Animation duration in milliseconds
        easing: 'ease-in-out', // Animation easing
        once: false, // Only animate once
    });
    // Aos.refresh(); // Refresh animations if dynamically loaded content is added
}, []);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate();

  const handleContact=async(e)=>{
    e.preventDefault();
    setLoading(true)

    const loginToken = localStorage.getItem("loginToken")
    if(!loginToken){
      alert("Please Login...!")
      navigate('/login')
      setLoading(false)
      return
    }
    try {
      const responce = await fetch(`${API_URL}/mail/send`, {
        method: 'POST',
        headers:{
          'token':`${loginToken}`
        },
        body: JSON.stringify({name, email,phone,message})
      })
      const data = await responce.json();
      if(responce.ok){
        alert("Mail Sending Successfully..........!!!!")
        setEmail("")
        setPhone("")
        setName("")
        setMessage("")
      }
    } catch (error) {
      alert("mail sending faile...!!!")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="contact">
    <div className="contact-container" data-aos="fade-down">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleContact}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" autoComplete='off' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name....!!!' id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email...!!!' name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Phone</label>
          <input type="text" id="text" autoComplete='off' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your Email...!!!' name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" autoComplete='off' onChange={(e)=>setMessage(e.target.value)} value={message} placeholder='Enter your Message...!!!!!'/>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
