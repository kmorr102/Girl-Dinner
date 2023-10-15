import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../API';
// import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa' 
import { Link , useParams} from 'react-router-dom';
import Divider from '@mui/material/Divider';


export default function Reviews({token}){
    const tokenString = sessionStorage.getItem("authToken");
    //console.log('token from login(storage):', tokenString)
    

    const [reviews, setReviews]= useState('');
    const [review, setReview] = useState('');
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
        
    const { reviewId }= useParams();

    useEffect(() => {
      async function getReviewById() {
        try {
          const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`);
          console.log('API Response:', response); // Log the full response
    
          //if (!response.ok) {
            //throw new Error(`API response not OK: ${response.status} ${response.statusText}`);
          //}
    
          const data = await response.json();
          console.log('Review data:', data.reviewid.id);
          setReview(data);
        } catch (error) {
          console.error('Error occurred:', error);
          setError(error.message);
        }
      }
    
      getReviewById();
    }, []);
    // why is 'isAuthor' not being read?
    
   /* isAuthor = (review) => {
        return review.authorId === authUserId && !authUserId;
    };*/
  
   
  
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
      /* else {
    alert("Permission denied. You are not authorized to delete this review."); */
   } catch (error) {
    console.error(error);
}} 

const reviewBoxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  margin: '20px',
  boxShadow: '0 8px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#e8e1f1',
  fontFamily: 'Merriweather'
};

  const reviewToDisplay= searchParams
  ? reviews.filter(reviews=>reviews.title.toLowerCase().includes(searchParams.toLowerCase()))
  : reviews;
  
      return (
      <div className='Reviews'>
  
        <div className='search-bar'  style={{ margin: '20px'}}>
          <label>
            <input type='text' style={{ width: '100%' }} placeholder='Search Reviews' onChange={(e)=> setSearchParams(e.target.value)}/>
          </label>
         </div>
  
      
        {reviews && reviewToDisplay.map((review) => (
          <div key={review.id} className='displayedReviews' style={reviewBoxStyle}>
            <h3 style={{fontFamily: 'DM Serif Display', fontSize: '22px'}}>{review.title}</h3>
            <Divider sx={{borderWidth: '1px', borderColor:'black'}}/>
            <h4>{review.content}</h4>
            <p>Comments: {review.comment_text}</p>

            <div className = "Star" style={{ marginBottom: '10px' }}>
            {/* <p> Rating: {rating} </p> */}
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                  <label>
                    <input 
                    type="radio" 
                    name="rating" 
                    value={review?.currentRating}
                    />
                    <FaStar 
                    size={30}
                    color={ "#f0d32e"}
                    />
                  </label>
                )
              })}
            </div>

            <button className="review-btn">
                  Comment
            </button>{" "}
            <button className="review-btn" onClick={() => deleteReview(review._id, /*userId*/)}>
                  Delete
            </button>
           </div>
        ))}
     
        </div>
      );
    }
    