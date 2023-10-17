// import React from 'react'
import "./ContentTop.css";


import axios from 'axios'
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
    window.location.reload();
  };


  

  const getNotification=async()=>{
    await axios.get(`http://localhost:8081/todo/getDue`)
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
      <i className="uil uil-bars sidebarToggle" onClick={click}></i>

      <div className="searchBox">
        <i className="uil uil-search"></i>
        <input type="text" placeholder="Search here..." />
      </div>

      <div className="dropdown">
        <button className="dropbtn" onClick={handleButtonClick}>
          {/* <i className="uil uil-user profile"></i> */}

          <img className="userProfile" src={Profile} alt="User profile" />
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
                  {/* <NavLink > */}
                  <a href="">
                    <i className="uil uil-signout"></i>
                    <button className="logoutbtn" onClick={handleLogoutClick}>
                      <span>Logout</span>
                    </button>
                    {/* </NavLink> */}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>

      {isVisible && <button className="todobtn"><Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Notification"}} ><div class="notification-icon"><i class="uil uil-bell notify animated-bell"></i><span class="notification-dot"></span></div></Link></button> } 
                
                {isInvisible && <button className="todobtn"><Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Notification"}} ><i className="uil uil-bell notify"></i></Link></button>}
               
                <button className="todobtn"><Link  style={{ textDecoration: 'none' }}to={{pathname:"../To-Do/Archive"}} ><i className="uil uil-schedule toDo"></i></Link></button>
    </div>
  );
}

export default ContentTop;
