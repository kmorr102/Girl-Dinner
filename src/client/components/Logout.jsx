import { useState,useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';

export default function Logout(){
  const[token,setToken]=useState(sessionStorage.getItem('authToken'));
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[username,setUsername]=useState('');
  console.log('token:',token)
  
  const navigate=useNavigate();
  

   useEffect(()=>{
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
   })
  
   const handleLogout = () => {
    // Log out logic here (e.g., clear tokens, user data, etc.)
    // You can replace the following lines with your actual logout implementation
    setIsLoggedIn(false);
    sessionStorage.removeItem('authToken');
  
    // Navigate to the logout component
    navigate('/Logout');
  
    // Add a timeout to navigate back to the home component after a delay
    setTimeout(() => {
      navigate('/');
    }, 1000); // Adjust the timeout duration as needed
  
  
  {isLoggedIn ? (
    //<Link to={"/Logout"} onClick={handleLogout}> </Link>
   <button onClick={handleLogout} className='logout-button'>Logout</button>
    ) : (
      <Link to="/Login" className="Login">
        Logout
      </Link>
    )}
    };

    setTimeout(()=>{
        navigate("/");
      }, 1000)
    
      return(
    
    <h1>You've been logged out</h1>

    )
}