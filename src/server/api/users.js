const express = require("express");
const usersRouter = express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const { createUser, getUser, getUserByEmail, getAllUsers, getUserByUsername, getUserById, getUserIdByUsername } = require("../db");

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
usersRouter.get("/:id"), async (req, res, next) =>{
  try {
    const userId= req.params.userId
    const user = await getUserById(userId);
    res.send({
      user,
    });
  } catch ({name,message}) {
    next({name,message})
    
  }
}




usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log('username(login):',username)
  console.log('password:',password)

  //request must have both

  if (!username || !password) {
  

    next({
      name: "MissingCredentialsError",
      message: "Please supply both an username and password",
    });
  }
  try {
    const user = await getUser({ username, password });
    console.log('user data from /login:',user)
   
    if(username) {
      const id= await getUserIdByUsername(user.id);
      console.log('user id:', id)
    }

    if (user) {
      console.log('user', user)
      const token = jwt.sign(
        { 
          username,
          userId: user.id,
          
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1w",
        }
      );
      console.log('token:', token)
      res.send({
        message: "Login successful!",
        token,
        userId: user.id ,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    console.log('this is a token from //login:',`${process.env.JWT_SECRET}`)
    console.log('error from /login api');
    next(err);
  }
});



usersRouter.post("/register", async (req, res, next) => {
  const { 
    name,
    username, 
    email, 
    password, 
   } = req.body;
  console.log("This is token:", `${process.env.JWT_SECRET}`);
  try {
    const _user = await getUserByEmail(email);
    console.log('email:', email)

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }
    const _username = await getUserByUsername(username);
    console.log('usernamee:', username)

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that username already exists",
      });
    }
    
    console.log("unHashed Password", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    
    const user = await createUser({
      name,
      username,
      email,
      hashedPassword,
      
    });

    const token = jwt.sign(
      { 
        name,
        username,
        email,
        hashedPassword
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
    console.log('token:', token)
  } catch ({error}) {
    console.log("error from api reg:", error)
    next({error });
  }
});


(module.exports = usersRouter), createUser;
