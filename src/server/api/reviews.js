const express = require('express')
const reviewsRouter = express.Router();

const {requireUser} =require("./index")

const {
   getAllReviews,
   getReviewById,
   createReview,
   getAllComments,
} = require('../db/reviews');

// GET - /api/reviews - fetch all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        
        res.send({reviews});
        console.log('Fetch all reviews:', reviews)
    } catch ({name,message}) {
        next({name,message});
    }
});

//GET - /api/reviews/:reviewId - fetch single review by Id

// changed reviewId to id
reviewsRouter.get("/:reviewId", async (req,res, next)=>{
    try {
        const review= await getReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
      next(error);
    }
});


reviewsRouter.post("/", async (req, res, next) => {
    try {
        const review = await createReview(req.body);

        const existingReview = await getReviewById(review.id);

        if (existingReview) {
            res.send(existingReview);
        } else {
            const newReview = await createReview(review);
            if (newReview) {
                res.send(newReview);
            } else {

                next({
                    name: "CreateReviewError",
                    message: "There was an error creating the review"
                });
            }
        }

    } catch (error) {
        next(error);
    }
});

reviewsRouter.get("/", async (req,res,next) => {
    try{
    const comments= await getAllComments();

    res.send({
        comments
    });
  }catch ({name,message}) {
   next({name,message});
  }
});

module.exports = reviewsRouter;