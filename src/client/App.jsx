import React, { useEffect, useState } from 'react';
import { Routes, Route, Link,useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Reviews from './components/Reviews';
import CreateReviewForm from './components/CreateReviewForm'
import Logout from './components/Logout';
import Restaurant from './components/Restaurant';
import RestaurantDetails from './components/restaurantDetails';
import RestaurantById from './components/Restaurant';

import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



function App() {
const[token,setToken]=useState(sessionStorage.getItem('authToken'));
const[isLoggedIn,setIsLoggedIn]=useState(false);
//const[username,setUsername]=useState('');
//console.log('token:',token)






 useEffect(()=>{
  if(token){
    setIsLoggedIn(true);
  }else{
    setIsLoggedIn(false);
  }
 })

 



  return (
    

      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login setToken={setToken} token={token}/>} />
          <Route path="/Register" element={<Register setToken={setToken} token={token} />} />
          <Route path="/Reviews" element={<Reviews token={token}/>}/>
          <Route path="/CreateReview" element={<CreateReviewForm />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Restaurants/:restaurantid" element={<Restaurant />} />
        </Routes>
      </div> 
  );

        };
      
export default App;
