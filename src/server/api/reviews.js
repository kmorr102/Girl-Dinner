const express = require('express')
const reviewsRouter = express.Router();

const {
   getAllReviews
} = require('../db/reviews');

// GET - /api/reviews - fetch all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();

       // const reviews=allReviews.filter((review)=>{
         //   if(req.user && review.author.id===req.user.id){
             //   return true;
           // }
               // return false;
        //})
        res.send({allReviews,
        });
    } catch ({name,message}) {
        next({name,message});
    }
});

module.exports = reviewsRouter;