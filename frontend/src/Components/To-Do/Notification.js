import React,{useState,useEffect } from 'react'
import { ViewPopup } from './ViewPopup'
import api from "../../resource/api"
export const Notification=(props)=>{
    
        const [notifs,setNotifs]=useState([])
        const [reminderinfo, setReminderinfo] = useState({});
        const [buttonPopup, setButtonPopup] = useState(false);
       const [notEmpty,setNotEmpty]=useState(false)
      


        const handleView=async(id)=>{

          return await api.get(`todo/getOne/${id}`)
          .then((res)=>{
             
              const viewData=res.data
              console.log(viewData)
              setReminderinfo(viewData)      
              setButtonPopup(true) })}


        const handleCompleteTask = async(id) => {
          const status=true
      
          await api.put(`todo/update/${id}`,{status})
          .then((res)=>{
            
            console.log(res)
            window.location.reload()
          
          })
          .catch((err)=>{if(err){console.log(err)}})
        }      






      const getNotification=async()=>{
        await api.get(`todo/getDue`)
        .then((res)=>{
          console.log(res.data)
          const todos=res.data
          if(todos.length>0){
            setNotifs(todos)
            setNotEmpty(true)

          }
          else{
            setNotEmpty(false)
          }
          
        })
        .catch((err)=>{
          if(err){console.log(err)}
        })
    }



    useEffect(()=>{
        getNotification()
      },[])

      
      


return(<div>
    <div>
        {notifs.map((notif)=>(
          <div className="task" key={notif.id}>
          <input
            type="radio"
            checked={notif.status}
            onChange={() => handleCompleteTask(notif.id)}
          />
          <span className="task-text" onClick={()=>{handleView(notif.id)}}>
            {notif.name}-----------due: {notif.date}
          </span>
          <ViewPopup trigger={buttonPopup} setTrigger={setButtonPopup} reminderProp={reminderinfo} />
        </div>
      
        ))}
       
       </div>
    {props.children}
</div>)
}