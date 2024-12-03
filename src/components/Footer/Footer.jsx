import React, { useEffect } from 'react';
import './Footer.css';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const Footer = () => {
    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 500, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false, // Only animate once
        });
        // Aos.refresh(); // Refresh animations if dynamically loaded content is added
    }, []);
    return (
        <footer className="footer" data-aos="fade-right">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        We are dedicated to connecting blood donors with those in need. Our mission is to ensure
                        that everyone has access to the blood they need when they need it.
                    </p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Home</li>
                        <li>Donors</li>
                        <li>Blood Compatibility</li>
                        <li>Contact </li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>
                        <strong>Email:</strong> redcrossconnect1@gmail.com<br />
                        <strong>Phone:</strong> 7095835048<br />
                        <strong>Address:</strong> Sankethika Polytechnic College, Visakhapatnam
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Red Cross Connect 
            </div>
        </footer>
    );
};

export default Footer;
