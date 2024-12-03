
import React, { useEffect, useState } from 'react';
import './User.css';
import { API_URL } from '../../data/api';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const User = () => {

  useEffect(() => {
    // Initialize AOS
    Aos.init({
        duration: 500, // Animation duration in milliseconds
        easing: 'ease-in-out', // Animation easing
        once: false, // Only animate once
    });
    // Aos.refresh(); // Refresh animations if dynamically loaded content is added
}, []);


    const [users, setUsers] = useState([]);

    const userEmail = localStorage.getItem('userEmail');

    const handleUser = async () => {
        try {
            console.log(userEmail);
            const response = await fetch(`${API_URL}/user/getUserByEmail/${userEmail}`);
            const data = await response.json();
            if (response.ok && data.user) {
                setUsers(data.user); // Set users if the response is valid
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userEmail) {
            handleUser();
        }
    }, [userEmail]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            try {
                const response = await fetch(`${API_URL}/delete/user/${userEmail}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Profile deleted successfully.');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('loginToken');
                    window.location.href = '/';
                } else {
                    alert('Failed to delete the profile.');
                }
            } catch (error) {
                console.log(error);
                alert('An error occurred while deleting the profile.');
            }
        }
    };

    return (
        <div className="user-container">
            {users.length > 0 ? (
                <>
                    <img
                        src={`${API_URL}/user/uploads/${users[0]?.profile}`}
                        alt="User Profile"
                        className="user-image"
                        data-aos="fade-down"
                    />
                    <div className="user-details" data-aos="fade-up">
                        <h2>{users[0]?.name}</h2>
                        <p><strong>Email:</strong> {users[0]?.email}</p>
                        <p><strong>Mobile Number:</strong> {users[0]?.mobilenumber}</p>
                        <p><strong>Blood Group:</strong> {users[0]?.bloodgroup}</p>
                        <p><strong>Country:</strong> {users[0]?.country}</p>
                        <p><strong>State:</strong> {users[0]?.state}</p>
                        <p><strong>City:</strong> {users[0]?.city}</p>
                        <button data-aos="fade-left" className="delete-button" onClick={handleDelete}>
                            Delete Profile
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading or user data not found...</p>
            )}
        </div>
    );
};

export default User;

