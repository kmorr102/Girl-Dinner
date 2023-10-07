import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchNewUser } from "../API/index.js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { createUser } from "../../server/db/users.js";



export default function Register({ inputType, onSetInputType,setToken,token }) {
  console.log(token)
  const [fname, setFName] = useState ("");
  const [lname, setLName] = useState ("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(null);
  const [error, setError] = useState(null);
  const Navigate=useNavigate()

  async function handleSubmit(event){
    event.preventDefault();
    Navigate('/Login')
    try {
        const APIResponse= await fetch('http://localhost:3000/api/users/register',
        {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                
            },
            body: JSON.stringify({
                user: { 
                    fname,
                    lname,
                    password,
                }
            })
        });
        const result= await APIResponse.json();
        console.log("SignUp Result:",result);
        setToken(result.token);
        console.log(result.token)
        setSuccessfulSignup(result.message);
        setFName(result.name);
        setLName('');
        setPassword('');
        return result;
    } catch (error) {
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
            value={fname}
            onChange={(e) => setFName(e.target.value)}
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
          {/* Your register form should have a place to enter a name, a place to enter a password, and a place to enter password confirmation. */}
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
  );
}