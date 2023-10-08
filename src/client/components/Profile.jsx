import React, { useState, useEffect } from 'react';
//import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

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
      <div className="profile-info">
        <img src={user.profilePicture} alt={user.name} />
        <h2>{user.name}</h2>
        <p></p>
      </div>

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

      {/* Render the appropriate profile section based on the route */}
      {/* Use React Router to handle route rendering */}
      {/* For example, /profile/reviews and /profile/edit */}
    </div>
  );
}


