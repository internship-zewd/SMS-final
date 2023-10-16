import React, { useState, useEffect } from 'react'
import '../DashContent/DashContent.css'
import './Addst.css'
import { Table } from 'react-bootstrap';
import {Filter} from './Filter';
import axios from 'axios';
import {ViewPopup} from './ViewPopup';
import {UpdatePopup} from './UpdatePopup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function AllSt() {

    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    
    const [studentinfo, setStudentinfo] = useState({});
    const [updatePopup, setUpdatePopup] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        getStudent();

    }, [])

    const getStudent=async()=>{

      await axios.get('http://localhost:8081/student')
      .then((res)=>{
          
          setData(res.data)
          
      })
      .catch((err)=>{
          if(err){console.log(err)}
      })
  
  }
  const handleView=async(e,id)=>{
      // e.preventDefault();
      return await axios.get('http://localhost:8081/student/${id}')
      .then((response)=>{
  
          const viewData=response.data
  
          setStudentinfo(viewData)
          // console.log(response.data)
         
          setButtonPopup(true)
      
          
          
      })
      .catch((err)=>{
          if(err){console.log(err)}
      })
  
  
  }
  const handleUpdate=async(e,id)=>{
  
      // e.preventDefault(); 
      await axios.get('http://localhost:8081/student/${id}')
      .then((response)=>{
          setStudentinfo(response.data)
          console.log(response.data)
          console.log(studentinfo)
          setUpdatePopup(true)
      })
      .catch((err)=>{
          if(err){
              console.log(err)
          }
      })
  
      
  
  }
  const handleDelete=async(e,id)=>{
      // e.preventDefault()
  
  await axios.delete('http://localhost:8081/student/${id}')
  .then((res)=>{console.log("deleted"+ res)
  console.log(res)})
  
  }
  



    return (
      <div className="dashContent">
        <div className="overview">
          <div className="title">
            <i className="uil uil-graduation-cap"></i>
            <span className="text">Studet/All Students</span>
          </div>

          <div className="content">
            <div className="user-details">
              <form>
                <Filter data={data} setData={setData} />
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Search Students"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    name="search"
                    value={search}
                  />
                </div>
              </form>
            </div>
          </div>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.username.toLowerCase().includes(search);
                })
                .map((item, index) => (
                  <tr className="actionIcons" key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.course}</td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={(e) => {
                        handleView(e, item.id);
                      }}
                    >
                      <VisibilityIcon />
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={(e) => {
                        handleUpdate(e, item.id);
                      }}
                    >
                      {" "}
                      <EditIcon />
                    </button>
                    <UpdatePopup
                      trigger={updatePopup}
                      setTrigger={setUpdatePopup}
                      updateProp={studentinfo}
                    />
                    <ViewPopup
                      trigger={buttonPopup}
                      setTrigger={setButtonPopup}
                      studentProp={studentinfo}
                    />
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      {" "}
                      <DeleteIcon />
                    </button>{" "}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
}

export default AllSt