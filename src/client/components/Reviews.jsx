import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../API';

export default function Reviews({token}){
    const tokenString = sessionStorage.getItem("authToken");
    console.log('token from login(storage):', tokenString)
    

    const [reviews, setReviews]= useState('');
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [error, setError]= useState(null);
    const [searchParams, setSearchParams]= useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAuthor, setIsAuthor]= useState('')
  
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
    
   /* isAuthor = (review) => {
        return review.authorId === authUserId && !authUserId;
    };*/
  async function handleSubmit(e){
    e.preventDefault();

    if(!tokenString) {
      setError("You must have an account to make a post. Login or create an account to add review.")
      console.log('error message if no token')
      return;
    }
  
    try {
      //console.log('at the start of try block')
      const response= await fetch('http://localhost:3000/api/reviews',
      {
        method: 'POST',
        headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tokenString}`
                },
        body: JSON.stringify({
                  title,
                  content
      })
    });
      const result = await response.json();
      console.log('result:', result)
      return result;
    } catch (error) {
      console.error('error creating post')
      return{success: false, error: error.message};
      
    }
  }
   
    
  
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
         <div className='createReview'>
          <form onSubmit={handleSubmit}>
            <label> Title 
              <input type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Review:
              <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              />
            </label>
            <br />
            <button>Submit Review</button>
          </form>
         </div>
         
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
    