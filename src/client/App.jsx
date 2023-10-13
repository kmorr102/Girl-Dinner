import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Reviews from './components/Reviews';
import CreateReviewForm from './components/CreateReviewForm'
import Logout from './components/Logout';
import Restaurant from './components/Restaurant';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AccountCircleIcon
        className="account-icon"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ cursor: 'pointer', fontSize: '2.5rem', color: '#7851A9' }} 
      >
      </AccountCircleIcon>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/Profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/Logout" onClick={handleClose}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

function App() {
const[token,setToken]=useState(sessionStorage.getItem('authToken'));
const[isLoggedIn,setIsLoggedIn]=useState(false);
const [currentUser, setCurrentUser] = useState(null);
//const[username,setUsername]=useState('');
//console.log('token:',token)

const location = useLocation();

 useEffect(()=>{
  if(token){
    setIsLoggedIn(true);
  }else{
    setIsLoggedIn(false);
  }
 })
//console.log(currentUser)

  return (
    
    <div id="container">
    <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/Reviews">Reviews</Link>
          <Link to="/CreateReview">Create Review</Link>
          <AccountMenu />
          {location.pathname !== '/Login' && (
          <Link to="/Login" className="navbar-button">Log in</Link>
          )}
          {location.pathname !== '/Register' && (
          <Link to="/Register" className="navbar-button">Sign Up</Link>
          )}
          {/* {location.pathname !== '/Logout' && (
        <Link to="/Logout" className="navbar-button">Log Out</Link>
          )} */}
    </div>
      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/Login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} token={token}/>} />
          <Route path="/Register" element={<Register setToken={setToken} token={token} />} />
          <Route path="/Reviews" element={<Reviews token={token}/>}/>
          <Route path="/CreateReview" element={<CreateReviewForm />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Restaurants/:restaurantid" element={<Restaurant />} />
        </Routes>
      </div> 
      </div>
  );

        };
      
export default App;
