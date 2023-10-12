import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


export default function Profile({token, currentUser, setCurrentUser}) {
  const tokenString = sessionStorage.getItem("authToken");
  console.log('token from login(storage):', tokenString)

  const [reviews, setReviews] = useState([]);
  /* const [error, setError] = useState(''); */
  const [searchParams,setSearchParams]= useState('');
  const auth = sessionStorage.getItem('authToken');
  const [isOpen, setIsOpen] = useState(false);
  const [apiResult, setApiResult] = useState(null);


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
  console.log(authorId)
  try {
    const response = await fetch (`http://localhost:3000/api/reviews/${authorId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${tokenString}`
      }
    });
    const result = await response.json();
    setApiResult(result);
    console.log(result)
  } catch (error) {
    console.error(error);
  }
}
console.log(currentUser, "here")

const reviewToDisplay= searchParams
? reviews.filter(review=>review.title.toLowerCase().includes(searchParams.toLowerCase()))
: reviews;

return(
<div className="profile">

  <div className="profile-info">

        <img src={currentUser?.profilePicture} alt={currentUser?.name} />
        <h2>Welcome {currentUser?.name}</h2>
       
  </div>
      <Stack direction="column" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>Me</Avatar>
    </Stack>
      <div className="profile-navigation">
        <ul>
          <li>
            <button onClick={() => toggle(currentUser)}>View Reviews</button>
            <Link to="/Reviews"></Link>
          </li>
          <li>
            <Link to="/profile/edit">Edit Profile</Link>
          </li>
          {/* Add more profile actions here */}
        </ul>
      </div>
      {isOpen ? (
      <div>
        {apiResult && (<div>
          <h2>{apiResult.title}</h2>
          <p>{apiResult.content}</p>
        </div>
        )}
      </div>
    ) : null}

      
    </div>
  );
}


