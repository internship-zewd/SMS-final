import React from 'react';
import { useState } from 'react';
import './App.css';
import Sidebar from "../../layout/Sidebar/Sidebar"
import ContentTop from './Components/ContentTop/ContentTop';
import AddEm from './AddEm';


function AddEmDashboard() {
  const [sidebarClose, setSidebarClose] = useState(false);
  const handleClick= () => {
    setSidebarClose(!sidebarClose);
  }
  return (
       <div className="full_content">
        <section>
                              
          
             <Sidebar sidebarClose={sidebarClose}  click={handleClick}/>
             <section className="dashboard">
                <ContentTop click={handleClick}/>
                 <AddEm />
              </section>
             
        </section>
    </div>
    
  )
}

export default AddEmDashboard