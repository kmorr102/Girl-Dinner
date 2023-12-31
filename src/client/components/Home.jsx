import { useParams,Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);


  const Navigate= useNavigate();

  useEffect(() => {
    fetch('/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.restaurants);
        setFilteredRestaurants(data.restaurants);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDetailsClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setDialogOpen(true);
  };

  // search bar 
  const filterRestaurants = () => {
    if (!searchQuery) {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredRestaurants(filtered);
    }
  };
  

  return (
   <div className='home'>

<Box
    sx={{
      width: '100vw',
      height: '40vh', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      objectFit: 'cover'
    }}
  >
    <img
      src="https://images.unsplash.com/photo-1567496295302-b8dbcd2913b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80"
      alt="Header Image"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <Typography variant="h3" component="div" sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontFamily: 'DM Serif Display',
      fontSize: '70px',
      letterSpacing: '10px'
    }}>
      Girl Dinner
    </Typography>

    <TextField
    variant="outlined"
    color="secondary"
    sx={{
      position: 'absolute',
      top: '70%', 
      left: '50%',
      transform: 'translateX(-50%)',
      width: '400px', 
      borderRadius: '10px',
      backgroundColor: 'white',
    }}
    // search bar for restaurants
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            setSearchQuery(query);
            const filtered = restaurants.filter((restaurant) => {
              return restaurant.name.toLowerCase().includes(query);
            });
            setFilteredRestaurants(filtered); 
          }}

    placeholder="Search Restaurants"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
  </Box>

      <Typography variant="h1" component="div" style={{ margin: '20px', fontWeight: 'bold', fontSize: '36px', textAlign: 'center', fontFamily: 'Merriweather' }}>
        Restaurants
      </Typography>

      <div style={{display: 'flex', justifyContent: 'center'}}>
      <ImageList sx={{ width: '80%', height: '100vh' }} rowHeight={290} cols={3}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
            filteredRestaurants.map((restaurant) => (
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
              title={restaurant.name}
              subtitle={
                  <div>
                    {restaurant.address}
                    <Rating name="read-only" value={4} readOnly style={{ marginLeft: '8px', fontSize: '24px' }} />
                  </div>
                }
                actionIcon={
                  <div>
                    <Button
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'cover',
                        color: 'white',
                        border: '1.5px solid #fff',
                        borderRadius: '4px'
                      }}
                      variant = "text"
                      component={Link}
                      to={`/restaurants/${restaurant.id}`}
                    >
                      Details
                    </Button>
                  </div>
                }
              />
      
            </ImageListItem>
          ))
        )}
      </ImageList>
    </div>
    </div>
  );
}
