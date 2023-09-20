const express = require('express')
const reviewsRouter = express.Router();

const {
   getAllReviews,
   getReviewById,
   createReview
} = require('../db/reviews');

// GET - /api/reviews - fetch all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        
        res.send({reviews});
    } catch ({name,message}) {
        next({name,message});
    }
});

module.exports = reviewsRouter;