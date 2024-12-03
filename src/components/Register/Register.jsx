// import React, { useEffect, useState } from 'react'
// import './Register.css'
// import { API_URL } from '../../data/api'
// import heart from '../../assets/heart2.jpg'
// import { useNavigate } from 'react-router-dom'

// const Register = () => {
//     const [countries, setCountries] = useState([])
//     const [states, setStates] = useState([])
//     const [cities, setCities] = useState([])
//     const [selectedCountry, setSelectedCountry] = useState('')
//     const [selectedState, setSelectedState] = useState('')
//     const [selectedCity, setSelectedCity] = useState('')
//     const [selectedGroup, setSelectedGroup]= useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [mobilenumber, setMobilenumber] = useState('')
//     const [name, setName] = useState('')
//     const [file, setFile] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [countryCode, setCountryCode] = useState('') 
//     const navigate = useNavigate()
    

//     const registerHandle = async(e)=>{
//         e.preventDefault();
//         setLoading(true)

//         try {
//             const formData = new FormData();
//         formData.append('email', email);
//         formData.append('password', password)
//         formData.append('mobilenumber', `${countryCode}${mobilenumber}`)
//         formData.append('name', name)
//         formData.append('bloodgroup', selectedGroup)
//         formData.append('country', selectedCountry)
//         formData.append('state', selectedState)
//         formData.append('city',selectedCity)
//         formData.append('profile', file)

//         const responce = await fetch(`${API_URL}/user/register`,{
//             method:'POST',
//             body: formData
//         })
//         const data = await responce.json();
//         if(responce.ok){
//             setLoading(false)
//             alert("Registration Successfully...!!!!")
//             setEmail('')
//             setPassword('')
//             setMobilenumber('')
//             setName('')
//             setSelectedGroup('')
//             setSelectedCountry('')
//             setSelectedState('')
//             setSelectedCity('')
//             setFile(null)
//         }
//         } catch (error) {
//             alert("Registration Failed....!!!")
//             console.log(error)
//         }finally{
//             setLoading(false)
//         }
//     }
//     const fetchCountry = async()=>{
//         try {

//             const responce = await fetch(`${API_URL}/location/country`)
//             const data = await responce.json();
//             setCountries(data.countries)
//             if(responce.ok){
//                 console.log(data)
//             }
            
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const fetchStates = async()=>{
//         try {
//             if(selectedCountry){
//                 const responce = await fetch(`${API_URL}/location/states/${selectedCountry}`);
//                 const data = await responce.json();
//                 setStates(data.states);
//                 if(responce.ok){
//                     console.log(data)
//                 }
//             }else{
//                 setStates([])
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const fetchCities = async()=>{
//         try {
//             if(selectedState){
//                 const responce = await fetch(`${API_URL}/location/cities/${selectedCountry}/${selectedState}`);
//                 const data = await responce.json();
//                 setCities(data.city)
//                 if(responce.ok){
//                     console.log(data)
//                 }
//             }else{
//                 setCities([])
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//         fetchCountry();
//     },[])

//     useEffect(()=>{
//         fetchStates();
//     },[selectedCountry])
//     useEffect(()=>{
//         fetchCities();
//     },[selectedState])



//     const handleCountryChange =(event)=>{
//         const countryIsoCode = event.target.value;
//         setSelectedCountry(countryIsoCode);

        
//         const selectedCountryData = countries.find(country => country.isoCode === countryIsoCode);
//         if (selectedCountryData) {
//             setCountryCode(selectedCountryData.phoneCode || '');
//         }
//         setSelectedState('')
//         setSelectedCity('')
//     }
//     const handleStateChange = (event)=>{
//         setSelectedState(event.target.value)
//         setSelectedCity('')
//     }
//     const handleCitiesChange = (event)=>{
//         setSelectedCity(event.target.value)
//     }
//     const handleBloodGroup = (event) =>{
//         setSelectedGroup(event.target.value)
//     }
//     const handleFile = (event)=>{
//         setFile(event.target.files[0]);
//     }
//   return (
//     <div className='register'>
//         {loading ? (
//                 <div className="loading-container">
//                     <div className="spinner"></div>
//                 </div>
//             ) : (
//       <form onSubmit={registerHandle}>
//         <fieldset>
//             <legend>Add Donor</legend>
//             <label>Email :</label>
//             <input required={true} type="email" autoComplete='off'value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder='Enter Your Email....!!!' id="" />
//             <label >Password :</label>
//             <input required={true} type="password" autoComplete='off' name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="" placeholder='Enter Your Password...!!!'/>
//             <label >Mobile Number :</label>
//             <div className="mobile-input">
//                 <span className="country-code">{countryCode}</span>
//                 <input required={true} type="text" autoComplete='off' name="mobilenumber" value={mobilenumber} onChange={(e)=>setMobilenumber(e.target.value)} id="" placeholder='Enter Your Mobile Number....!!!' />
//             </div>
            
//             <label>Name :</label>
//             <input required={true} type="text" autoComplete='off' name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' id="" />
//             <label>Blood Group :</label>
//             <select required={true} onChange={handleBloodGroup} value={selectedGroup}>
//             <option value="">Select Your Blood Group</option>
//                         <option value="A+">A+ </option>
//                         <option value="A-">A-</option>
//                         <option value="B+">B+</option>
//                         <option value="B-">B-</option>
//                         <option value="AB+">AB+</option>
//                         <option value="AB-">AB-</option>
//                         <option value="O+">O+</option>
//                         <option value="O-">O-</option>
//             </select>
//             <label>Select Country :</label>
//                     <select required={true} value={selectedCountry} onChange={handleCountryChange} name="" id="">
//                     <option >Select Your Country</option>
//                         { countries.map((item)=>{
//                             return(
//                                 <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                             )
//                         })}
                    
//                     </select>
//                     <label>Select State :</label>
//                     <select required={true} value={selectedState} onChange={handleStateChange} name="" id="">
//                         <option >Select Your State</option>
//                         { states.map((item)=>{
//                             return(
//                                 <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
//                             )
//                         })}
//                     </select>
//                     <label>Select City :</label>
//                     <select required={true} name="" value={selectedCity} onChange={handleCitiesChange} id="">
//                         <option value="">Select City </option>
//                         {cities.map((item)=>{
//                             return(
//                                 <option key={item.name} value={item.name}>{item.name}</option>
//                             )
//                         })}
//                     </select>
//                     <label >Profile Pic :</label>
//                     <input required={true} type="file" onChange={handleFile} name="profile" id="" />
//                     <div className="submitBtn">
//                         <button>Add As Donor</button>
//                     </div>
                    
//         </fieldset>
//       </form>
//        )}
//       </div>
//   )
// }

// export default Register
import React, { useEffect, useState } from 'react';
import './Register.css';
import { API_URL } from '../../data/api';
import heart from '../../assets/heart2.jpg';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const Register = () => {
    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 500, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false, // Only animate once
        });
        // Aos.refresh(); // Refresh animations if dynamically loaded content is added
    }, []);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const navigate = useNavigate();

    const registerHandle = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', email);
            // formData.append('password', password);
            formData.append('mobilenumber', `${countryCode}${mobilenumber}`);
            formData.append('name', name);
            formData.append('bloodgroup', selectedGroup);
            formData.append('country', selectedCountry);
            formData.append('state', selectedState);
            formData.append('city', selectedCity);
            formData.append('profile', file);

            const response = await fetch(`${API_URL}/user/register`, {
                method: 'POST',
                // headers:{
                //     'Content-Type':'application/json'
                // },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert("Registration Successfully...!!!!");
                setEmail('');
                // setPassword('');
                setMobilenumber('');
                setName('');
                setSelectedGroup('');
                setSelectedCountry('');
                setSelectedState('');
                setSelectedCity('');
                setFile(null);
            } else {
                alert("Registration Failed....!!!");
            }
        } catch (error) {
            alert("Registration Failed....!!!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCountry = async () => {
        try {
            const response = await fetch(`${API_URL}/location/country`);
            const data = await response.json();
            setCountries(data.countries);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStates = async () => {
        try {
            if (selectedCountry) {
                const response = await fetch(`${API_URL}/location/states/${selectedCountry}`);
                const data = await response.json();
                setStates(data.states);
            } else {
                setStates([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCities = async () => {
        try {
            if (selectedState) {
                const response = await fetch(`${API_URL}/location/cities/${selectedCountry}/${selectedState}`);
                const data = await response.json();
                setCities(data.city);
            } else {
                setCities([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    useEffect(() => {
        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        fetchCities();
    }, [selectedState]);

    const handleCountryChange = (event) => {
        const countryIsoCode = event.target.value;
        setSelectedCountry(countryIsoCode);

        const selectedCountryData = countries.find(country => country.isoCode === countryIsoCode);
        if (selectedCountryData) {
            let cleanedPhoneCode = selectedCountryData.phonecode.replace(/[^\d+]/g, '');
            if (!cleanedPhoneCode.startsWith('+')) {
                cleanedPhoneCode = `+${cleanedPhoneCode}`;
            }
            setCountryCode(cleanedPhoneCode);
        } else {
            setCountryCode(''); // fallback
        }
        setSelectedState('');
        setSelectedCity('');
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
    };

    const handleCitiesChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleBloodGroup = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div className='register' data-aos="fade-down" >
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <form onSubmit={registerHandle}>
                    <fieldset>
                        <legend>Add Donor</legend>
                        <label>Email :</label>
                        <input
                            required
                            type="email"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email....!!!'
                        />
                        {/* <label>Password :</label>
                        <input
                            required
                            type="password"
                            autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Your Password...!!!'
                        /> */}
                        
                        <label>Name :</label>
                        <input
                            required
                            type="text"
                            autoComplete='off'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Your Name'
                        />
                        <label>Blood Group :</label>
                        <select
                            required
                            onChange={handleBloodGroup}
                            value={selectedGroup}
                        >
                            <option value="">Select Your Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        <label>Select Country :</label>
                        <select
                            required
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            <option value="">Select Your Country</option>
                            {countries.map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <label>Select State :</label>
                        <select
                            required
                            value={selectedState}
                            onChange={handleStateChange}
                        >
                            <option value="">Select Your State</option>
                            {states.map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <label>Select City :</label>
                        <select
                            required
                            value={selectedCity}
                            onChange={handleCitiesChange}
                        >
                            <option value="">Select City</option>
                            {cities.map((item) => (
                                <option key={item.name} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <label>Mobile Number :</label>
                        <div className="mobile-input">
                            <span className="country-code">{countryCode}</span>
                            <input
                                required
                                type="text"
                                autoComplete='off'
                                value={mobilenumber}
                                onChange={(e) => setMobilenumber(e.target.value)}
                                placeholder='Enter Your Mobile Number....!!!'
                            />
                        </div>
                        <label>Profile Pic :</label>
                        <input
                            required
                            type="file"
                            onChange={handleFile}
                        />
                        <div className="submitBtn" >
                            <button type="submit">Add As Donor</button>
                        </div>
                    </fieldset>
                </form>
            )}
        </div>
    );
};

export default Register;


// import React, { useEffect, useState } from 'react';
// import './Register.css';
// import { API_URL } from '../../data/api';
// import Aos from 'aos';
// import 'aos/dist/aos.css';

// const Register = () => {
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [selectedGroup, setSelectedGroup] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobilenumber, setMobilenumber] = useState('');
//     const [name, setName] = useState('');
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [countryCode, setCountryCode] = useState('');
//     const [useManualLocation, setUseManualLocation] = useState(true);
//     const [locationFetched, setLocationFetched] = useState(false);

//     useEffect(() => {
//         Aos.init({
//             duration: 500,
//             easing: 'ease-in-out',
//             once: false,
//         });
//         fetchCountry();
//     }, []);

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
//             if (selectedCountry) {
//                 const response = await fetch(`${API_URL}/location/states/${selectedCountry}`);
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
//             if (selectedState) {
//                 const response = await fetch(`${API_URL}/location/cities/${selectedCountry}/${selectedState}`);
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
//                     `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
//                 );
//                 const data = await response.json();
//                 const location = data.results[0].components;

//                 setSelectedCountry(location.country_code.toUpperCase());
//                 setSelectedState(location.state);
//                 setSelectedCity(location.city || location.town || location.village);
//                 setLocationFetched(true);
//                 alert("Location fetched successfully. Fill out other details to complete the registration.");
//             } catch (error) {
//                 console.error("Error fetching location details:", error);
//             }
//         }, (error) => {
//             console.error("Error fetching location:", error);
//         });
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const formData = new FormData();
//             formData.append('email', email);
//             formData.append('mobilenumber', `${countryCode}${mobilenumber}`);
//             formData.append('name', name);
//             formData.append('bloodgroup', selectedGroup);
//             formData.append('country', selectedCountry);
//             formData.append('state', selectedState);
//             formData.append('city', selectedCity);
//             formData.append('profile', file);

//             const response = await fetch(`${API_URL}/user/register`, {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 alert("Registration Successfully...!!!!");
//                 resetForm();
//             } else {
//                 alert("Registration Failed...!!!");
//             }
//         } catch (error) {
//             alert("Registration Failed...!!!");
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setEmail('');
//         setMobilenumber('');
//         setName('');
//         setSelectedGroup('');
//         setSelectedCountry('');
//         setSelectedState('');
//         setSelectedCity('');
//         setFile(null);
//     };

//     const toggleLocationMode = () => {
//         setUseManualLocation(!useManualLocation);
//         setLocationFetched(false);
//         setSelectedCountry('');
//         setSelectedState('');
//         setSelectedCity('');
//     };

//     return (
//         <div className='register' data-aos="fade-down">
//             {loading ? (
//                 <div className="loading-container">
//                     <div className="spinner"></div>
//                 </div>
//             ) : (
//                 <form onSubmit={handleRegister}>
//                     <fieldset>
//                         <legend>Add Donor</legend>
//                         <label>Email:</label>
//                         <input
//                             required
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder='Enter Your Email'
//                         />

//                         <label>Name:</label>
//                         <input
//                             required
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder='Enter Your Name'
//                         />

//                         <label>Blood Group:</label>
//                         <select
//                             required
//                             value={selectedGroup}
//                             onChange={(e) => setSelectedGroup(e.target.value)}
//                         >
//                             <option value="">Select Your Blood Group</option>
//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>
//                         </select>

//                         <div className="toggleMode">
//                             <button type="button" onClick={toggleLocationMode}>
//                                 {useManualLocation ? "Use Current Location" : "Enter Location Manually"}
//                             </button>
//                         </div>

//                         {useManualLocation ? (
//                             <>
//                                 <label>Select Country:</label>
//                                 <select
//                                     required
//                                     value={selectedCountry}
//                                     onChange={(e) => setSelectedCountry(e.target.value)}
//                                 >
//                                     <option value="">Select Your Country</option>
//                                     {countries.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>
//                                             {item.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <label>Select State:</label>
//                                 <select
//                                     required
//                                     value={selectedState}
//                                     onChange={(e) => setSelectedState(e.target.value)}
//                                 >
//                                     <option value="">Select Your State</option>
//                                     {states.map((item) => (
//                                         <option key={item.isoCode} value={item.isoCode}>
//                                             {item.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <label>Select City:</label>
//                                 <select
//                                     required
//                                     value={selectedCity}
//                                     onChange={(e) => setSelectedCity(e.target.value)}
//                                 >
//                                     <option value="">Select Your City</option>
//                                     {cities.map((item) => (
//                                         <option key={item.name} value={item.name}>
//                                             {item.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </>
//                         ) : (
//                             <div className="currentLocationBtn">
//                                 <button type="button" onClick={getCurrentLocation}>
//                                     Fetch Location
//                                 </button>
//                             </div>
//                         )}

//                         <label>Mobile Number:</label>
//                         <div className="mobile-input">
//                             <span className="country-code">{countryCode}</span>
//                             <input
//                                 required
//                                 type="text"
//                                 value={mobilenumber}
//                                 onChange={(e) => setMobilenumber(e.target.value)}
//                                 placeholder='Enter Mobile Number'
//                             />
//                         </div>

//                         <label>Profile Picture:</label>
//                         <input required type="file" onChange={(e) => setFile(e.target.files[0])} />

//                         <div className="submitBtn">
//                             <button type="submit">Add As Donor</button>
//                         </div>
//                     </fieldset>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default Register;
