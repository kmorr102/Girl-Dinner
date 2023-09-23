import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../API';

export default function Profile() {

  const [reviews, setReviews] = useState([]);
  const [error, setError]=useState('');
  const [searchParams,setSearchParams]=useState('');

  useEffect(() => {
    async function getAllReviews() {
        const response = await fetchAllReviews();
        if(response) {
          setReviews(response);
          console.log('Response:',response);
       } else {
        setError(response);
        console.log("Error Message:", error);
       }
    }
    getAllReviews();
  }, []);
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
        </div>
      ))}
    </ul>
      </div>
    );
  }