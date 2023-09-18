import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {

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
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
