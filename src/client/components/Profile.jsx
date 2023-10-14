import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


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

  <div className="profile-info">

        <h2>Welcome {currentUser.name}</h2>
       
  </div>
      <Stack direction="column" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>Me</Avatar>
    </Stack>
      <div className="profile-navigation">
        <ul>
          <li>
            <button onClick={() => toggle(currentUser)}>View Reviews</button>
          </li>
          <li>
            <Link to="/profile/edit">Edit Profile</Link>
          </li>
          {/* Add more profile actions here */}
        </ul>
      </div>
      {isOpen && (
      <div>
        {apiResult && apiResult.length > 0 ? (
          apiResult.map((review) => (
            <div key={review.id}>
              <h2>{review.title}</h2>
              <p>{review.content}</p>
              <button onClick={() => editReview(review)}>Edit Review</button>
              <button onClick={() => deleteReview(review)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No reviews found for author_id 1</p>
        )}
      </div>
    )}

    </div>
  );
}


