import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';



import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


export default function Profile({token}) {
  const tokenString = sessionStorage.getItem("authToken");
  console.log('token from login(storage):', tokenString)

  const [reviews, setReviews] = useState([]);
  /* const [error, setError] = useState(''); */
  const [searchParams,setSearchParams]= useState('');
  const [currentUser, setCurrentUser]=useState('')
  const auth = sessionStorage.getItem('authToken');
  const [isOpen, setIsOpen] = useState(false);

 // why is 'isAuthor' not being read?
  
 const isAuthor = (review) => {
    return review.authorId === authUserId && !authUserId;
};


// delete review by id function 
async function deleteReview (reviewId) {
  
  try {
    const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenString}`
      }
  });
  const resultDelete = await response.json();
  if (resultDelete) {window.location.reload()}
  alert("Review successfully deleted.");
} catch (error) {
  console.error(error);
}}; 

//editReview

async function editReview (reviewId) {
  
  try {
    const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenString}`
      }
  });
  const resultPatch = await response.json();
  if (resultPatch) {window.location.reload()}
  alert("Review successfully edited");
} catch (error) {
  console.error(error);
}}; 

//show and hide the user's reviews

async function toggle(authorId) {
  setIsOpen((isOpen) => !isOpen);
  try {
    const response = await fetch (`http://localhost:3000/api/reviews/${authorId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${tokenString}`
      }
    });
    const result = await response.json();
    console.log(result)
  } catch (error) {
    console.error(error);
  }
}

return(
<div className="profile">


  <div id="navbar">

      <Link to={"/"}>Home</Link>
      <Link to={"/CreateReview"}>Write a Review</Link>
      <Link to={"/Reviews"}>Reviews</Link>
      <Link to={"/Logout"}>Logout</Link>
  </div>
  <div className="profile-info">

        <img src={currentUser.profilePicture} alt={currentUser.name} />
        <h2>Welcome {currentUser.name}</h2>
       
  </div>
      <Stack direction="column" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>Me</Avatar>
    </Stack>
      <div className="profile-navigation">
        <ul>
          <li>
            <button onClick={toggle}>View Reviews</button>
          </li>
          <li>
            <Link to="/profile/edit">Edit Profile</Link>
          </li>
          {/* Add more profile actions here */}
        </ul>
      </div>


      
    </div>
  );
}


