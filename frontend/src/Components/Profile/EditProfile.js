import React, { useState, useEffect } from "react"
import { userInfoSetting } from "./Profile"
import '../DashContent/DashContent.css';
import "./Profile.css";
import Profile from "../../resource/images/profile.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

function EditProfile() {

    let oldUsername = null
    let email= null
    let firstName = null
    let lastName = null
    let phonenumber = null

    const [newUser, setNewUser] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newFirstName, setNewFirst] = useState('')
    const [newLastName, setNewLast] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const usernameName = localStorage.getItem("username")
    const role = localStorage.getItem("role")
    let user = {}
    useEffect(() => {

        axios.post("http://localhost:8081/profile/getProfile", {role, usernameName}).then((res) => {
    
            if(res.data.success === false){
              alert("Error while loading profile please try again")
            }
            else{
              oldUsername = res.data.username
              email = res.data.email
              phonenumber = res.data.phone
              firstName = res.data.full_name.split(" ")[0]
              lastName = res.data.full_name.split(" ")[2]
            }
    
        })
    
      }, [])

    const handleEdit = (e) => {
        e.preventDefault()
        user = {
            username: newUser,
            full_identification: newFirstName + " " + newLastName,
            email: newEmail,
            phonenumber: newPhone
        }

        axios.post('http://localhost:8081/profile/editProfile', {user, usernameName, role}).then((res) => {
            if (res.data.success === false) {
                alert(res.data.msg)
            }
            else if(res.data.error){
                console.log(res.data.error);
            }
            else{
                alert("Profile updated successfully")
                window.location.reload()
            }
        })
    }

    return(
        <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i className="uil uil-user-square"></i>
          <span className="text">Profile</span>
        </div>
        <div className="content">
  
          {/* Page content */}
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a href="#">
                          <img
                            src={Profile}
                            className="rounded-circle"
                            alt="User profile"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div>
                      <a className="profilePicture profile-btn" href="">
                        Update Picture
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header  border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">My account</h3>
                      </div>
                      <div className="col-4 text-right"></div>
                    </div>
                  </div>
                  <div className="card-body bg-white">
                    <form>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                id="input-username"
                                className="form-control form-control-alternative"
                                placeholder={oldUsername}
                                onChange={(e) => {setNewUser(e.target.value)}}

                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Role
                              </label>
                              <span
                                className="form-control-label form-control form-control-alternative"
                                style={{
                                  display: "block",
                                  fontSize: "large",
                                }}
                              >
                                {role}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                id="input-first-name"
                                className="form-control form-control-alternative"
                                placeholder={firstName}
                                onChange={(e) => {setNewFirst(e.target.value)}}
                              />
                            </div>
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="input-first-name"
                                className="form-control form-control-alternative"
                                value="Password"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                id="input-last-name"
                                className="form-control form-control-alternative"
                                placeholder={lastName}
                                onChange={(e) => {setNewLast(e.target.value)}}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="input-email"
                                className="form-control form-control-alternative"
                                placeholder={email}
                                onChange={(e) => {setNewEmail(e.target.value)}}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Phone number
                              </label>
                              <input
                                type="text"
                                id="input-phone"
                                className="form-control form-control-alternative"
                                placeholder={phonenumber}
                                onChange={(e) => {setNewPhone(e.target.value)}}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </form>
                    <div className="editBtn">
                      {" "}
                      <NavLink to='' className="btn btn-warning btnForAll ">
                        
                        <button onClick={handleEdit}>Save</button>
                        
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
    // </div>
    )
}

export default EditProfile
