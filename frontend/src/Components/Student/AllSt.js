import React, { useState, useEffect } from 'react'
import '../DashContent/DashContent.css'
import './Addst.css'
import { Table } from 'react-bootstrap';
import api from "../../resource/api"
import {ViewPopup} from './ViewPopup';
import {UpdatePopup} from './UpdatePopup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyPage from '../EmptyPage';


function AllSt() {

    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    
    const [studentinfo, setStudentinfo] = useState({});
    const [updatePopup, setUpdatePopup] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [Class,setClass]=useState([])
    const [empty,setEmpty]=useState(false)


    useEffect(() => {
        getStudent();
        

    }, [])

    const getClass=async()=>{
    
        await api.get(`class_room/getAll`)
        .then((res)=>{console.log(res)})
        .catch((err)=>{if(err){console.log(err)}})


    }

    const getStudent=async()=>{
      
      await api.get('student/getAll')
      .then((res)=>{
        getClass()
          console.log("this is all the studens"+res.data)
          const studentsFetched=res.data
           console.log(res.data)
          setData(studentsFetched)
          if (studentsFetched.length===0){
            setEmpty(true)

          }else{
            setEmpty(false)

          }
          
          
      })
      .catch((err)=>{
          if(err){console.log(err)}
      })
  
  }
  const handleView=async(e,id)=>{
      // e.preventDefault();
      return await api.get(`student/getOne/${id}`)
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
      await api.get(`student/update/${id}`)
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
  
  await api.delete(`student/delete/${id}`)
  .then((res)=>{
    
    console.log("deleted"+ res)
    console.log(res)
    window.location.reload()
})
  .catch((err)=>{
    if(err){console.log(err)}

  })
  
  }
  



    return (
        <div className="dashContent">
            <div className="overview">
                <div className="title">
                    <i className="uil uil-graduation-cap"></i>
                    <span className="text">Studet/All Students</span>
                </div>                           
              
                {empty&& <EmptyPage pageName="Student" />}

                {!empty&& 
                
                <div>
                <div className='input-box'>
                <form>
                    <input type="text" placeholder="Search Students" onChange={(e) => { setSearch(e.target.value) }} name="search" value={search} />
                </form>
            </div>
            <br/>
            
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Course</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {data.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.username.toLowerCase().includes(search);

                        })
                            .map((item, index) => (
                                <tr key={item.id}>

                                    <td>{item.full_name}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.course}</td> */}
                                    <button className="btn btn-primary btn-sm me-2" onClick={(e) => { handleView(e, item.id)}}><VisibilityIcon/></button>
                                    <button className="btn btn-primary btn-sm me-2" onClick={(e) => { handleUpdate(e, item.id)}}><EditIcon/></button>
                                    <UpdatePopup trigger={updatePopup} setTrigger={setUpdatePopup} updateProp={studentinfo}/>
                                    
                                   <ViewPopup trigger={buttonPopup} setTrigger={setButtonPopup} studentProp={studentinfo} />
                                    
                                    <button  className='btn btn-sm btn-danger' onClick={(e) => { handleDelete(e, item.id) }}> <DeleteIcon/></button>   </tr>
                            ))}
                    </tbody>
                </Table>
                </div>
}
            </div>




        </div>
    )
}

export default AllSt