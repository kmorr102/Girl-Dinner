const db = require('./client');

// GET - /api/reviews to fetch all reviews
async function getAllReviews() {
    try {
        const { rows: reviews } = await db.query(`
            SELECT reviews.id,
            reviews."authorId" AS author_id,
            reviews.title AS review_title,
            reviews.content AS review_content,
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
        const { rows: comments }=await db.query(`
            SELECT comments. *
            FROM comments
            JOIN review_comments ON comments.id=review_comments."commentId"
            WHERE review_comments."reviewId" = $1;
            `, [reviewId])
    

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


async function createReview(authorId, title, content, comments = []) {
    try {
      console.log('Author ID:', authorId);
      console.log('Title:', title);
      console.log('Content:', content);
      console.log('Comments:', comments);
      
      const { rows: [review] } = await db.query(
        `
        INSERT INTO reviews ("authorId", title, content)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [authorId, title, content]
      );
  
      const commentList = await createComments(comments);
  
      return await addCommentsToReview(review.id, commentList);
    } catch (error) {
      throw error;
    }
}

  

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

async function createComments(commentList) {
    if (commentList.length === 0) {
      return;
    }
  
    // Create an array of parameterized query placeholders
    const placeholders = commentList.map((_, index) => `$${index + 1}`).join(',');
  
    try {
      const query = `
        INSERT INTO comments (comment)
        VALUES (${placeholders})
        ON CONFLICT (comment) DO NOTHING
        RETURNING *;
      `;
  
      const { rows } = await db.query(query, commentList);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  

async function createReviewComment(reviewId, commentId) {
    try {
        await db.query(`
        INSERT INTO review_comments("reviewId", "commentId")
        VALUES ($1,$2)
        ON CONFLICT ("reviewId", "commentId") DO NOTHING;
        `, [reviewId, commentId]);
    } catch (error) {
      throw error;
    }
}

async function addCommentsToReview(reviewId,commentList) {
    try {
        const createReviewCommentPromise= commentList.map(
            comment => createReviewComment(reviewId,comment.id)
        );

        await Promise.all(createReviewCommentPromise);

        return await getReviewById(reviewId);
    } catch (error) {
      throw error;
    }
}

async function getAllComments(){
    try {
        const  {rows} = await db.query(`
        SELECT * FROM comments
        `);

        return { rows }
    } catch (error) {
      throw error;
    }
}

module.exports = {
    getAllReviews,
    createReview,
    getReviewById,
    getReviewByUser,
    getAllComments,
    createComments,
    createReviewComment,
    addCommentsToReview,
}