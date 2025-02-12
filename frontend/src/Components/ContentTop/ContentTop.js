// import React from 'react'
import "./ContentTop.css";


import api from "../../resource/api"
// import  { useState } from 'react';
import { NavLink,Link } from "react-router-dom";

import React, { useState, useContext,useEffect} from "react";

// import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";

import Profile from "../../resource/images/profile.png";

function ContentTop(props) {
  const {click}=props.click
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [notifs,setNotifs]=useState(false)
  const [isVisible,setIsVisible]=useState(notifs)
  const [isInvisible,setIsInvisible]=useState(!notifs)


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
    localStorage.removeItem("access-token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/"); // Navigate to the desired route
  };
  


  

  const getNotification=async()=>{
    await api.get(`todo/getDue`)
    .then((res)=>{
      console.log(res.data)
      const todos=res.data
      console.log(todos.length)
      if (todos.length>0){setNotifs(true)}
    else{
      setNotifs(false)
    }})
    .catch((err)=>{
      if(err){console.log(err)}
    })
      
  
  }
  

useEffect(()=>{
  setIsVisible(notifs)
  setIsInvisible(!notifs)
  
},[notifs])
useEffect(()=>{
  getNotification()
},[notifs])
  


  return (
    <div className="top">
      <i className="uil uil-bars sidebarToggle" onClick={click}/>
   <div className="left-nav">

      <div className="dropdown">
        <button className="dropbtn" onClick={handleButtonClick}>
          {/* <i className="uil uil-user profile"></i> */}

          <img className="userProfile" src={Profile} alt="User profile" />
        </button>
        <div className="dropdown-box">

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
                 
                  <NavLink to="/Settings">
                    <i className="uil uil-setting"></i>
                    <span>Setting</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" >
                  <a href="">
                    <i className="uil uil-signout"></i>
                    <button className="logoutbtn" onClick={handleLogoutClick}>
                      <span>Logout</span>
                    </button>
                    </a>
                    </NavLink>
                  
                </li>
              </div>
            </ul>
          </div>
        )}
        </div>
        </div>
  
      
<div>
      {isVisible &&
       <button className="todobtn">
        <Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Notification"}} >
        <div class="notification-icon">
          <i class="uil uil-bell notify animated-bell"></i>
          <span class="notification-dot"></span></div></Link>
          </button> } 
                </div>
            <div>
                {isInvisible && <button className="todobtn">
                  <Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Notification"}} >
                  <i className="uil uil-bell notify"></i></Link></button>}
                  <div/>
                <button className="todobtn"><Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Archive"}} >
                <i className="uil uil-schedule toDo"></i></Link></button>
                </div>
    </div>
    </div>
  );
}

export default ContentTop;
