import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../API';

export default function Reviews({token,name}){
    const auth = sessionStorage.getItem("authToken");


    const [reviews, setReviews]= useState('');
    const [error, setError]= useState(null);
    const [searchParams, setSearchParams]= useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
  // getallreviews experience of logged in user - will be able to see "edit" and "delete" options for reviews they've written
  
  useEffect (() => {
      async function getAllReviews() {
          const response = await fetchAllReviews('http://localhost:3000/api/reviews'); 
          if(response) {
            console.log("response:",response)
            setReviews(response);
          }else{
            setError(response);
          }
      }
      getAllReviews();
    }, []);
        
    // why is 'isAuthor' not being read?
    
    const isAuthor = (review) => {
        return review.authorId === authUserId && !authUserId;
    };
  
  // delete review by id function 
  // need to update URL/api path 
  async function deleteReview (id) {
  
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
          <h2>Reviews</h2>
  
        <div className='search-bar'>
          <label>
            Search:{''}
            <input type='text' placeholder='Search' onChange={(e)=> setSearchParams(e.target.value)}/>
          </label>
  
        </div>
      <ul>
        {reviews && reviewToDisplay.map((review) => (
          <div key={review.id}>
            <p>Title: {review.title}</p>
            <p>Content: {review.content}</p>
  
            <div>{review.isAuthor ? <button onClick={()=>deleteReview(review._id)}>Delete Review</button> : null}</div>
  
            <p>Comments:{review.comment_text}</p>
  
          </div>
        ))}
      </ul>
        </div>
      );
    }
    