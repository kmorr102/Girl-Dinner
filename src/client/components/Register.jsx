import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { fetchNewUser } from "../API/index.js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';

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


export default function Register({ inputType, onSetInputType,setToken}) {
  const [name, setFName] = useState ("");
  const [email, setEmail] = useState ([]);
  const [username, setUsername]=useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(null);
  //const [isAdmin,setIsAdmin]=useState(null)
  const [error, setError] = useState(null);
  const Navigate=useNavigate()


  async function handleSubmit(event){
    event.preventDefault();
    Navigate('/Login')
    try {
        const response= await fetch('http://localhost:3000/api/users/register',
        {
          
            method:'POST',
            headers: {
                'Content-Type':'application/json'
                
            },
            body: JSON.stringify({
              
                    name,
                    username, 
                    email,
                    password,
  
          })
         
        });
        console.log('name:',name);
        console.log('username:',username);
        console.log('email:',email)
        console.log('password:', password);
        
        
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
       
        const result= await response.json();
        console.log("SignUp Result:",result);
        setToken(result);
        setSuccessfulSignup(result.message);
        setFName('');
        setUsername('');
        setPassword('');
        console.log('form submitted')
        return result;
    } catch (error) {
      setError(error.message)
      console.log(error);
    }
}
  return (
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
            Register Now
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              onChange={(e) => setFName(e.target.value)}
              required
              fullWidth
              id="fname"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
           <TextField
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="current-password"
            />
             <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

          
          {inputType === "password" ? (
            <IoEyeOutline
              onClick={() => onSetInputType("text")}
              className="icon"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => onSetInputType("password")}
              className="icon"
            />
          )}
           <div className="password-cont">
          <input
            className="password-input"
            type={inputType}
            placeholder="Re-Enter Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
          {inputType === "password" ? (
            <IoEyeOutline
              onClick={() => onSetInputType("text")}
              className="icon"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => onSetInputType("password")}
              className="icon"
            />
          )}
        </div>
        {verifyPassword !== password ? (
          <h3 id="password-verify">Passwords do not match</h3>
        ) : (
          ""
        )}
          <Button className='login-button'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
       
        {!successfulSignup ? (
        <h4>
          Already have an account?{" "}
          <Link to="/Login" className="form-link">
            Log in
          </Link>
        </h4>
      ) : (
        ""
      )}
      {error && (
        <h4 id="register-error">Oops! Something went wrong: {error}</h4>
      )}
      {successfulSignup && (
        <h4>
          {successfulSignup}{" "}
          <Link to="/account/login" className="form-link">
            Log in
          </Link>
        </h4>
      )}
        <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  { "Already have an account? "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
       
  
          
      
  );
}