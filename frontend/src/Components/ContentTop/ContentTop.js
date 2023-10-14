import React from 'react'
import './ContentTop.css'

import  { useState } from 'react';


  

function ContentTop({click}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
          <i className="uil uil-user profile"></i>
        </button>
        {/* <div id="dropDownP" >
                           <a href="#"><i className="uil uil-user-square"></i>Profile</a>
                           <a href="#"><i className="uil uil-setting"></i>Setting</a>
                           <a href="#"><i className="uil uil-signout"></i>Logout</a>
                      </div> */}

        {isOpen && (
          <div className='droplist' >
            <ul>
             <div className='listcontent'> 
              <li><a href="#"><i className="uil uil-user-square"></i><span>Profile</span></a></li>
              <li> <a href="#"><i className="uil uil-setting"></i><span>Setting</span></a></li>
              <li> <a href="#"><i className="uil uil-signout"></i><span>Logout</span></a></li>
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