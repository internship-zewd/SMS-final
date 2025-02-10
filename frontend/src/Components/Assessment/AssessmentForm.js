import React, { useState, useEffect } from "react";
import "../DashContent/DashContent.css";
import "./AssessmentForm.css";
import api from "../../resource/api"
import { Table } from "react-bootstrap";

function AssessmentForm() {
  const [errors, setErrors] = useState({});
  const [studentList, setStudentList] = useState([]);
  const [gradeInputs, setGradeInputs] = useState({});
  const [insertedValue, setInsertedValue] = useState("Exam(default)");
  const [selectedClass, setSelectedClass] = useState("");
  const [classList, setClassList] = useState([]);
  const [outOf, setOutOf] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    api
      .post("http://localhost:8081/assessment/specificClass", { username })
      .then((res) => {
        if (res.data.success === false) {
          console.log("error fetching data");
        } else {
          setClassList(res.data);
        }
      });
  }, []);

  const handleClassChange = (e) => {
    e.preventDefault();
    api
      .post("assessment/specificStudent", {
        selectedClass,
        outOf,
        insertedValue,
        username,
      })
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gradesToInsert = [];

    studentList.forEach((student, index) => {
      const grade = gradeInputs[index];
      if (grade !== undefined) {
        const gradeObject = {
          studentName: student.full_identification,
          assessmentName: insertedValue,
          grade: grade,
          className: selectedClass,
        };
        gradesToInsert.push(gradeObject);
      } else {
        const gradeObject = {
          studentName: student.full_identification,
          assessmentName: insertedValue,
          grade: "0",
          className: selectedClass,
        };
        gradesToInsert.push(gradeObject);
      }
    });

    api
      .post("assesment/register/insertGrade", { gradesToInsert })
      .then((res) => {
        if (res.data.success) {
          console.log("Grades inserted successfully");
        } else if (res.data.success === false) {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error inserting grades:", error);
      });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInsertedValue(value);
  };
  const handleOutOf = (e) => {
    setOutOf(e.target.value);
  };
  const handleGradeChange = (event, studentIndex) => {
    const { value } = event.target;
    setGradeInputs((prevInputs) => ({
      ...prevInputs,
      [studentIndex]: value,
    }));
  };

  return (
    <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i class="uil uil-file-alt"></i>
          <span className="text">Assessment/Assessment Form</span>
        </div>
      </div>

      <div className="container">
        <div className="title">
          <span className="text">Assessment Evaluation</span>
        </div>

        <div className="content">
          <form onSubmit={handleClassChange}>
            <div className="user-details">
              <div className="input-box">
                <div className="gender-details">
                  <span className="details">Assessment Name</span>
                  <input
                    type="text"
                    placeholder="Assessment Name"
                    onChange={handleInputChange}
                  />
                  <div className="errors">{errors.AssessName}</div>
                </div>
              </div>

              <div className="input-box">
                <div className="gender-details">
                  <span className="details">Out of:</span>
                  <input type="text" required onChange={handleOutOf} />
                  <div className="errors">{errors.OutOf}</div>
                </div>
              </div>

              <div className="input-box">
                <div className="gender-details">
                  <span className="details">Select class:</span>
                  {classList.length > 0 ? (
                    <div className="input-box">
                      <div className="gender-details">
                        <span className="details">Select class:</span>
                        <select
                          value={selectedClass}
                          onChange={(e) => {
                            setSelectedClass(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          {classList.map((className, index) => (
                            <option
                              key={index}
                              value={className.full_identification}
                            >
                              {className.full_identification}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <p>No classes available</p>
                  )}
                </div>
              </div>

              <input
                className="btn btn-warning button"
                type="submit"
                value="Create"
              />
            </div>
          </form>
          {studentList.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Students</th>
                    <th>{insertedValue}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student.fullIdentification}</td>
                      <td>
                        <input
                          type="text"
                          value={gradeInputs[index]}
                          onChange={(event) => handleGradeChange(event, index)}
                          pattern="^\d*\.?\d+$"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <button className="btn btn-warning button" type="submit">
                Finish
              </button>
            </form>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default AssessmentForm;
