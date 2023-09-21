const express = require('express')
const reviewsRouter = express.Router();

const {requireUser} =require("./index")

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

//GET - /api/reviews/:reviewId - fetch single review by Id
reviewsRouter.get("/:reviewId", async (req,res, next)=>{
    try {
        const review= await getReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
      next(error);
    }
});

//POST - /api/reviews create new review
reviewsRouter.post("/", requireUser, async (req,res,next)=>{
    const { authorId, title, content = ""}= req.body;
    
    const postData={};
    try {
        postData.authorId=req.user.id;
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
});

module.exports = reviewsRouter;