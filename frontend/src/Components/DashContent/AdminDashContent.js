import { useState, useEffect } from "react";
import api from "../../resource/api"


function AdminDashContent() {

  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    getCourseCount();
    getEmployeeCount();
    getStudentCount();
  }, []);

  const getCourseCount = async () => {
    await api
      .get("course/getAll")
      .then((res) => {
        const courses=res.data.length
        console.log("Response data:", res.data);
        if(courses>0){
          setCourseCount(courses)
        }else{
          setCourseCount(0)
        }
      })
      .catch((error) => {
        console.error(
          "Error occurred while fetching the number of courses:",
          error
        );
      });
  };


  const getEmployeeCount = async () => {
    try {
      const [instructorRes, accountantRes, managerRes] = await Promise.all([
        api.get("instructor/getAll"),
        api.get("accountant/getAll"),
        api.get("manager/getAll"),
      ]);

      // Extract counts
      const instructorCount = instructorRes.data?.length || 0;
      const accountantCount = accountantRes.data?.length || 0;
      const managerCount = managerRes.data?.length || 0;

      const totalEmployees = instructorCount + accountantCount + managerCount;

      setEmployeeCount(totalEmployees);
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  }

  const getStudentCount = async () => {
    await api
      .get("student/getAll")
      .then((res) => {
        const students=res.data.length
        console.log("Response data:", res.data);
        if(students>0){
          setStudentCount(students)
        }else{
          setStudentCount(0)
        }
      })
      .catch((error) => {
        console.error(
          "Error occurred while fetching the number of students:",
          error
        );
      });
  };

  


  return (
    <div className="boxes">
      <div className="box box-1">
        <i className="uil uil-graduation-cap"></i>
        <span className="text">Total Students</span>
        <span className="number">{studentCount}</span>
      </div>

      <div className="box box2">
        <i className="uil uil-books"></i>
        <span className="text">Total Courses</span>
        <span className="number">{courseCount}</span>
      </div>

      <div className="box box3">
        <i className="uil uil-suitcase"></i>
        <span className="text">Total Employees</span>
        <span className="number">{employeeCount}</span>
      </div>
    </div>
  );
}

export default AdminDashContent;
