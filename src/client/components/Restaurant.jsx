import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllRestaurants } from "../API";
import { fetchAllReviews } from "../API";
//import { getRestaurantById } from "../../server/db/restaurants";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';  

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import RateReviewIcon from '@mui/icons-material/RateReview';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InputAdornment from '@mui/material/InputAdornment';
import IosShareIcon from '@mui/icons-material/IosShare';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';



const tokenString = sessionStorage.getItem("authToken");

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  //const [review, setReview]=useState([]);
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
      console.log('restaurant id:',data.id)
      setRestaurant(data)
      console.log( 'Restaurant:', data)
    }else{
      setError(response)
      console.log('error:', error)
    }
  }

getRestaurantById();
}, [restaurantid])

useEffect(() => {
  // Fetch reviews for the restaurant by its restaurant_id
  fetch(`/api/reviews?restaurant_id=${reviews.restaurant_id}`)
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
          //console.log("All reviews:",response)
          setReviews(response);
        }else{
          setError(response);
        }
    }
    getAllReviews();
  }, []);



  //  let reviewId= window.location.href.split("/").pop()
  
  
  //  useEffect(() => {
  //    async function getReviewById() {
  //      try {
  //        const response = await fetch(`http://localhost:3000/api/reviews/${restaurantId}`);
       
  
  //        if (!response.ok) {
  //          throw new Error(`API response not OK: ${response.status} ${response.statusText}`);
  //      }
  
  //        const data = await response.json();
  //       console.log('ReviewbyId:', data);
  //       setReview(data);
  //      } catch (error) {
  //        console.error('Error occurred:', error);
  //        setError(error.message);
  //      }
  //    }
  
  //    getReviewById();
  //  }, [])

  
  
  
 function SimpleContainer() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        </Container>
      </React.Fragment>
    );
  }
  


 
  
  return (
<div className="restaurant">
<CssBaseline />
{/* {Restaurnt Image Header Start} */}
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
    />
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
</Paper>
{/* {Restaurnt Image Header End} */}

{/* Button Nav Bar */}
<Button
     sx={{
     maxWidth: '100%',
     maxHeight: '100%',
     marginRight: '14px',
     width: 'auto',
     height: 'auto',
     objectFit: 'cover',
     color: '#7851A9',
     background:' #fff',
     border: '1.5px solid #7851A9',
     borderRadius: '4px'
      }}
     variant = "text"
     component={Link} to={'/CreateReview'}>
  <RateReviewIcon sx={{marginRight: "4px"}}></RateReviewIcon>
     Write a Review
</Button>
<Button
     sx={{
     maxWidth: '100%',
     maxHeight: '100%',
     marginRight: '14px',
     width: 'auto',
     height: 'auto',
     objectFit: 'cover',
     color: '#7851A9',
     background:' #fff',
     border: '1.5px solid #7851A9',
     borderRadius: '4px'
      }}
     variant = "text"
     component={Link} to={'/CreateReview'}>
  <PhotoCameraIcon sx={{marginRight: "3px"}}></PhotoCameraIcon>
      Add Photo
</Button>
<Button
     sx={{
     maxWidth: '100%',
     maxHeight: '100%',
     marginRight: '14px',
     width: 'auto',
     height: 'auto',
     objectFit: 'cover',
     color: '#7851A9',
     background:' #fff',
     border: '1.5px solid #7851A9',
     borderRadius: '4px'
      }}
     variant = "text"
     component={Link} to={'/CreateReview'}>
  <IosShareIcon sx={{marginRight: "3px"}}></IosShareIcon>
     Share
</Button>
{/* end of button Nav Bar */}

{/* Start of restaurant discription */}
<CardContent sx={{border:'1.5px solid #7851A9', borderRadius: "10px", background: '#7851A9', marginTop: "20px", padding: "30px"}}>
<Grid container spacing={2}></Grid>
  <Typography sx={{color: '#fff',fontSize: "22px", fontWeight: "bolder"}}>About The Business</Typography>
  <Typography sx={{color:'#fff' ,fontSize: "18px"}}>{restaurant.content}</Typography>
</CardContent>
{/* End of restaurant discription */}



{/* {restaurant && (
  <div key={restaurant.id} className="displayedRestaurant">
     <p>{restaurant.address}</p>
     <p>{restaurant.number}</p>
} */}

{/* Start of restaurant reviews */}
<Typography variant="h1" component="div" style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '36px', textAlign: 'center' }}>
      Top Reviews
    </Typography>

{Array.isArray(reviews.reviews) &&
          reviews.reviews
          .filter((review) => review.restaurant_id === restaurant.id)
          .map((review) => (
<List sx={ {width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

  <ListItem alignItems="flex-start">
  <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
  </ListItemAvatar>
            <ListItemText 
              primary={review.title}
              secondary={
              <Typography sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary">{review.content}</Typography> 
              }
            />

    </ListItem>
            
  </List>
))}
{/* end of reviews */}
</div>   
   ) };
  