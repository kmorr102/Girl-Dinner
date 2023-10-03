import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../API';

export default function Profile() {

  const [reviews, setReviews] = useState([]);
  const [error, setError]=useState('');
  const [searchParams,setSearchParams]=useState('');
  // create review form variables
  const [authorId, setAuthorId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment_text, setCommentText] = useState('');
  const [message, setMessage] = useState('');

    // create form handleSubmits
    const handleAuthorIdChange = (e) => {
    setAuthorId(e.target.value);
  };
    const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleCommentChange = async (e) => {
    setCommentText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    makeNewReview();
  };

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

     // created an object with form data
    const formData = {
      authorId,
      title,
      content,
      comment_text
    };

    const makeNewReview = async() => {
        try {
          const response = await fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

      // middleware
      if (response.ok) {
        setMessage('Review created successfully');
        // Clear the form input fields
        setAuthorId('');
        setTitle('');
        setContent('');
        setCommentText('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

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
      {reviews && reviews.length > 0 ? (
  <ul>
    {reviewToDisplay.map((review) => (
      <div key={review.id}>
        <p>Title: {review.title}</p>
        <p>Content: {review.content}</p>
        <p>Comments: {review.comment_text}</p>
      </div>
    ))}
  </ul>
) : (
  <p>No reviews to display</p>
)}

 <div className="createReviewForm">
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit}>
        {/* need to swap this with authorization that automatically generates id */}
      <div>
          <label htmlFor="authorId">Author ID:</label>
          <input
            type="text"
            id="authorId"
            value={authorId}
            onChange={handleAuthorIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
              <label htmlFor="comment_text">Comments:</label>
              <textarea
                id="comment_text"
                value={comment_text}
                onChange={handleCommentChange}
              />
            </div>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
      </div>
    );
  }