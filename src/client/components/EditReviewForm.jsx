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

export default function EditReview(author_Id){
    const tokenString = sessionStorage.getItem("authToken");
    //console.log('token from login(storage):', tokenString)
    

    const [reviews, setReviews]= useState('');
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [error, setError]= useState(null);
    const [searchParams, setSearchParams]= useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAuthor, setIsAuthor]= useState('')
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const Navigate= useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();
        Navigate("/Profile")
      
        try {
            const response = await fetch (`http://localhost:3000/api/reviews/${author_Id}`, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  // 'Authorization': `Bearer ${tokenString}`
                }
              });
              const result = await response.json();
              setApiResult(result);
              console.log(result)
            } catch (error) {
              console.error(error)
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