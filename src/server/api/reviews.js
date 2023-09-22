const express = require('express')
const reviewsRouter = express.Router();

const {requireUser} =require("./index")

const {
   getAllReviews,
   getReviewById,
   createReview,
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

// ORIGINAL: POST - /api/reviews create new review
/* reviewsRouter.post("/", async (req,res,next)=>{
    const  {title, content = ""}= req.body;
    
    const postData={};
    try {
        //postData.authorId=req.user.id;
        postData.title= title;
        postData.content=content;

        const review= await createReview(postData);

        if(review) {
            res.send(review);
        }else{
            next({
                name: "ReviewCreationError",
                message: "There was an error creating your review. Please try again "
            })
        }
    } catch ({name, message}) {
      next({name,message});
    }
}); */

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

module.exports = reviewsRouter;