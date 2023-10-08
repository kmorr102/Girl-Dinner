import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Reviews from './components/Reviews';


function App() {
const[token,setToken]=useState(sessionStorage.getItem('authToken'));
const[isLoggedIn,setIsLoggedIn]=useState(false);
const[username,setUsername]=useState('');
console.log('token:',token)



 useEffect(()=>{
  if(token){
    setIsLoggedIn(true);
  }else{
    setIsLoggedIn(false);
  }
 })


  return (
    <div id="container">
      <div id="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/Profile"}>Profile</Link>
        <Link to={"/Register"}>Register</Link>
        <Link to={"Reviews"}>Reviews</Link>

       
       {isLoggedIn ? (
        <button onClick={() => {
            setToken(null);
            console.log(setToken)
            sessionStorage.removeItem('authToken');
            // added page refresh
            window.location.reload();
          }}>Logout</button>
        ) : (
          <Link to={"/Login"} className='login'>Login</Link>
        )}
      
      </div>
      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login setToken={setToken} token={token}/>} />
          <Route path="/Register" element={<Register setToken={setToken} token={token} />} />
          <Route path="/Reviews" element={<Reviews token={token}/>}/>
        </Routes>
      </div>
    </div>
  );

        };
      
export default App;
