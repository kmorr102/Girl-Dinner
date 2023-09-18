const express = require('express')
const reviewsRouter = express.Router();

const {
   getAllReviews
} = require('../db/reviews');

// GET - /api/reviews - fetch all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.setHeader('Content-Type', 'application/json');
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

module.exports = reviewsRouter;