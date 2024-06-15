import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate,Outlet} from "react-router-dom";
import {toast} from 'react-toastify';
import {Navbar} from '../../components';


function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser){
    toast.info('Please login!');
    return <Navigate to="/login" />;
  } 
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}


export default RequireAuth;
