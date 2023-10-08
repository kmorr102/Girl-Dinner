import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";



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
        
        
        
        if(!result) {
          setError('Could not authenticate');
          console.log('error at authentication', (!result))
        
        } else{
          sessionStorage.setItem('authToken', result.token);
          console.log('authToken:', result.token)
          setCurrentUser(result);
          console.log('currentUser:', result)
          setPassword('');
        
      
          setTimeout(()=>{
          Navigate("./");
        }, 2000)
      }   
    } catch (error) {
      setError(error.message || 'Unexpected error occurred')
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
