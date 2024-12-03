// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import blood from '../../assets/blood.png';
// import Aos from 'aos'; // Import AOS library
// import 'aos/dist/aos.css'; // Import AOS styles
// import { API_URL } from '../../data/api';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [bloodgroup, setBloodgroup] = useState('');
//     const [donor, setDonor] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Initialize AOS
//         Aos.init({
//             duration: 500, // Animation duration in milliseconds
//             easing: 'ease-in-out', // Animation easing
//             once: false, // Only animate once
//         });
//         // Aos.refresh(); // Refresh animations if dynamically loaded content is added
//     }, []);

//     const fetchDonors = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const loginToken = localStorage.getItem('loginToken');
//         if (!loginToken) {
//             alert("Please Login");
//             navigate('/login');
//             return;
//         }
//         try {
//             const response = await fetch(`${API_URL}/user/getDonors`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ country, state, city, bloodgroup })
//             });
//             const data = await response.json();
//             setDonor(data.donor);
//             localStorage.setItem('donorData', JSON.stringify(data.donor)); // Save to localStorage

//             if (data.donor.length > 0) {
//                 setTimeout(() => {
//                     const donorsSection = document.querySelector('.donors');
//                     if (donorsSection) {
//                         donorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//                     }
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDonorPage = (id) => {
//         navigate(`/donor/${id}`);
//     };

//     const fetchCountry = async () => {
//         try {
//             const response = await fetch(`${API_URL}/location/country`);
//             const data = await response.json();
//             setCountries(data.countries);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchStates = async () => {
//         try {
//             if (country) {
//                 const response = await fetch(`${API_URL}/location/states/${country}`);
//                 const data = await response.json();
//                 setStates(data.states);
//             } else {
//                 setStates([]);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchCities = async () => {
//         try {
//             if (state) {
//                 const response = await fetch(`${API_URL}/location/cities/${country}/${state}`);
//                 const data = await response.json();
//                 setCities(data.city);
//             } else {
//                 setCities([]);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchCountry();
//         // Retrieve donors from localStorage on component mount localStorage.getItem('donorData')
//         const savedDonors = JSON.parse(donor);
//         if (savedDonors) {
//             setDonor(savedDonors);
//         }
//     }, []);

//     useEffect(() => {
//         fetchStates();
//     }, [country]);

//     useEffect(() => {
//         fetchCities();
//     }, [state]);

//     const handleCountryChange = (event) => {
//         setCountry(event.target.value);
//         setState('');
//         setCity('');
//     };

//     const handleStateChange = (event) => {
//         setState(event.target.value);
//         setCity('');
//     };

//     const handleCitiesChange = (event) => {
//         setCity(event.target.value);
//     };

//     const handleBloodGroup = (event) => {
//         setBloodgroup(event.target.value);
//     };

//     return (
//         <>
//             <div className='home'  >
//                 <div className="container" data-aos="fade-down">
//                     <p className='text'>Choice Is Yours Blood Is Ours.....</p>
//                 </div>
//                 <div className="blood-search" data-aos="fade-up">
//                     <div className="blood" data-aos="fade-right">
//                         <img src={blood} alt="" />
//                     </div>
//                     <div className="search" data-aos="fade-left">
//                         <form onSubmit={fetchDonors}>
//                             <fieldset>
//                                 <legend>Search Donors</legend>
//                                 <label>Select Country :</label>
//                                 <select value={country} required={true} onChange={handleCountryChange}>
//                                     <option>Select Your Country</option>
//                                     {countries.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select State :</label>
//                                 <select value={state} required={true} onChange={handleStateChange}>
//                                     <option>Select Your State</option>
//                                     {states.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select City :</label>
//                                 <select required={true} value={city} onChange={handleCitiesChange}>
//                                     <option>Select City</option>
//                                     {cities.map((item) => (
//                                         <option key={item.name} value={item.name}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select Blood Group</label>
//                                 <select required={true} value={bloodgroup} onChange={handleBloodGroup}>
//                                     <option>Select Blood Group</option>
//                                     <option value="A+">A+</option>
//                                     <option value="A-">A-</option>
//                                     <option value="B+">B+</option>
//                                     <option value="B-">B-</option>
//                                     <option value="AB+">AB+</option>
//                                     <option value="AB-">AB-</option>
//                                     <option value="O+">O+</option>
//                                     <option value="O-">O-</option>
//                                 </select>
//                                 <div className="submitBtn">
//                                     <button type='submit'>Search Donor</button>
//                                 </div>
//                             </fieldset>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {loading ? (
//                 <div className="loading-container">
//                     {/* <div className="spinner"></div> */}
//                 </div>
//             ) : (
//                 <div className="donors">
//                     {donor === null ? (
//                         <p>Donors not found</p>
//                     ) : (
//                         donor.length === 0 ? (
//                             <p>Donors not found</p>
//                         ) : (
//                             donor.map((item) => (
//                                 <div data-aos="fade-right" className="donor" key={item._id} onClick={() => handleDonorPage(item._id)}>
//                                     <div className="icon">{item.name.charAt(0)}</div>
//                                     <div className="detail">
//                                         <div className="name">
//                                             <h3>{item.name}</h3>
//                                         </div>
//                                         <div className="mobile">
//                                             <h3>{item.mobilenumber}</h3>
//                                         </div>
//                                         <div className="city">
//                                             <h3>{item.city}</h3>
//                                         </div>
//                                         <div className="email">
//                                             <h3>{item.bloodgroup}</h3>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )
//                     )}
//                 </div>
//             )}
//         </>
//     );
// }

// export default Home;


// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import blood from '../../assets/blood.png';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import { API_URL } from '../../data/api';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [bloodgroup, setBloodgroup] = useState('');
//     const [donor, setDonor] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         Aos.init({
//             duration: 500,
//             easing: 'ease-in-out',
//             once: false,
//         });
//     }, []);

//     const fetchDonors = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const loginToken = localStorage.getItem('loginToken');
//         if (!loginToken) {
//             alert("Please Login");
//             navigate('/login');
//             return;
//         }
//         try {
//             const response = await fetch(`${API_URL}/user/getDonors`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ country, state, city, bloodgroup }),
//             });
//             const data = await response.json();
//             setDonor(data.donor);
//             localStorage.setItem('donorData', JSON.stringify(data.donor));

//             if (data.donor.length > 0) {
//                 setTimeout(() => {
//                     const donorsSection = document.querySelector('.donors');
//                     if (donorsSection) {
//                         donorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//                     }
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchCountry = async () => {
//         try {
//             const response = await fetch(`${API_URL}/location/country`);
//             const data = await response.json();
//             setCountries(data.countries);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchStates = async () => {
//         try {
//             if (country) {
//                 const response = await fetch(`${API_URL}/location/states/${country}`);
//                 const data = await response.json();
//                 setStates(data.states);
//             } else {
//                 setStates([]);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchCities = async () => {
//         try {
//             if (state) {
//                 const response = await fetch(`${API_URL}/location/cities/${country}/${state}`);
//                 const data = await response.json();
//                 setCities(data.city);
//             } else {
//                 setCities([]);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getCurrentLocation = async () => {
//         if (!navigator.geolocation) {
//             alert("Geolocation is not supported by your browser.");
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(async (position) => {
//             const { latitude, longitude } = position.coords;

//             try {
//                 const response = await fetch(
//                     `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=62b498d7da7f4e968fc1280003660082`
//                 );
//                 const data = await response.json();
//                 const location = data.results[0].components;
//                 console.log(location)

//                 setCountry(location.country_code.toUpperCase());
//                 setState(location.state_code);
//                 setCity(location.state_district);
//                 console.log(location.country_code.toUpperCase())
//                 console.log(location.state_code)
//                 console.log(location.state_district)

//                 // Fetch donors using current location
//                 await fetchDonors({
//                     preventDefault: () => {}, // Mock the event
//                 });
//             } catch (error) {
//                 console.error("Error fetching location details:", error);
//             }
//         }, (error) => {
//             console.error("Error fetching location:", error);
//         });
//     };

//     useEffect(() => {
//         fetchCountry();
//     }, []);

//     useEffect(() => {
//         fetchStates();
//     }, [country]);

//     useEffect(() => {
//         fetchCities();
//     }, [state]);

//     const handleCountryChange = (event) => {
//         setCountry(event.target.value);
//         setState('');
//         setCity('');
//     };

//     const handleStateChange = (event) => {
//         setState(event.target.value);
//         setCity('');
//     };

//     const handleCitiesChange = (event) => {
//         setCity(event.target.value);
//     };

//     const handleBloodGroup = (event) => {
//         setBloodgroup(event.target.value);
//     };

//     return (
//         <>
//             <div className='home'>
//                 <div className="container" data-aos="fade-down">
//                     <p className='text'>Choice Is Yours Blood Is Ours.....</p>
//                 </div>
//                 <div className="blood-search" data-aos="fade-up">
//                     <div className="blood" data-aos="fade-right">
//                         <img src={blood} alt="" />
//                     </div>
//                     <div className="search" data-aos="fade-left">
//                         <form onSubmit={fetchDonors}>
//                             <fieldset>
//                                 <legend>Search Donors</legend>
//                                 <label>Select Country :</label>
//                                 <select value={country} required={true} onChange={handleCountryChange}>
//                                     <option>Select Your Country</option>
//                                     {countries.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select State :</label>
//                                 <select value={state} required={true} onChange={handleStateChange}>
//                                     <option>Select Your State</option>
//                                     {states.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select City :</label>
//                                 <select required={true} value={city} onChange={handleCitiesChange}>
//                                     <option>Select City</option>
//                                     {cities.map((item) => (
//                                         <option key={item.name} value={item.name}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <label>Select Blood Group</label>
//                                 <select required={true} value={bloodgroup} onChange={handleBloodGroup}>
//                                     <option>Select Blood Group</option>
//                                     <option value="A+">A+</option>
//                                     <option value="A-">A-</option>
//                                     <option value="B+">B+</option>
//                                     <option value="B-">B-</option>
//                                     <option value="AB+">AB+</option>
//                                     <option value="AB-">AB-</option>
//                                     <option value="O+">O+</option>
//                                     <option value="O-">O-</option>
//                                 </select>
//                                 <div className="submitBtn">
//                                     <button type='submit'>Search Donor</button>
//                                 </div>
//                                 <div className="currentLocationBtn">
//                                     <button type="button" onClick={getCurrentLocation}>Get Donors Using Current Location</button>
//                                 </div>
//                             </fieldset>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {loading ? (
//                 <div className="loading-container"></div>
//             ) : (
//                 <div className="donors">
//                     {donor === null ? (
//                         <p>Donors not found</p>
//                     ) : (
//                         donor.length === 0 ? (
//                             <p>Donors not found</p>
//                         ) : (
//                             donor.map((item) => (
//                                 <div data-aos="fade-right" className="donor" key={item._id} onClick={() => handleDonorPage(item._id)}>
//                                     <div className="icon">{item.name.charAt(0)}</div>
//                                     <div className="detail">
//                                         <div className="name">
//                                             <h3>{item.name}</h3>
//                                         </div>
//                                         <div className="mobile">
//                                             <h3>{item.mobilenumber}</h3>
//                                         </div>
//                                         <div className="city">
//                                             <h3>{item.city}</h3>
//                                         </div>
//                                         <div className="email">
//                                             <h3>{item.bloodgroup}</h3>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )
//                     )}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import blood from '../../assets/blood.png';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import { API_URL } from '../../data/api';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [bloodgroup, setBloodgroup] = useState('');
//     const [donor, setDonor] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [locationFetched, setLocationFetched] = useState(false); // New state for location fetch status
//     const navigate = useNavigate();

//     useEffect(() => {
//         Aos.init({
//             duration: 500,
//             easing: 'ease-in-out',
//             once: false,
//         });
//     }, []);

//     const fetchDonors = async (e) => {
//         e.preventDefault();
//         if (!locationFetched) {
//             alert("Please fetch your location first!");
//             return;
//         }

//         if (!bloodgroup) {
//             alert("Please select a blood group.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/user/getDonors`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ country, state, city, bloodgroup }),
//             });
//             const data = await response.json();
//             setDonor(data.donor);
//             localStorage.setItem('donorData', JSON.stringify(data.donor));

//             if (data.donor.length > 0) {
//                 setTimeout(() => {
//                     const donorsSection = document.querySelector('.donors');
//                     if (donorsSection) {
//                         donorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//                     }
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getCurrentLocation = async () => {
//         if (!navigator.geolocation) {
//             alert("Geolocation is not supported by your browser.");
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(async (position) => {
//             const { latitude, longitude } = position.coords;

//             try {
//                 const response = await fetch(
//                     `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=62b498d7da7f4e968fc1280003660082`
//                 );
//                 const data = await response.json();
//                 const location = data.results[0].components;

//                 setCountry(location.country_code.toUpperCase());
//                 setState(location.state_code);
//                 setCity(location.state_district);
//                 setLocationFetched(true); // Mark location as fetched
//                 alert("Location fetched successfully. Please select a blood group.");
//             } catch (error) {
//                 console.error("Error fetching location details:", error);
//             }
//         }, (error) => {
//             console.error("Error fetching location:", error);
//         });
//     };

//     return (
//         <>
//             <div className='home'>
//                 <div className="container" data-aos="fade-down">
//                     <p className='text'>Choice Is Yours Blood Is Ours.....</p>
//                 </div>
//                 <div className="blood-search" data-aos="fade-up">
//                     <div className="blood" data-aos="fade-right">
//                         <img src={blood} alt="" />
//                     </div>
//                     <div className="search" data-aos="fade-left">
//                         <form onSubmit={fetchDonors}>
//                             <fieldset>
//                                 <legend>Search Donors</legend>
//                                 <div className="currentLocationBtn">
//                                     <button type="button" onClick={getCurrentLocation}>
//                                         Get Donors Using Current Location
//                                     </button>
//                                 </div>
//                                 {locationFetched && (
//                                     <>
//                                         <label>Select Blood Group</label>
//                                         <select
//                                             required={true}
//                                             value={bloodgroup}
//                                             onChange={(e) => setBloodgroup(e.target.value)}
//                                         >
//                                             <option value="">Select Blood Group</option>
//                                             <option value="A+">A+</option>
//                                             <option value="A-">A-</option>
//                                             <option value="B+">B+</option>
//                                             <option value="B-">B-</option>
//                                             <option value="AB+">AB+</option>
//                                             <option value="AB-">AB-</option>
//                                             <option value="O+">O+</option>
//                                             <option value="O-">O-</option>
//                                         </select>
//                                         <div className="submitBtn">
//                                             <button type='submit'>Search Donor</button>
//                                         </div>
//                                     </>
//                                 )}
//                             </fieldset>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {loading ? (
//                 <div className="loading-container"></div>
//             ) : (
//                 <div className="donors">
//                     {donor === null ? (
//                         <p>Donors not found</p>
//                     ) : (
//                         donor.length === 0 ? (
//                             <p>Donors not found</p>
//                         ) : (
//                             donor.map((item) => (
//                                 <div data-aos="fade-right" className="donor" key={item._id}>
//                                     <div className="icon">{item.name.charAt(0)}</div>
//                                     <div className="detail">
//                                         <div className="name">
//                                             <h3>{item.name}</h3>
//                                         </div>
//                                         <div className="mobile">
//                                             <h3>{item.mobilenumber}</h3>
//                                         </div>
//                                         <div className="city">
//                                             <h3>{item.city}</h3>
//                                         </div>
//                                         <div className="email">
//                                             <h3>{item.bloodgroup}</h3>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )
//                     )}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import './Home.css';
import blood from '../../assets/blood.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { API_URL } from '../../data/api';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false); // For GPS location fetch
    const [useManualLocation, setUseManualLocation] = useState(true); // Toggle between manual and GPS
    const navigate = useNavigate();
    const handleDonorPage = (id) => {
           navigate(`/donor/${id}`);
          };

    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: 'ease-in-out',
            once: false,
        });
        fetchCountry();
    }, []);

    const fetchCountry = async () => {
        try {
            const response = await fetch(`${API_URL}/location/country`);
            const data = await response.json();
            setCountries(data.countries);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStates = async () => {
        try {
            if (country) {
                const response = await fetch(`${API_URL}/location/states/${country}`);
                const data = await response.json();
                setStates(data.states);
            } else {
                setStates([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCities = async () => {
        try {
            if (state) {
                const response = await fetch(`${API_URL}/location/cities/${country}/${state}`);
                const data = await response.json();
                setCities(data.city);
            } else {
                setCities([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (country) fetchStates();
    }, [country]);

    useEffect(() => {
        if (state) fetchCities();
    }, [state]);

    const getCurrentLocation = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=62b498d7da7f4e968fc1280003660082`
                );
                const data = await response.json();
                const location = data.results[0].components;

                setCountry(location.country_code.toUpperCase());
                setState(location.state_code);
                setCity(location.state_district);
                setLocationFetched(true);
                alert("Location fetched successfully. Please select a blood group.");
            } catch (error) {
                console.error("Error fetching location details:", error);
            }
        }, (error) => {
            console.error("Error fetching location:", error);
        });
    };

    const fetchDonors = async (e) => {
        e.preventDefault();

        if (!bloodgroup) {
            alert("Please select a blood group.");
            return;
        }

        if (!country || !state || !city) {
            alert("Please provide a valid location.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/user/getDonors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country, state, city, bloodgroup }),
            });
            const data = await response.json();
            setDonor(data.donor);
            localStorage.setItem('donorData', JSON.stringify(data.donor));

            if (data.donor.length > 0) {
                setTimeout(() => {
                    const donorsSection = document.querySelector('.donors');
                    if (donorsSection) {
                        donorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleLocationMode = () => {
        setUseManualLocation(!useManualLocation);
        setLocationFetched(false);
        setCountry('');
        setState('');
        setCity('');
    };

    return (
        <>
            <div className='home'>
                <div className="container" data-aos="fade-down">
                    <p className='text'>Choice Is Yours Blood Is Ours.....</p>
                </div>
                <div className="blood-search" data-aos="fade-up">
                    <div className="blood" data-aos="fade-right">
                        <img src={blood} alt="" />
                    </div>
                    <div className="search" data-aos="fade-left">
                        <form onSubmit={fetchDonors}>
                            <fieldset>
                                <legend>Search Donors</legend>
                                <div className="toggleMode">
                                    <button
                                        type="button"
                                        onClick={toggleLocationMode}
                                    >
                                        {useManualLocation ? "Use Current Location" : "Enter Location Manually"}
                                    </button>
                                </div>

                                {useManualLocation ? (
                                    <>
                                        <label>Select Country:</label>
                                        <select value={country} required onChange={(e) => setCountry(e.target.value)}>
                                            <option value="">Select Your Country</option>
                                            {countries.map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label>Select State:</label>
                                        <select value={state} required onChange={(e) => setState(e.target.value)}>
                                            <option value="">Select Your State</option>
                                            {states.map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label>Select City:</label>
                                        <select value={city} required onChange={(e) => setCity(e.target.value)}>
                                            <option value="">Select Your City</option>
                                            {cities.map((item) => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    <div className="currentLocationBtn">
                                        <button type="button" onClick={getCurrentLocation}>
                                            Get Donors Using Current Location
                                        </button>
                                    </div>
                                )}

                                <label>Select Blood Group:</label>
                                <select
                                    required
                                    value={bloodgroup}
                                    onChange={(e) => setBloodgroup(e.target.value)}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                <div className="submitBtn">
                                    <button type='submit'>Search Donor</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="loading-container"></div>
            ) : (
                <div className="donors">
                    {donor === null ? (
                        <p>Donors not found</p>
                    ) : (
                        donor.length === 0 ? (
                            <p>Donors not found</p>
                        ) : (
                            donor.map((item) => (
                                <div data-aos="fade-right" className="donor" onClick={() => handleDonorPage(item._id)} key={item._id}>
                                    <div className="icon">{item.name.charAt(0)}</div>
                                    <div className="detail">
                                        <div className="name">
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div className="mobile">
                                            <h3>{item.mobilenumber}</h3>
                                        </div>
                                        <div className="city">
                                            <h3>{item.city}</h3>
                                        </div>
                                        <div className="email">
                                            <h3>{item.bloodgroup}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>
            )}
        </>
    );
};

export default Home;
