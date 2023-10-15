import React from 'react';
import './Profile.css';
import '../DashContent/DashContent.css';
import Profile from "../../resource/images/profile.png";

const UserProfile = () => {
  return (
    <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i className="uil uil-user-square"></i>
          <span className="text">Profile</span>
        </div>
        <div className="content">
          {/* <div className="user-details"> */}

          {/* <div className="putMarginForAll"> */}
          {/* <div className="main-content"> */}
          {/* Top navbar */}
          {/* <nav
                className="navbar navbar-top navbar-expand-md navbar-dark"
                id="navbar-main"
              > */}
          {/* <div className="container-fluid"> */}
          {/* Brand */}
          {/* <h4 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block firstContent">
                    User profile
                  </h4> */}
          {/* Form */}
          {/* <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <div className="form-group mb-0">
                      <div className="input-group input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-search"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Search"
                          type="text"
                        />
                      </div>
                    </div>
                  </form> */}

          {/* User */}
          {/* <ul className="navbar-nav align-items-center d-none d-md-flex">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link pr-0"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="media ">
                          <span className="avatar avatar-sm rounded-circle">
                            <img src={Logo} alt="Image placeholder" />

                           
                          </span>
                          <div className="media-body ml-2 d-none d-lg-block">
                            <span className="mb-0 text-sm font-weight-bold">
                              Someone
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul> */}

          {/* </div> */}
          {/* </nav> */}

          {/* Header */}
          {/* <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                  minHeight: "600px",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              > */}
          {/* Mask */}
          {/* <span className="mask bg-gradient-default opacity-8"></span> */}
          {/* Header container */}
          {/* <div className="container-fluid d-flex align-items-center">
                  <div className="row firstContent">
                    <div>
                      <h1 className="helloUser">Hello User</h1>
                      <p className="profileDescription">
                        This is your profile page.
                      </p>
                      <a href="#!" className="btn btn-info">
                        Edit profile
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}

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
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">My account</h3>
                      </div>
                      <div className="col-4 text-right">
                        <a href="#!" className="btn btn-sm btn-warning">
                           Edit
                          {/* Settings */}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
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
                                placeholder="Username"
                                value="testInstructorUser"
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
                                Instructor
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
                                placeholder="First name"
                                value=""
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
                                placeholder="Last name"
                                value=""
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
                                placeholder="hello@example.com"
                                value=""
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
                                placeholder="+251 *********"
                                value=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </form>
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
  );
};

export default UserProfile;
