const db = require('./client');

// GET - /api/reviews to fetch all reviews
async function getAllReviews() {
    try {
        const { rows: reviews } = await db.query(`
            SELECT * FROM reviews;
        `);
       
    return reviews;
    } catch (error) {
        throw error; 
    }
}

// GET - /api/reviews/:id to fetch single review by id
async function getReviewById(reviewId) {
    try {
        const { rows }= await db.query(`
        SELECT * 
        FROM reviews
        WHERE id=$1;`,[reviewId]);
        return rows[0];

  /*       if(!review){
            throw{
                name:"ReviewNotFoundError",
                message: "Could not find a review with that reviewId"
            };
        } */
    } catch (error) {
        console.error('Error with retrieving review by ID', error);
        throw error;
    }
}


/* ORIGINAL:
async function createReview({
    title,
    content,
}) {
    try{
        const { rows: [review]  }= await db.query(`
        INSERT INTO reviews (title,content)
        VALUES ($1,$2)
        RETURNING *;
        `,[title,content]);
    }catch(error){
        throw error;
    }
} */

async function createReview(body) {
    try {
      const { rows: [review] } = await db.query(
        `
        INSERT INTO reviews (title, content)
        VALUES ($1, $2)
        RETURNING *`, 
        [body.title, body.content]
      );
      return review;
    } catch (error) {
      throw error;
    }
  }


module.exports = {
    getAllReviews,
    createReview,
    getReviewById
}