import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
           
            localStorage.setItem('authToken', token);
            
            
            navigate('/');
        } else {
            
            alert('Authentication failed');
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            Authenticating...
        </div>
    );
};

export default GoogleSuccess;
