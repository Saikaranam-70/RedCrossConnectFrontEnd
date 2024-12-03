import React, { useEffect, useState } from 'react'
import './DonorDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../data/api';
import ChatComponent from '../Chat/Chat';

const DonorDetails = () => {
  // const {id} = localStorage.getItem('userId')
  const [donorDetail, setDonorDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [id, setId] = useState('')
  const navigate = useNavigate();

  const [senderEmail, setSenderEmail] = useState('')
  const [receiverEmail, setReceiverEmail] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

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

 


  const handleNotification = async(e)=>{
    // e.preventDefault()
    e.preventDefault();
    setLoading(true)
    try {
      console.log("called")
      
      setSenderEmail(userEmail)
      setReceiverEmail(donorDetail.email)
      setName(users[0]?.name)
      setNumber(users[0]?.mobilenumber)
      const responce = await fetch(`${API_URL}/notification/sendNotification`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderEmail, receiverEmail, name, number})
      })
      const data = await responce.json();
      console.log(data)
      if(responce.ok){
        alert("notification send successfully")
        console.log(data)
      }else{
        alert("There is a technical failure the site is in under processing")
      }
    } catch (error) {
      alert("failed")
    }finally{
      setLoading(false)
    }

  }




  useEffect(()=>{
    const currentUrl = window.location.href;
    const userId = currentUrl.split('/').pop()
    setId(userId)
  },[])

  const handleDonorDetails = async() =>{
    try {
      setLoading(true)
      console.log(id)
      const responce = await fetch(`${API_URL}/user/getUser/${id}`)
      const data = await responce.json();
      if(responce.ok){
        setDonorDetail(data.user)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    handleDonorDetails()
  },[id])
  if (loading) {
    return (
      <div className="spinner">
          <div></div>
      </div>
  );
  }
  if (!donorDetail) {
    return <div className="donor-details">Donor not found.</div>;
  }

  return (
    <div className="donor-details-container">
    <div className="donor-details-left">
      <h2>{donorDetail.name}</h2>
      <p>Email: {donorDetail.email}</p>
      <p>Mobile: {donorDetail.mobilenumber}</p>
      <p>Blood Group: {donorDetail.bloodgroup}</p>
      <p>Country: {donorDetail.country}</p>
      <p>State: {donorDetail.state}</p>
      <p>City: {donorDetail.city}</p>
      <div className="donor-buttons">
        <button className="chat-btn" onClick={()=>navigate(`/chat/${donorDetail._id}`)}>Chat 
        
        </button>
        <button className="notify-btn"  onClick={handleNotification}>Notify Donor</button>
        <button className="call-btn"><a href={`tel:${donorDetail.mobilenumber}`} className='a' >Call</a></button>
        
      </div>
      
    </div>
    <div className="donor-details-right">
      <img src={`${API_URL}/user/uploads/${donorDetail.profile}`} alt={donorDetail.name} className="donor-image" />
    </div>
  </div>
  )
}

export default DonorDetails
