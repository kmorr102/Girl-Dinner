const express = require('express')
const reviewsRouter = express.Router();

const {
   getAllReviews
} = require('../db/reviews');

// GET - /api/reviews - fetch all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();
        res.send(allReviews)
       // const reviews=allReviews.filter((review)=>{
         //   if(req.user && review.author.id===req.user.id){
             //   return true;
           // }
               // return false;
        //})
        /*res.send({allReviews,
        });*/
    } catch (error) {
        next(error);
    }
});

module.exports = reviewsRouter;