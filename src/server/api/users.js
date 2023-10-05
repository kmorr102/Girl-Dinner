const express = require("express");
const usersRouter = express.Router();
const bcrypt=require('bcrypt');

const { createUser, getUser, getUserByEmail, getAllUsers } = require("../db");

const { requireUser, requireAdminStatus,checkAuthentication } = require('./utils')
// console.log(requireAdminStatus)

const jwt = require("jsonwebtoken");

usersRouter.get("/",async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});


// Define the "users/me" endpoint
usersRouter.get("/me", checkAuthentication, async (req, res, next) => {
  try {
    // Retrieve the authenticated user's data
    const authenticatedUser = req.user; 
    // Create a user object with limited data (excluding password and token)
    const user = {
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
    };
    console.log("user authenticated")
    res.send({
      user,
    });
  } catch (error) {
    next(error);
  }
});


usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  //request must have both

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          name,
          email,
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;
  console.log("This is token:", `${process.env.JWT_SECRET}`);
  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }
    const hashedPassword=await bcrypt.hash(password,10);
    
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    const token = jwt.sign(
      {
        name,
        email,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

(module.exports = usersRouter), createUser;
