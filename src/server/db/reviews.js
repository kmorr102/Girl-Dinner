const db = require('./client');

// GET - /api/reviews to fetch all reviews
async function getAllReviews() {
    try {
      const { rows: reviews } = await db.query(`
      SELECT
        reviews.id AS id,
        reviews."authorId" AS author_id,
        reviews."restaurantId" AS restaurant_id,
        reviews.title AS title,
        reviews.content AS content,
        comments.id AS comment_id,
        comments.comment AS comment_text
      FROM
        reviews
      LEFT JOIN
        review_comments AS reviewscomments ON reviews.id = reviewscomments."reviewId"
      LEFT JOIN
        comments AS comments ON reviewscomments."commentId" = comments.id;
    `);
    
    return reviews;
    } catch (error) {
        throw error; 
    }
}

// GET - /api/reviews/:id to fetch single review by id
async function getReviewById(reviewId) {
    try {
        const { rows: [review] }= await db.query(`
        SELECT * 
        FROM reviews
        WHERE id=$1;`,[reviewId]);
        //return rows[0];

        if(!review){
            throw{
                name:"ReviewNotFoundError",
                message: "Could not find a review with that reviewId"
            };
        } 
    

        const { rows: [author] }= await db.query(`
            SELECT id,name,email,isAdmin
            FROM users
            WHERE id=$1;
        `, [review.authorId])

        review.comments= comments;
        review.author=author;

        delete review.authorId;
        
        return review;
    } catch (error) {
        console.error('Error with retrieving review by ID', error);
        throw error;
    }
}

async function createReview(reviewData) {
  try {
    const { authorId, restaurantId, title, content, comments=[] } = reviewData;
  
    console.log('Author ID:', authorId);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Comments:', comments);
  // Check if a review with the same authorId, title, and content exists
  const { rows: [existingReview] } = await db.query(
    `
    SELECT * FROM reviews
    WHERE "authorId" = $1 AND title = $2 AND content = $3 AND "restaurantId"= $4;
    `,
    [authorId,title, content, restaurantId]
  );
  if (existingReview) {
    // An existing review was found, you can choose to update it here
    console.log('Review already exists. Updating...');
    return existingReview;
  } else {
    // No existing review found, create a new one
    const { rows: [review] } = await db.query(
      `
      INSERT INTO reviews ("authorId", title, content, "restaurantId")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [authorId, title, content, restaurantId]
    );
    return review;
  }
} catch (error) {
  throw error;
}
}
  
async function deleteReviewById(reviewId) {
try {

  const { rowCount } = await db.query(`
  DELETE FROM reviews
  WHERE "id" = $1`, [reviewId])

  if (rowCount === 0) {
    throw {
      name: "ReviewError",
      message: "No review with that id exists",
    }
  }
  return{success:true};
} catch(error){
  console.error('Error deleting review', error);
  throw error;
 }
};

async function getReviewByUser(userId) {
    try {
        const { rows: reviewIds } = await db.query(`
        SELECT id
        FROM reviews
        WHERE "authorId"= ${userId};
        `)

        const reviews = await Promise.all(reviewIds.map(
            review => getReviewById(review.id)
        ));

        return reviews;
    } catch (error) {
      throw error;
    }
}

async function getAllComments(){
    try {
        const {rows} = await db.query(`
        SELECT  *
        FROM comments
        `);
     
    
        return { rows }
    } catch (error) {
      throw error;
    }
}

async function getCommentById(commentId){
  try {
    const { rows: [comment] } = await db.query(`
    SELECT * FROM comments
    WHERE id= $1`, [commentId])
    return comment;
  }catch(error){
    console.log('Error in getCommentById:', error)
  } throw (error);
  }

async function deleteCommentById(commentId){
  try {

    await db.query(`
    DELETE FROM review_comments
    WHERE "commentId"=$1
    `, [commentId])

    console.log('commentId:', commentId)
    const {  rowCount } = await db.query(`
    DELETE FROM comments 
    WHERE id= $1`, [commentId])
   
    if (rowCount === 0) {
      throw {
        name: "CommentNotFoundError",
        message: "No comment with that id exists",
      };
    }
    
    console.log('Deleted comment with ID:', commentId);
    return { success: true };
  } catch (error) {
    console.error('Error in deleteCommentById:', error);
    throw error;
  }
}

//updated createComment function
async function createComment(commentData){  
  try {
    const {comment,reviewId}= commentData
 
    const{ rows: [existingComment]}= await db.query(`
    SELECT * FROM comments
    WHERE  comment= $1 AND "reviewId"= $2
    `,[comment,reviewId])
    if(existingComment){
      console.log("Comment already submitted, Updating...");
      return existingComment;
    }else{
    const { rows: [comments]} = await db.query(`
    INSERT INTO comments ("reviewId",comment) 
    VALUES ($1, $2)
    RETURNING *
    `, [reviewId, comment]
    )};
    console.log('comment:', comment)
    return { success: true };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}


module.exports = {
    getAllReviews,
    createReview,
    getReviewById,
    deleteReviewById,
    getReviewByUser,
    getAllComments,
    createComment,
    getCommentById,
    createComment,
    deleteCommentById

}