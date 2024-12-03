import React from 'react'
import { Link } from 'react-router-dom'
import './Donor.css'

const Donor = ({donor}) => {
  return (
    
    <div className="donors">
        <p>hfcfsfhcbeuv</p>
        {
            donor.map((item)=>{
                return(
                    // <Link to={`/donor/${item._id}`}>
                        
                    <div className="donor" >
                        
                        <div className="icon">{item.name.charAt(0)}</div>
                        <div className="detail">
                        <div className="name">
                            <h3 >{item.name}</h3>
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
                        <div className="btn">
                            <button>View Profile</button>
                        </div>
                    </div>
                    
                    </div>
                    
                    // </Link>
                )
            })
        }

    </div>
  )
}

export default Donor
