import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
//import Authenticate from './components/Authenticate';
import Reviews from './components/Reviews';
import authenticateUser from './API';

function App() {
const[token,setToken]=useState(sessionStorage.getItem('authToken'));
const[isLoggedIn,setIsLoggedIn]=useState(false);
const[name,setName]=useState('');
const[email,setEmail]= useState('');




useEffect(() => {
  if (token) {
    try {
      authenticateUser(token)
        .then((user) => {
          if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsLoggedIn(true);
          } else {
            // Handle the case where authenticateUser didn't return user data
            setIsLoggedIn(false);
            console.error('Authentication failed: User data not available');
          }
        })
        .catch((error) => {
          // Handle authentication error, e.g., invalid token or missing user
          console.error('Authentication failed:', error);
          setIsLoggedIn(false);
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}, [token]);

    


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
    )



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
          <Route path="/Register" element={<Register setToken={setToken} token={token}/>} />
          <Route path="/Reviews" element={<Reviews />}/>
        </Routes>
      </div>
    </div>
  );

        };
      };
export default App;
