import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

export default function Profile({token, currentUser, setCurrentUser}) {
  const tokenString = sessionStorage.getItem("authToken");
  // console.log(tokenString)

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

let reviewId= window.location.href.split("/").pop()
//console.log('id:', window.location.href.split("/").pop())



// delete review by id function 
async function deleteReview (reviewId) {
  

  try {
    const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${tokenString}`
      }
  });
  const resultDelete = await response.json();
  // if (resultDelete) {window.location.reload()}
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

async function toggle() {
  setIsOpen((isOpen) => !isOpen);

  try {
    const response = await fetch ('http://localhost:3000/api/reviews', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${tokenString}`
      }
    });
    const result = await response.json();
    console.log("show me the result ", result);

//filter by authorId
if (Array.isArray(result.reviews)) {
    const filteredResults = result.reviews.filter(reviews => reviews.author_id === currentUser.userId)
    setApiResult(filteredResults);
    console.log(filteredResults, "this is the result",)

  //map through filteredResults
  } else {
    console.log("result is not an array")
  }
  } catch (error) {
    console.error(error);
  }
}
console.log(currentUser.userId, currentUser.name)

return(
<div className="profile">
<Box
        sx={{
          width: '100vw',
          height: '20vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1592488238515-6fe7e4469d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80"
          alt="Profile Header Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Typography
          variant="h3"
          component="div"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontFamily: 'DM Serif Display',
            fontSize: '30px',
            letterSpacing: '10px',
          }}
        >
          Welcome, {currentUser.name}
        </Typography>
      </Box>

    <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px', padding: '30px' }}>

      <Avatar sx={{ bgcolor: '#8d6ab8', margin: '20px' }}></Avatar>

      <div className="profile-navigation">
            <button className='my-profile-btn' onClick={() => toggle(currentUser)}>My Reviews</button>
            {/* <Link to="/profile/edit">Edit Profile</Link> */}
      </div>
      {isOpen && (
      <div>
        {apiResult && apiResult.length > 0 ? (
          apiResult.map((review) => (
            <div key={review.id} className='myReviews'>
              
              <ListItemText
                sx={{
                  background: 'rgba(120,81,169,.15)',
                  borderRadius: '10px',
                  padding: '30px',
                  width: '100%'
                }}
                primary={<Typography>
                  {review.title}
                  <Divider ></Divider>
                  <br />
                </Typography>
                } 
                secondary={
                  <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                    
                    {review.content}
                  </Typography>
                }
                />

              <button className='my-profile-btn' onClick={() => editReview(review)}>Edit Review</button>
              <button className='my-profile-btn' onClick={() => deleteReview(review.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No reviews found for author_id 1</p>
        )}
      </div>
    )}
    </div>
    </div>
  );
}