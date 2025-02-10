import '../DashContent/DashContent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import api from "../../resource/api"

export const UpdatePopup = (props) => {


  const updateProp=props.updateProp
  const id=updateProp.id
  const class_name=updateProp.name
  const course_id=updateProp.course_id
  const instructor_id=updateProp.instructor_id
  const id_tag=updateProp.id_tag
  const setTrigger=props.setTrigger
  const [className, setClassName] = useState(class_name);
  const [instructor, setInstructor] = useState(instructor_id);
  const [course, setCourse] = useState(course_id);
  const [instructorList, setInstructorList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [errors, setErrors] = useState({});
  // const [finalName,setFinalName]=useState(updateProp.classNameOnly)


useEffect(()=>{
  setClassName(class_name)
  setCourse(course_id)
  setInstructor(instructor_id)
  getInstructors()
  getCourses()

},[class_name,instructor_id,course_id])


  // useEffect(() => {

  //   console.log(updateProp);
  //   setClassName(updateProp.className);
  //   setInstructor(updateProp.instructor_id);
  //   setCourse(updateProp.course_id);
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
        console.log('this is theh instructors fetched: ',res.data)
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("im in here ");
    await api.put(`class_room/update/${id}`, { className, instructor, course,id_tag })
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
                      <input type="text" id='className' required defaultValue={className} onChange={(e) => { setClassName(e.target.value) }} name="className" placeholder=" Name of class" /><br />
                    </div>
                    <div className="input-box">
                      <span className="details">Instructor</span>
                      <select
                        required
                        defaultValue={instructor}
                        onChange={(e) => { setInstructor(e.target.value) }}
                        name="instructorName"
                      >
                        <option value="">Select Instructor</option>
                        {instructorList.map((ins, index) => (
                          <option
                            key={ins.id}
                            value={ins.id}
                          >
                            {ins.full_identification}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-box">
                      <span className="details">Course</span>
                      <select
                        required
                        defaultValue={course}
                        onChange={(e) => { setCourse(e.target.value) }}
                        name="course"
                      >
                        <option>Select Course</option>
                        {courseList.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.full_identification}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type='submit' className="btn btn-info btn-block" name='submit' onChange={handleSubmit}>Submit</button>
                    <button className="btn btn-info btn-block"  onClick={()=>{setTrigger(false)}}>Close</button>
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
