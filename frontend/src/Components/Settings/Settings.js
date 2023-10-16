import React from 'react'
import '../DashContent/DashContent.css'
import {Link} from "react-router-dom";

function Setting() {
  return (
    <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i class="uil uil-setting"></i>
          <span className="text">Settings</span>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <div className="user-details">
            <button
              style={{
                width: 800,
                boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.2)",
                textAlign: "left",
                color: "black",
              }}
              className="btn btn-outline-warning btn-block button"
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={{ pathname: "" }}
              >
                Account
              </Link>{" "}
            </button>
            <br />
            <br />
            <button
              style={{
                width: 800,
                boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.2)",
                textAlign: "left",
              }}
              className="btn btn-outline-warning btn-block button"
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={{ pathname: "" }}
              >
                Security
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting