import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Authenticate from './components/Authenticate';

function App() {
const[token,setToken]=useState();
const[isLoggedIn,setIsLoggedIn]=useState(false);
const[name,setName]=useState('');

useEffect(()=> {
  if(token) {
    Authenticate(token,setName)
    .then(data => {
      if(data && data.name) {
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    }).catch(error =>{
      setIsLoggedIn(false);
      console.error("Failed to autenticate user:", error)
    })
  }

})
  return (
    <div id="container">
      <div id="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/Profile"}>Profile</Link>
        <Link to={"/Login"}>Login</Link>
        <Link to={"/Register"}>Register</Link>
      </div>
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register setToken={setToken}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
