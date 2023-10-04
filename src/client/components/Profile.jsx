import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../API';
import { IoApertureSharp } from 'react-icons/io5';

export default function Profile() {

  const [reviews, setReviews] = useState([]);
  /* const [error, setError] = useState(''); */
  const [searchParams,setSearchParams]= useState('');
  const auth = sessionStorage.getItem('token');

 // why is 'isAuthor' not being read?
  
 const isAuthor = (review) => {
    const authUserId = sessionStorage.getItem('userId');
    return review.authorId === authUserId && !authUserId;
};

// getallreviews experience of logged in user - will be able to see "edit" and "delete" options for reviews they've written

useEffect (() => {
    async function getAllReviews() {
    const auth = sessionStorage.getItem('token');
    
    try {
        const response = await fetch ('http://localhost:3000/api/reviews', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
        });
        const result = await response.json();
        console.log(result.data.reviews);
        setReviews(result.data.reviews);
        return result
    } catch (error) {
        console.error(error);
    }
 }
 getAllReviews();
}, []);


// delete review by id function 
// need to update URL/api path 
async function deleteReview (id) {
  const auth = sessionStorage.getItem('token'); 

  try {
    const response = await fetch('http://localhost:3000/api/reviews', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorixation': `Bearer ${auth}`
      }
  });
  const resultDelete = await response.json();
  if (resultDelete) {window.location.reload()}
  alert("Review successfully deleted.");
} catch (error) {
  console.error(error);
}}; 

const reviewToDisplay= searchParams
? reviews.filter(reviews=>reviews.title.toLowerCase().includes(searchParams.toLowerCase()))
: reviews;
    return (
      <div className='profile'>
        <h1>Profile</h1>
        <h2>Reviews</h2>

      <div className='search-bar'>
        <label>
          Search:{''}
          <input type='text' placeholder='Search' onChange={(e)=> setSearchParams(e.target.value)}/>
        </label>

      </div>
    <ul>
      {reviewToDisplay.map((review) => (
        <div key={review.id}>
          <p>Title: {review.title}</p>
          <p>Content: {review.content}</p>
          <div>{review.isAuthor ? <button onClick={()=>deleteReview(review._id)}>Delete Review</button> : null}</div>
        </div>
      ))}
    </ul>
      </div>
    );
  }

