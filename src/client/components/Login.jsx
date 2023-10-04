import React, { useState } from 'react';

const Login = (setToken) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]=useState(null);
  const [currentUser, setCurrentUser] = useState(null);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        console.log('Full API Response:',result);
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        if(result.data && result.data.token) {
          localStorage.setItem('authToken',result.data.token);
          setToken(result.data.token);
          setCurrentUser(result.data.user);
          setMessage(result.message || "Successfully logged in!");
        
        setEmail('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
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
      <p>{message}</p>
    </div>
  );
};

export default Login;
