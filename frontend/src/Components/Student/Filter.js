import React, { useState, useEffect } from 'react';
import axios from 'axios'
export const Filter = (props) => {
  const { data, setData } = props;

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [course, setCourse] = useState(null);
  const [courseFetched,setCourseFetched]=useState([])

   useEffect(() => {
    getCourse();
  }, []);

  const getCourse=async()=>{
    await axios.get("http://localhost:8081/course/getAll")
    .then((res)=>{
        console.log(res.data)
        setCourseFetched(res.data)
    })
    .catch((err)=>{
        if(err){console.log(err)}
    })
}
const handleCourse=(e)=>{
    setCourse(e)
   

}

  const filterStudents = () => {
    const filteredData = data.filter((item) => {
      return (
        (selectedCourse === '' , item.course === selectedCourse) &&
        (selectedGender === '' , item.gender === selectedGender) &&
        (selectedPaymentStatus === '' || item.paymentStatus === selectedPaymentStatus)
      );
    });

    setData(filteredData);
  };

  const resetFilter = () => {
    setSelectedCourse('');
    setSelectedGender('');
    setSelectedPaymentStatus('');
    setData(data);
  };

  // Automatically apply the filter when any filter option changes
  useEffect(() => {
    filterStudents();
  }, [selectedCourse, selectedGender, selectedPaymentStatus]);

  return (
    <form>
      <div className="user-details">
      <div className="input-box">
      <div className="gender-details">
    
               <select onChange={(e) => { handleCourse(e.target.value); }} name="course">
                                       <option value={null} selected='selected'>Select Course</option>
                                        {
                                        courseFetched.map((cors)=>(

                                            <option value={cors.id}>{cors.course_name}</option>

                                        )
                                   
                                        )}                                   
        
                                    </select>
      </div>
      </div>
      
      <div className="input-box">
      <div className="gender-details">
   
        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      </div>

      <div className="input-box">
      <div className="gender-details">
     
        <select value={selectedPaymentStatus} onChange={(e) => setSelectedPaymentStatus(e.target.value)}>
          <option value="">Select Payment Status</option>
          <option value="half">Half_Paid</option>
          <option value="full">Full_Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
      </div>
      <div className="buttons">
        <button className="btn btn-warning" onClick={resetFilter}>
          Reset Filter
        </button>
      </div>
      </div>
    </form>
  );
};