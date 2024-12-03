import React, { useEffect } from 'react';
import './BloodCompatibility.css';
import { Link } from 'react-router-dom';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const BloodCompatibility = () => {
    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 500, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false, // Only animate once
        });
        // Aos.refresh(); // Refresh animations if dynamically loaded content is added
    }, []);
    const compatibilityData = [
        { donor: 'A+', canGiveTo: ['A+', 'AB+'] },
        { donor: 'A-', canGiveTo: ['A+', 'A-', 'AB+', 'AB-'] },
        { donor: 'B+', canGiveTo: ['B+', 'AB+'] },
        { donor: 'B-', canGiveTo: ['B+', 'B-', 'AB+', 'AB-'] },
        { donor: 'AB+', canGiveTo: ['AB+'] },
        { donor: 'AB-', canGiveTo: ['AB+', 'AB-'] },
        { donor: 'O+', canGiveTo: ['A+', 'B+', 'AB+', 'O+'] },
        { donor: 'O-', canGiveTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    ];

    return (
        
        <div data-aos="fade-up" className="blood-compatibility">
            <h2 >Blood Donor Compatibility</h2>
            <table >
                <thead>
                    <tr>
                        <th>Blood Group</th>
                        <th>Can Give Blood To</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {compatibilityData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.donor}</td>
                            <td>{item.canGiveTo.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BloodCompatibility;
