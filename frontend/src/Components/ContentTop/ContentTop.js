// import React from 'react'
import './ContentTop.css'

// import  { useState } from 'react';
import { NavLink } from 'react-router-dom';

import React, { useState, useContext } from 'react';

// import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';


 import Profile from "../../resource/images/profile.png";



function ContentTop({click}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const { handleLogout } = useContext(AuthContext);
  
  const navigate = useNavigate();

  

  const handleLogoutClick = () => {
    console.log("button is clicked");
    // handleLogout();
    // navigate('/'); // Navigate to the desired route
  };  






  return (
    <div className="top">
      <i className="uil uil-bars sidebarToggle" onClick={click}></i>

      <div className="searchBox">
        <i className="uil uil-search"></i>
        <input type="text" placeholder="Search here..." />
      </div>

      <div className="dropdown">
        <button className="dropbtn" onClick={handleButtonClick}>
          {/* <i className="uil uil-user profile"></i> */}
          
           
              <img className='userProfile'
                src={Profile}
                
                alt="User profile"
              />
          
        </button>
        {/* <div id="dropDownP" >
                           <a href="#"><i className="uil uil-user-square"></i>Profile</a>
                           <a href="#"><i className="uil uil-setting"></i>Setting</a>
                           <a href="#"><i className="uil uil-signout"></i>Logout</a>
                      </div> */}

        {isOpen && (
          <div className="droplist">
            <ul>
              <div className="listcontent">
                <li>
                  <NavLink to="/Profile/ViewProfile">
                    <i className="uil uil-user-square"></i>
                    <span>Profile</span>
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/Settings">
                    <i className="uil uil-setting"></i>
                    <span>Setting</span>
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="">
                    <i className="uil uil-signout"></i>
                    <button onClick={handleLogoutClick}>Logout</button>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>

      <i className="uil uil-bell notify"></i>
      <i className="uil uil-schedule toDo"></i>
    </div>
  );
}

export default ContentTop










 
               
             
