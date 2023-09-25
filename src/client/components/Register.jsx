import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewUser } from "../API/index.js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { createUser } from "../../server/db/users.js";


export default function Register({ inputType, onSetInputType }) {
  const [name, setName] = useState ("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessfulSignup(null);
    if (verifyPassword === password) {
      const newUser = await fetchNewUser(email, password);
      console.log(newUser.email)
      console.log(newUser.password)
      if (newUser.password === undefined) console.log("help")
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
      <div className="name">
      <input
            className="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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