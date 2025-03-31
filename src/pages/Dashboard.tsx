import React from "react";
import {Link, Outlet} from 'react-router-dom'
export const Dashboard = () => {
  return (
    <div>

      <div style={{display:'flex',margin:'auto',marginLeft:'50vw'}} >
      <h1>Dashboard</h1>
    </div>

    <div style={{display:'flex', flexDirection:'row',height:'100vh',backgroundColor:'pink'}}>
      <div style={{width:'20%',height:'100vh',backgroundColor:'royalblue'}} >
        {/* //i want to display the two side links */}
        <ul>
          <li><Link to='/addStudent' >Add Studnet</Link></li>
          <li><Link to='/getStudents' >Studnet List</Link></li>
        </ul>
      </div>
      <div style={{width:'80%',height:'fit-content',backgroundColor:'brown'}} >
        <Outlet/>
      </div>
    </div>

    </div>
  )
}
