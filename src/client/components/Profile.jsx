import React, { useState, useEffect } from 'react';

export default function Profile() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Error with network response');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, []);

    return (
      <div className='profile'>
        <h1>Profile</h1>
        <h2>Reviews</h2>
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p>Title: {review.title}</p>
          <p>Content: {review.content}</p>
        </li>
      ))}
    </ul>
      </div>
    );
  }