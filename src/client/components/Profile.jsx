import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';



import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


export default function Profile() {

  const [reviews, setReviews] = useState([]);
  /* const [error, setError] = useState(''); */
  const [searchParams,setSearchParams]= useState('');
  const [user, setUser]=useState('')
  const auth = sessionStorage.getItem('authToken');

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
        'Authorixation': `Bearer ${tokenString}`
      }
  });
  const resultDelete = await response.json();
  if (resultDelete) {window.location.reload()}
  alert("Review successfully deleted.");
} catch (error) {
  console.error(error);
}}; 

//editReview

return(
<div className="profile">
<div id="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/CreateReview"}>Write a Review</Link>
      <Link to={"/Reviews"}>Reviews</Link>
      <Link to={"/Logout"}>Logout</Link>
      
     
    </div>
      <div className="profile-info">
        <img src={user.profilePicture} alt={user.name} />
        <h2>Welcome {user.name}</h2>
       
      </div>
      <Stack direction="column" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
      <Avatar></Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>Me</Avatar>
    </Stack>
      <div className="profile-navigation">
        <ul>
          <li>
            <Link to="/profile/reviews">View Reviews</Link>
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


