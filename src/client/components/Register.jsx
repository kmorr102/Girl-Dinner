import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { fetchNewUser } from "../API/index.js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";




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

  /*const handlefnameChange = (e) => {
    setFName(e.target.value);
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };*/

  async function handleSubmit(event){
    event.preventDefault();
    Navigate('/Login')
    try {
        const response= await fetch('http://localhost:3000/api/users/register',
        {
          //username: {
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
         // }
        });
        console.log('name:',name);
        console.log('username:',username);
        console.log('email:',email)
        console.log('password:', password);
        //console.log('admin:', isAdmin);
        
        
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
    <div className="form-cont">
      <h1>Register Now!</h1>
      <form method="POST" onSubmit={handleSubmit} className="form">
      <div className="name">
      <input
            className="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setFName(e.target.value)}
            required
          />
            </div>
          <div className="username">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
          </div>
          <div className="email">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          </div>
        <div className="password-cont">
         {/*Your register form should have a place to enter a name, a place to enter a password, and a place to enter password confirmation. */}
          <input
            className="password-input"
            type={inputType}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <div>
          <button>Create Account</button>
        </div>
      </form>
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
    </div>
    /*<div className='form-cont'>
    <h1>Register Now!</h1>
    <form onSubmit={handleSubmit} className="form">
      <div className="name">
        <label htmlFor='name'>Name:</label>
        <input
        className="name"
          type='text'
          id='name'
          value={fname}
          onChange={handlefnameChange}
          required
        />
      </div>
      <div className="username">
        <label htmlFor='username'>Username:</label>
        <input
          type='username'
          id='username'
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div className="email">
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="password-cont">
        <label htmlFor='email'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      
      <button type='submit'>Create Account</button>
    </form>
   
  </div>*/
  
  );
}