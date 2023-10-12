import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllRestaurants } from "../API";
import { fetchAllReviews } from "../API";
//import { getRestaurantById } from "../../server/db/restaurants";


import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';



const tokenString = sessionStorage.getItem("authToken");

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const [review, setReview]=useState([]);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);
  const [number, setNumber] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthor, setIsAuthor] = useState("");

 

  const { restaurantid }= useParams();

  useEffect(()=>{
  async function getRestaurantById(){
    const response= await fetch(`http://localhost:3000/api/restaurants/${restaurantid}`);
    if(response){
      const data= await response.json();
      console.log('id:',data.id)
      setRestaurant(data)
      console.log( 'data:', data)
    }else{
      setError(response)
      console.log('error:', error)
    }
  }

getRestaurantById();
}, [restaurantid])

useEffect(() => {
  // Fetch reviews for the restaurant by its ID
  fetch(`/api/reviews?restaurantId=${restaurant.id}`)
    .then((response) => response.json())
    .then((data) => {
      setReviews(data);
    })
    .catch((error) => console.error('Error fetching reviews:', error));
}, [restaurant]);

  useEffect (() => {
    async function getAllReviews() {
        const response = await fetchAllReviews('http://localhost:3000/api/reviews'); 
        if(response) {
          console.log("response:",response)
          setReview(response);
        }else{
          setError(response);
        }
    }
    getAllReviews();
  }, []);



  let reviewId= window.location.href.split("/").pop()
  
  
  useEffect(() => {
    async function getReviewById() {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`);
        console.log('API Response:', response); // Log the full response
  
        if (!response.ok) {
          //throw new Error(`API response not OK: ${response.status} ${response.statusText}`);
      }
  
        const data = await response.json();
        console.log('Review data:', data);
        setReview(data);
      } catch (error) {
        console.error('Error occurred:', error);
        setError(error.message);
      }
    }
  
    getReviewById();
  }, [])


  function MainFeaturedRestaurant(props) {
    const { restaurant } = props;
  

  }
  return (
<div className="restaurant">
    <Paper
    sx={{
      position: 'relative',
      backgroundColor: 'grey.800',
      color: 'white',
      mb: 4,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(${restaurant.img})`,
    }}
    >

    {/* Increase the priority of the hero background image */}
    {<img style={{ display: 'none' }} src={restaurant.img} alt={restaurant.name} />} 
  <Box
  sx={{
    width: '100%', 
    height: '100%',
    objectFit: 'cover' ,
    position: 'absolute',
    top: 0,
    bottom:0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  }}
/>
  
<Grid container>
  <Grid item md={6}>
    <Box
      sx={{
        position: 'relative',
        p: { xs: 3, md: 6},
        pr: { md: 0 },
      }}
    >
      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
        {restaurant.name}
      </Typography>
      <Rating name="read-only" value={4} readOnly style={{ marginLeft: '8px', fontSize: '24px' }} />

    </Box>
  </Grid>
</Grid>
<Button
     sx={{
     maxWidth: '100%',
     maxHeight: '100%',
     width: 'auto',
     height: 'auto',
     objectFit: 'cover',
     color: 'white',
     background:'red',
     border: '1.5px solid dark red',
     borderRadius: '4px'
      }}
     variant = "text"
     component={Link} to={'/CreateReview'}>
      Write a Review
</Button>
</Paper>

 {restaurant && (
       <div key={restaurant.id} className="displayedRestaurant">
               <h3>{restaurant.content}</h3>
               <p>{restaurant.address}</p>
               <p>{restaurant.number}</p>
            {/* {review ?.map((review)=>(
          <div key={review.restaurantid}>
         <p>Top Reviews: {review.title}</p>
           <p>{review.content}</p>
           <p>Comments:{review.comment_text}</p>
           </div>
         ))}   */}
          <div key={review.id}>
         <p>{review.title}</p>
         <p>{review.content}</p>
          
           </div>
    </div>  
     )}

  </div>   
   ) };
  