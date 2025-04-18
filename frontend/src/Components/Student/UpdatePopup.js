import React,{useState,useEffect} from "react";
import '../DashContent/DashContent.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../resource/api"





export const UpdatePopup=(props)=>{

    const setTrigger=props.setTrigger
    const updateProp=props.updateProp
    const id=updateProp.id
    const idTag=localStorage.getItem('id_tag')
    const [fullName, setFullName] = useState(updateProp.full_name);
    const [email, setEmail] = useState(updateProp.email);
    const [gender, setGender] = useState(updateProp.gender);
    const [phonenumber, setPhonenumber] = useState(updateProp.phonenumber);
    const [paymentStatus, setPaymentStatus] = useState(updateProp.paymentStatus);
    const [addmitiondate, setAddmitiondate] = useState(updateProp.addmitiondate);
    const [course, setCourse] = useState(updateProp.course);
    const [classs, setClasss] = useState(updateProp.classs);
    const [dob, setDob] = useState(updateProp.dob);
    // const [registno, setRegistno] = useState(updateProp.registno);
    const [coursesFetched,setCoursesFetched]=useState([])
    const [classesFetched,setClassesFetched]=useState([])
    

   
   const getCourses=async()=>{

    await api.get(`course/getAll`)
   .then((res)=>{
    setCoursesFetched(res.data)
    console.log('These r the courses fetched: ', res.data)

   }).catch((error)=>{
    if(error){
        console.log(error)
    }
   })
     
   }
   const getClasses=async()=>{

    await api.get(`class_room/getAll`)
   .then((res)=>{
    setClassesFetched(res.data)
    console.log('These r the classes fetched: ', res.data)

   }).catch((error)=>{
    if(error){
        console.log(error)
    }
   })
     
   }


   
// console.log(updateProp.id)


const handleSubmit = async(e) => {
   e.preventDefault();
   
    return await api
    .put(`student/update/${id}`,{fullName,email,phonenumber,gender,paymentStatus,course,classs,dob})
    .then((res)=>{
        console.log(res.data)
        alert("Updated succesfully!")
        window.location.reload()
    })
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })
}
 useEffect(()=>{
    getCourses()
    getClasses()
 },[])
    return(props.trigger)?(
        
        

        <div className="dashContent">
        <div className="overview">
            <div className="title">
                <i className="uil uil-graduation-cap"></i>
                <span className="text">Student/Add Student</span>
            </div>
            <div className="container">

                <div className="content">
                <div className="popup">
                  <div className="popup-inner">
                    <form onSubmit={handleSubmit}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input type="text" name="fullName" placeholder="Enter your name" defaultValue={updateProp.full_name} required minLength={6} onChange={(e)=>{setFullName(e.target.value )}} />
                            </div>

                            <div className="input-box">
                                <span className="details">Email </span>
                                <input type="email" placeholder="Enter your Email " name="email" defaultValue={updateProp.email} required onChange={(e)=>{setEmail(e.target.value )}} />

                            </div>

                            <div className="input-box">
                                <span className="details">Mobile Number</span>
                                <input type="number"  placeholder="09--------" name="phonenumber"  defaultValue={updateProp.phonenumber} required maxlength="10" onChange={(e)=>{setPhonenumber(e.target.value )}} />

                            </div>

                            <div className="input-box">
                                <span className="details">Gender</span>
                                <select required onChange={(e)=>{setGender(e.target.value )}} name="gender" defaultValue={updateProp.gender}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                            </div>

                            <div className="input-box">

                                <span className="details">Course</span>
                                <select required onChange={(e)=>{setCourse(e.target.value )}} name="course" defaultValue={updateProp.course_id} >
                                    <option value="">Select Course</option>
                                    {
                                        coursesFetched.map((item)=>(
                                            <option key={item.id} value={item.id}>{item.course_name}</option>
                                        ))
                                    }
                                </select>

                            </div>

                            <div className="input-box">

                                <span className="details">Class</span>
                                <select 
                                required 
                                onChange={(e)=>{setClasss(e.target.value )}} 
                                name="classs" 
                                defaultValue={updateProp.class_id}>
                                    <option value="">Select Class</option>
                                    {classesFetched.map((item)=>(
                                        <option key={item.id} value={item.id}>{item.full_identification}</option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className="input-box">
                                <span className="details">Transcript</span>
                                <input type="file" accept="pdf/*" required  />
                            </div> */}

                            <div className="input-box">
                                <div className="gender-details">
                                    <span className="details">Payment Status</span>
                                    <select required onChange={(e)=>{setPaymentStatus(e.target.value )}} name="paymentStatus" defaultValue={updateProp.paymentStatus}>
                                        <option value=""></option>
                                        <option value="half">Half_Paid</option>
                                        <option value="full">Full_Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>
                            </div>


                            <div className="input-box">
                                <span className="details">Date of Birth</span>
                                <input type="date" placeholder="" id="Date" name="dob" defaultValue={updateProp.dob} required onChange={(e)=>{setDob(e.target.value )}} />
                            </div>
                            {/* <div className="input-box">
                                <span className="details">Admission Date</span>
                                <input type="date" placeholder="" id="Date" name="addmitiondate" defaultValue={updateProp.createdAt} required onChange={(e)=>{setAddmitiondate(e.target.value )}} />
                            </div> */}

                            {/* <div className="input-box">
                                <span className="details">Registration Number</span>
                                <input type="text" placeholder="Registration Number" name="registno" defaultValue={updateProp.registno}  required maxlength="10" onChange={(e)=>{setRegistno(e.target.value )}} />

                            </div> */}


                            <button className="btn btn-info btn-block"
                                type="submit" onChange={handleSubmit}

                            >Update</button>

                        </div>
                    </form>
                    <button className="close-btn" onClick={ ()=>{setTrigger(false)}}> close </button>
        {props.children}
                </div>
                </div>
                </div>
            </div>

        </div>


       
    </div>
    
   ):"";
};