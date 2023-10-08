import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

/*const jwt= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…xNjd9.hWXZvo1R_ai2m5_7ZSoALEHFEb__FO0HLW70dhyO9Vo'
const jwtstring=JSON.stringify(jwt);
sessionStorage.setItem('This is a token:', jwtstring)*/

const Login = (setToken) => {
  const [username,setUsername]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]=useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const Navigate= useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e){
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        console.log('Full API Response:',result);
        
        
        if(isAuthenticated(result)) {


          sessionStorage.setItem('authToken',result.token);
          console.log('authToken:', result)
          setToken(result.token);
          setCurrentUser(result.user);
          setMessage(result.message || "Successfully logged in!");
        
        setPassword('');
        setMessage("Successfully logged in!");
        setTimeout(()=>{
          Navigate("./profile");
        }, 2000)
      }else{
        setError(result.error.message || 'Unexpected error occurred');
      }
    } catch (error) {
       setError(error.message);
    }
  }



  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='username'
            id='username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <Link to={"/Register"} className='register'> Don't have an Account? Sign up here</Link>
      <p>{message}</p>
    </div>
  );
};

export default Login;
