// import './Popup.css';
import {React,useEffect} from 'react';
import api from "../../resource/api"
export const ViewPopup=(props)=> {


  const classProp=props.classProp
  console.log('We are in view popoup and the classProp : ',classProp)
  const setTrigger=props.setTrigger
 
  // useEffect(
  //   getCourse(),
  //   getInstructor()
  //   ,[])

  //   const getCourse=async()=>{

  //   }
  

  return (props.trigger)?(
    <div className='popup'>
    <div className="popup-inner">
      <div><h3>{classProp.name}'s Id:</h3><span><h2> {classProp.id}</h2></span></div>
      {/* <h3>{classProp.name}</h3><p> {classProp.name} </p> */}
      <div><h3>{classProp.name}'s Course:</h3><span><h2> {classProp.course_id}</h2></span></div>
      <div><h3>{classProp.name}'s Instructor</h3><span><h2> {classProp.instructor_id} </h2></span></div>
      
    <button className="close-btn" onClick={()=>{setTrigger(false)}}>close</button>
    {props.children}
    </div>
    </div>
    
  ):"";
};