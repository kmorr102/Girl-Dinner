import { useState,useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Logout(){
  const[token,setToken]=useState(sessionStorage.getItem('authToken'));
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[username,setUsername]=useState('');
  console.log('token:',token);
  
  const navigate=useNavigate();
  

   useEffect(()=>{
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
   }, []);

    // Add a timeout to navigate back to the home component after a delay
    setTimeout(() => {
      navigate('/');
    }, 1000); // timeout duration before navigation
  
   const handleLogout = () => {
    // Log out logic here (e.g., clear tokens, user data, etc.)
    // You can replace the following lines with your actual logout implementation
    setIsLoggedIn(false);
    sessionStorage.removeItem('authToken');
  
  };
  
  const logoutContainer = {
    height: "90vh", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const alertStyle = {
    width: "100%",  
    margin: "0 auto",  
    fontSize: "20px"
  };

return (
  <div style={logoutContainer}>
    <Alert style={alertStyle} severity="success">You have successfully logged out!</Alert>
    </div>
    );
}