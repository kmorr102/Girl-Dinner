const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball')
apiRouter.use(volleyball)


//require user function
function requireUser(req,res,next) {
  if(!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message:"You must be logged in to perform this action"
    });
  }
  next()
};
// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('REPLACE_ME')) {
    // TODO - Get JUST the token out of 'auth'
    const token = 'REPLACE_ME';
    
    try {
      const parsedToken = 'REPLACE_ME';
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});
//end point for all users 

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

//end point for all reviews 
const reviewsRouter= require('./reviews');
apiRouter.use('/reviews', reviewsRouter);



apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = 
{apiRouter,
 requireUser,
}