import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { FaStar } from 'react-icons/fa' 

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import { NineKPlusOutlined } from "@mui/icons-material";

import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';


import FormControl from 'react-bootstrap/FormControl'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Girl Dinner
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateReview({currentUser}){
    const tokenString = sessionStorage.getItem("authToken");
    console.log('token from login(storage):', tokenString)
    console.log(currentUser.name)

    const [reviews, setReviews]= useState('');
    const auth = sessionStorage.getItem('authToken');
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [authorId, setAuthorId]= useState('');
    const [error, setError]= useState(null);
    const [searchParams, setSearchParams]= useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAuthor, setIsAuthor]= useState('')
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [restaurantId, setRestaurantId] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
    const handleClose = () => {
    setAnchorEl(null);
  };


    const Navigate= useNavigate();
    
    useEffect(() => {
      // Fetch the list of restaurants from your API endpoint and store it in state.
      // Example:
      fetch('http://localhost:3000/api/restaurants')
        .then((response) => response.json())
        .then((data) => {
          // Set the restaurants data in state.
          setSearchParams(data);
        })
        .catch((error) => {
          console.error('Error fetching restaurants', error);
        });
    }, []);
    
    
    async function handleSubmit(e){
        e.preventDefault();
        Navigate("/Reviews")
        /*if(!tokenString) {
          setError("You must have an account to make a post. Login or create an account to add review.")
          console.log('error message if no token')
          return;
        }*/
      
        try {
          //console.log('at the start of try block')
          const authorId = currentUser.userId
          console.log(JSON.stringify({title, content, authorId}))
          const response= await fetch('http://localhost:3000/api/reviews',
          {
            method: 'POST',
            headers: {
                      'Content-Type': 'application/json'
                      // 'Authorization': `Bearer ${tokenString}`
                    },
            body: JSON.stringify({
                      title,
                      content,
                      authorId, 
                      restaurantId
          })
        });
          const result = await response.json();
          console.log('result:', JSON.stringify(result))
          return result;
        } catch (error) {
          console.error('error creating post', error)
          return{success: false, error: error.message};
          
        }
      }
      return (
            
      <div className='form-container'>
          <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Write Review
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Select a restaurant
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {restaurantId &&
                  searchParams.map((restaurant) => (
                    <MenuItem
                    key={restaurant.id}
                    value={restaurant.id}
                    onClick={() => handleSelectRestaurant(restaurant.id)}
                  >
                    {restaurant.name}
                  </MenuItem>
                  
                  ))}
              </StyledMenu>


          {/* <FormControl fullWidth>
          <FloatingLabel htmlFor="restaurant-select">Select a restaurant</FloatingLabel>
          <Form.Select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            inputProps={{
              name: 'restaurant',
              id: 'restaurant-select',
            }}
          >
            <Dropdown>
            <Dropdown.Menu value="" disabled>
              Select a restaurant
            </Dropdown.Menu>
            {searchParams && searchParams.map((restaurant) => (
              <Dropdown.Item key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </Dropdown.Item>
             
            ))}
            </Dropdown>
          </Form.Select>
        </FormControl> */}

          
            <TextField
              margin="normal"
              required
              fullWidth
              id="Title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Content"
              label="Review"
              type="Content"
              id="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
             />
           

          

            <div className = "Star">
            <p> Rating: {rating} </p>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                  <label>
                    <input 
                    type="radio" 
                    name="rating" 
                    value={currentRating}
                    onClick={()=> setRating(currentRating)}
                    />
                    <FaStar 
                    size={77}
                    color={currentRating <= (hover || rating) ? "#f0d32e" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    />
                  </label>
                )
              })}
            </div>

          
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Review
            </Button>
          
          </Box>
          </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

    {successMessage && <div>{successMessage}</div>}
          {error && <div>{error}</div>}
        </div>
        
      );
    }
    
    
    
    
    
    