// import './Popup.css';
import {React} from 'react';
export const ViewPopup=(props)=> {


  const classProp=props.classProp
  const setTrigger=props.setTrigger
  // console.log(classProp)
  // const type=data.course_type

  

  return (props.trigger)?(
    <div className='popup'>
    <div className="popup-inner">
      <h3>{classProp.className}'s Id:</h3><p> {classProp.classId}</p>
      {/* <h3>{classProp.name}</h3><p> {classProp.name} </p> */}
      <h3>{classProp.className}'s Course</h3><p> {classProp.courseName} </p>
      <h3>{classProp.className}'s Instructor</h3><p> {classProp.instructorName} </p>
      
    <button className="close-btn" onClick={()=>{setTrigger(false)}}>close</button>
    {props.children}
    </div>
    </div>
    
  ):"";
};