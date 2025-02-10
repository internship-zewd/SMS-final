import '../DashContent/DashContent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import api from "../../resource/api"

export const UpdatePopup = (props) => {


  const updateProp=props.updateProp
  const id=updateProp.id
  const name_only=props.classNameOnly
  const class_name=props.className
  const course_name=props.courseName
  const instructor_name=props.instructorName
  const setTrigger=props.setTrigger
  const id_tag=props.id_tag
  const [className, setClassName] = useState(updateProp.className);
  const [instructorName, setInstructorName] = useState(updateProp.instructorName);
  const [courseName, setCourseName] = useState(updateProp.courseName);
  const [instructorList, setInstructorList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [errors, setErrors] = useState({});
  const [finalName,setFinalName]=useState(updateProp.classNameOnly)


useEffect(()=>{
  setClassName(class_name)
  setInstructorList(instructor_name)
  setCourseName(course_name)
  setFinalName(name_only)
  getInstructors()
  getCourses()

},[class_name,instructor_name,course_name])


  // useEffect(() => {

  //   console.log(updateProp);
  //   setClassName(updateProp.className);
  //   setInstructorName(updateProp.instructorName);
  //   setCourseName(updateProp.courseName);
  //   nameOnly=updateProp.className.split(' ')
  //   setFinalName (nameOnly[1])
  //   getCourses();
  //   getInstructors();
  // }, [updateProp]);

  const getCourses = async () => {
    await api.get(`course/getAll`)
      .then((res) => {
        setCourseList(res.data);
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const getInstructors = async () => {
    await api.get(`instructor/getAll`)
      .then((res) => {
        setInstructorList(res.data);
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("im in here ");
    await api.put(`class_room/update/${id}`, { className, instructorName, courseName, finalName,id_tag })
      .then((res) => {
        alert(res.data);
        console.log(res.data);
        console.log("we're in put router ");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (props.trigger) ? (
    <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i className="uil uil-graduation-cap"></i>
          <span className="text">class/All classs</span>
        </div>
        <div className="container">
          <div className="content">
            <div className="popup">
              <div className="popup-inner">
                <form onSubmit={handleSubmit}>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">class Name</span>
                      <input type="text" id='className' required defaultValue={updateProp.classNameOnly} onChange={(e) => { setClassName(e.target.value) }} name="className" placeholder=" Name of class" /><br />
                    </div>
                    <div className="input-box">
                      <span className="details">Instructor</span>
                      <select
                        required
                        defaultValue={updateProp.instructorName}
                        onChange={(e) => { setInstructorName(e.target.value) }}
                        name="instructorName"
                      >
                        <option value="">Select Instructor</option>
                        {instructorList.map((instructorName, index) => (
                          <option
                            key={index}
                            value={instructorName.full_identification}
                          >
                            {instructorName.full_identification}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-box">
                      <span className="details">Course</span>
                      <select
                        required
                        defaultValue={updateProp.courseName}
                        onChange={(e) => { setCourseName(e.target.value) }}
                        name="course"
                      >
                        <option>Select Course</option>
                        {courseList.map((item) => (
                          <option key={item.id} value={item.full_identification}>
                            {item.full_identification}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type='submit' className="btn btn-info btn-block" name='submit' onChange={handleSubmit}>Submit</button>
                    <button className="btn btn-info btn-block" onClick={() => { setTrigger(false) }}>Close</button>
                  </div>
                </form>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : "";
};
