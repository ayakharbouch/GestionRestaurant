import React from 'react';
import {Outlet} from "react-router-dom";
import Dashboard from './Dashboard';


function AdminDashboard() {
    return (
      
        <div >
            <div className=''>
                <Dashboard />
            </div>
            <div className='container-fluid justify-content-center my-2' >
                <Outlet />
            </div>
        </div>
      
    );
  }
export default AdminDashboard;