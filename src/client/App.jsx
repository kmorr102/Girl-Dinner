import React, { useEffect, useState } from 'react';
import { Routes, Route, Link,useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Reviews from './components/Reviews';
import CreateReviewForm from './components/CreateReviewForm'
import Logout from './components/Logout';

import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function App() {
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
};

  return (
    <div id="container">
      <div id="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/Register"}>Register</Link>
        <Link to={"/Reviews"}>Reviews</Link>
        <Link to={"/CreateReview"}> Write a Review</Link>
        <Link to={"/Profile"}>Profile</Link>
        <Link to={"/Login"}>Login</Link>
       
       {isLoggedIn ? (
        //<Link to={"/Logout"} onClick={handleLogout}> </Link>
       <button onClick={handleLogout} className='logout-button'>Logout</button>
        ) : (
          <Link to="/Login" className="Login">
            Logout
          </Link>
        )}
      
      </div>
      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login setToken={setToken} token={token}/>} />
          <Route path="/Register" element={<Register setToken={setToken} token={token} />} />
          <Route path="/Reviews" element={<Reviews token={token}/>}/>
          <Route path="/CreateReview" element={<CreateReviewForm />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );

        };
      
export default App;
