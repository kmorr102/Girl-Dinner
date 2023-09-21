// import React, { useState, useEffect } from 'react';

// export default function Register() {
//     return (
//       <div className='register'>
//         <h1>Register</h1>
//       </div>
//     );
//   }

import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewUser } from "../API/index.js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Register({ inputType, onSetInputType }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessfulSignup(null);
    if (verifyPassword === password) {
      const newUser = await fetchNewUser(username, password);
      if (newUser.error) setError(newUser.error);
      if (newUser.success) {
        setSuccessfulSignup(newUser.data.message);
      }
      console.log(newUser);
    } else {
      setError(
        "Password inputs do not match, please make sure they match before submitting"
      );
    }
  }

  return (
    <div className="form-cont">
      <h1>Register Now!</h1>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-cont">
          {/* Your register form should have a place to enter a username, a place to enter a password, and a place to enter password confirmation. */}
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
          <Link to="/account/login" className="form-link">
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