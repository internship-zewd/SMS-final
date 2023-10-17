import axios from "axios";
import React, { useState } from "react";

function ChangePassword() {
    
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const username = localStorage.getItem("username")
    const role = localStorage.getItem("role")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8081/profile/changePassword", {oldPassword, newPassword, username, role}).then((res => {
            if(res.data.success === false){
                alert(res.data.msg)
            }
            else{
                alert("Password changed successfully")
            }
        }))
    }
  return (

    <div className="dashContent">
        <div className="overview">
                    <div className="title">
                   < i class="uil uil-user"></i>
                        <span className="text">Change Password</span>
                    </div>

                </div>

                <div className="container">
                    <div className="content">
                      
                            <form onSubmit={handleSubmit}>
                            <div className = "user-details">
                                <div className = "input-box">
                                <div className = "gender-details">
                                <span className="details">Old Password</span>
                                <input type="text" name="oldpswd" placeholder="Old password" required onChange={(e) => {setOldPassword(e.target.value)}} />
                                </div></div><br/>
                                <div className = "input-box"></div>
                                <div className = "input-box">
                                <div className = "gender-details">
                                <span className="details">New Password</span>
                                <input type="text" name="newpswd" placeholder="New password" required onChange={(e) => {setNewPassword(e.target.value)}} />
                                </div></div><br/>
                                <button className="btn btn-warning button">Submit</button>
                                </div>
                            </form>
                     
                    </div>
                </div>
          </div>
  )
}

export default ChangePassword