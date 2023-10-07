const express = require("express");
const usersRouter = express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const { createUser, getUser, getUserByEmail, getAllUsers } = require("../db");

const { requireUser, requireAdminStatus,checkAuthentication } = require('./utils')
// console.log(requireAdminStatus)


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
/*usersRouter.get("/me", checkAuthentication, async (req, res, next) => {
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
});*/


usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  //request must have both

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          username,
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "Login successful!",
        user,
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
  const { name,username, email, password, isAdmin } = req.body;
  //console.log("This is token:", `${process.env.JWT_SECRET}`);
  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }
    //console.log("Hashed Password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hashed Password:", hashedPassword);

    
    const user = await createUser({
      name,
      username,
      email,
      hashedPassword,
      isAdmin
    });

    const token = jwt.sign(
      {
        username,
        email,
      },
      //console.log("This is token:", `${process.env.JWT_SECRET}`)
      `${process.env.JWT_SECRET}`,
      
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      user,
      token,
    });
  } catch ({error}) {
    //console.log("error from api reg:", error)
    next({error });
  }
});


(module.exports = usersRouter), createUser;
