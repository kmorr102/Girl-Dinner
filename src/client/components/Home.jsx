import { useParams,Link,useNavigate } from "react-router-dom";

// Importing MUI components
import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info'; 
import { Card, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const Navigate= useNavigate();

  useEffect(() => {
    fetch('/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.restaurants);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDetailsClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRestaurant(null);
  };

 

  return (


   <div className='home'>

        <div id="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/Reviews"}>Reviews</Link>
      <Link to={"/CreateReview"}>Write a Review</Link>
      <Link to={"/Profile"}>Profile</Link>

      <Link to={"/Login"}>Login</Link>

      
      {/* Add the search button */}
      <IconButton>
          <SearchIcon />
      </IconButton>
      <Button onClick={() => Navigate("/Register")}variant="outlined" size="small" >
        Sign up
     </Button>
    </div>


   
   

      <ImageList sx={{ width: '100%', height: '100vh' }} rowHeight={290}>
        <ImageListItem key="Subheader" cols={3}>
          <Typography variant="h1" component="div" style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '36px', textAlign: 'center' }}>
            Girl Dinner
          </Typography>
        </ImageListItem>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          restaurants.map((restaurant) => (
            <ImageListItem key={restaurant.id}>
             <img
                src={restaurant.img}
                alt={restaurant.name}
                loading="lazy"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%', 
                  width: 'auto', 
                  height: 'auto', 
                  objectFit: 'cover',
                }}
              />
             
              <ImageListItemBar key={restaurant.id}
              
              title={
                // Wrap only the title in a Link component (/reviews/${restaurant.id}) eventually
                <Link to={"/reviews"} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {restaurant.name}
                </Link>
              }
              subtitle={
                  <div>
                    {restaurant.address}
                    <Rating name="read-only" value={4} readOnly style={{ marginLeft: '8px', fontSize: '24px' }} />
                  </div>
                }
                actionIcon={
                  <div>
                    <IconButton
                      sx={{
                        maxWidth: '100%',
                      maxHeight: '100%', 
                      width: 'auto', 
                      height: 'auto', 
                      objectFit: 'cover',
                      color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={() => handleDetailsClick(restaurant)}
                    >
                      <InfoIcon /> 
                    </IconButton>
                  </div>
                }
              />
      
          
            </ImageListItem>
          ))
        )}
      </ImageList>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        {selectedRestaurant && (
          <>
            <DialogTitle>{selectedRestaurant.name}</DialogTitle>
            <DialogContent>
            <Typography>{selectedRestaurant.content}</Typography>
              <Typography>Address: {selectedRestaurant.address}</Typography>
              <Typography>Phone: {selectedRestaurant.number}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
