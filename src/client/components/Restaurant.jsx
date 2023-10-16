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
  import { createTheme, ThemeProvider } from '@mui/material/styles';  

  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemAvatar from '@mui/material/ListItemAvatar';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import Divider from '@mui/material/Divider';
  import ListItemText from '@mui/material/ListItemText';
  import Avatar from '@mui/material/Avatar';
  import Card from '@mui/material/Card';
  import CardActions from '@mui/material/CardActions';
  import CardContent from '@mui/material/CardContent';

  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';

  import RateReviewIcon from '@mui/icons-material/RateReview';
  import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
  import InputAdornment from '@mui/material/InputAdornment';
  import IosShareIcon from '@mui/icons-material/IosShare';
  import Rating from '@mui/material/Rating';
  import Button from '@mui/material/Button';
  import faker from 'faker';


  const tokenString = sessionStorage.getItem("authToken");
  const defaultTheme = createTheme();
  
  export default function Restaurant() {
    const [restaurant, setRestaurant] = useState([]);
    //const [review, setReview]=useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] =useState([]);
    const [comments, setComments]= useState("");
    const [comment, setComment]= useState("");
    const [reviewid, setReviewid]=useState("");
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
        //console.log('restaurant id:',data.id)
        setRestaurant(data)
       // console.log( 'Restaurant:', data)
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

    useEffect(() => {
      async function getAllUsers() {
        try {
          const response = await fetch('http://localhost:3000/api/users');
          if (response.ok) {
            const data = await response.json();
            //console.log('Users:', data.users); 
            setUsers(data.users); 
          } else {
            setError(response);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          setError(error.message);
        }
      }
    
      getAllUsers();
    }, []);
  
    //const Navigate= useNavigate();  
    //Navigate(`/restaurants/${restaurant.id}`)
    const { reviewId }= useParams();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        // Use fetch to post the comment with the reviewId.
        const response = await fetch(`/api/reviews/${reviewId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewId, 
            comments,
          }),
        });
  
        if (response.ok) {
          // Comment posted successfully, refresh the page or update comments.
          // Optionally, you can add logic to refresh comments.
        } else {
          // Handle errors when the comment posting fails.
          console.error('Error creating comment');
        }
      } catch (error) {
        console.error('Error creating comment', error);
      }
    };


    useEffect(()=>{   
      async function getAllComments(){
        try {
          const APIResponse = await fetch (`http://localhost:3000/api/reviews/${reviewId}/comments`)
          if(APIResponse){
            const data = await APIResponse.json();
            //console.log('comments:', data.comments.rows)
            setComments(data.comments.rows);
          }else{
            setError(error);
          }
        } catch (error) {
          console.log('error at end of get all comments:', error)
        }
      }
    getAllComments();
  },[])
  
  const commentsToDisplay = comments
  //console.log('comments to display:', comments)
    


  return (
  <div className="restaurant" key={restaurant.id}>
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
        <Rating name="read-only" value={4} readOnly style={{ marginLeft: '8px', fontSize: '28px' }} />
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
  <Card sx={{ maxWidth: '1000px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <CardContent sx={{border:'1.5px solid #7851A9', borderRadius: "10px", background: '#7851A9', marginTop: "20px", padding: "30px"}}>
  <Grid container spacing={2}></Grid>
    <Typography sx={{color: '#fff',fontSize: "22px", fontWeight: "bolder"}}></Typography>
    <Typography sx={{color:'#fff' ,fontSize: "18px"}}>{restaurant.content}</Typography>

  </CardContent>
  </Card>
  {/* End of restaurant discription */}


  {/* About Section */}

  <CardContent sx={{border:'1.5px solid #7851A9', borderRadius: "10px", background: '#7851A9', marginTop: "20px", padding: "30px"}}>
  <Grid container spacing={2}></Grid>
  <Typography sx={{color: '#fff',fontSize: "22px", fontWeight: "bolder"}}>About The Business</Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">

    </Typography>
    <Typography sx={{ mb: 1.5, color: '#fff', fontSize: '18px' }} color="text.secondary">
            wwww.restaurant.com
            <br />
            {restaurant.address}
            <br />
            {restaurant.number}
    </Typography>
    <Typography variant="body2"></Typography>
  </CardContent>

  {/* Start of restaurant reviews */}
  <Typography variant="h1" component="div" style={{ marginBottom: '20px', fontSize: '36px', textAlign: 'center' }}>
        Top Reviews
  </Typography>

{Array.isArray(reviews.reviews) &&
  Array.isArray(users) && reviews.reviews.filter((review) => {
      return review.restaurant_id === restaurant.id})
    .map((review) => {
      if (Array.isArray(users)) {
        const user = users.find((user) => user.id === review.author_id);
        console.log('reviews.id:',review.id)
      if (user) {
         // console.log("User ID:", user.id);
         // console.log("User Name:", user.name);
          return (
            <List key= {review.id} sx={ {width: '100%', maxWidth: 'auto', bgcolor: 'background.paper', display: 'flex' , flexDirection: 'column'}}>
            
            <ListItem sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
            <ListItemAvatar sx={{display:'flex', alignItems:'flex-end', padding:'5px'}}>
                <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                {user.username}
                <Rating name="read-only" value={5} readOnly style={{ display: 'flex', marginRight: '20px', fontSize: '24px' }} />
            </ListItemAvatar>
                      <ListItemText key={review.id} 
                      sx={{
                        background: 'rgba(120,81,169,.15)',
                        borderRadius:'10px',
                        padding: '20px', 
                        width: '100%' }}
                        
                        primary ={
                          <Typography>
                            {review.title}
                            <Divider ></Divider>
                           
                            <br />
                            {review.content}
                          </Typography>
                        }
                        secondary={
                        <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary"> 
                        <br />
                        </Typography>
                        }
                        />
                      
                 
                  {Array.isArray(comments) && commentsToDisplay
                  .filter((comment) => comment.reviewId === review.id)
                  .map((comment) => (
                  <CardContent key={comment.id}>
                  <ListItemAvatar>
                  <Avatar  src="/broken-image.jpg" />
                  </ListItemAvatar>
                  <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                  <br />
                  {comment.comment}
                 </Typography>
                 </CardContent>
                  ))}
                            
                        
               
            <div className='comment-form' >
              <CssBaseline />
               <Box>
                <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "rows", maxHeight:'auto'}}>
   
              <input type="hidden" name="reviewId" value={reviewId} />

              <TextField sx={{maxHeight:'auto', minHeight:'auto',marginRight: '10px',fontSize: '1rem', display:'flex', alignItems:"flex-start"}}
              fullWidth
              id="comment"
              label="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
              {/* <TextField sx={{maxHeight:'auto', minHeight:'auto',marginRight: '10px',fontSize: '1rem', display:'flex', alignItems:"flex-start"}}
              fullWidth
              id="comment"
              label="comment"
              value={reviewId}
              onChange={(e) => setReviewid(e.target.value)}/> */}

             <Button 
             type="submit"
             fullWidth
             variant="outlined"
             sx={{ display:'flex', flexDirection: 'row'}}
             >
              Post
             </Button>
           </Box>
           </Box>
           </div>
         
              </ListItem>    
  
            </List>    
  )}}
})
  }
          </div>   
      )       
    };
          

  