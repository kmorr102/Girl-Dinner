const express = require('express')
const reviewsRouter = express.Router();

const {requireUser} =require("./index")

const {
   getAllReviews,
   getReviewById,
   createReview,
   getAllComments,
   deleteReview
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
    // Destructure the expected properties from the request body
    const { authorId, title, content = "", comments = [] } = req.body;
  
    // Create an empty reviewData object
    const reviewData = {};
  
    try {
      // Populate the reviewData object with the properties from the request body
      reviewData.authorId = authorId;
      reviewData.title = title;
      reviewData.content = content;
      reviewData.comments = comments;
  
      // Call the createReview function with the populated reviewData
      const review = await createReview(reviewData);
  
      if (review) {
        // If the review is created successfully, send it as the response
        res.send(review);
      } else {
        // If there's an error during review creation, send an error response
        next({
          name: "ReviewCreationError",
          message: "There was an error creating your review. Please try again.",
        });
      }
    } catch ({ name, message }) {
      // Handle any errors that might occur during the process
      next({ name, message });
    }
  });
  

/*reviewsRouter.post("/", async (req, res, next) => {
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
});*/

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

// DELETE - /api/reviews/:id - delete a review by id
reviewsRouter.delete('/:id', async (req, res, next) => {
  try {
      const review = await deleteReview(req.params.id);
      res.send(review);
  } catch (error) {
      next(error);
  }
});


module.exports = reviewsRouter;