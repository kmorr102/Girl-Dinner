const express = require('express')
const reviewsRouter = express.Router();

const {requireUser} =require("./index")

const {
   getAllReviews,
   getReviewById,
   createReview,
   getAllComments,
   deleteReview,
   updateReview
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
  
  // DELETE - /api/reviews/:id - delete a review by id
reviewsRouter.delete('/:id', async (req, res, next) => {
  try {
      const review = await deleteReview(req.params.id);
      res.send(review);
  } catch (error) {
      next(error);
  }
});

//EDIT- /api/reviews/:id - edit a review by id
reviewsRouter.patch('/:reviewId', async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const { title, content} = req.body;

  const updateFields= {};

  if(title) {
    updateFields.title=title;
  }

  if (content) {
    updateFields.content=content;
  }

  try {
      const originalReview= await getReviewById(reviewId);

      if(originalReview.author.id ===req.user) {
        const updatedReview= await updateReview(reviewId, updateFields);
        res.send({ review: updatedReview });
      }else{
       next({name: "UnauthorizedUserError",
             message: "You can not update a review that is not yours",
     }); 
        }
  } catch ({name,message}) {
      next({name,message});
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