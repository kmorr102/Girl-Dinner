const db = require('./client');

// GET - /api/reviews to fetch all reviews
async function getAllReviews() {
    try {
        const { rows: reviewIds } = await db.query(`
            SELECT FROM reviews;
        `);
        const reviews= await reviewIds.map(review=>getReviewById(review.id));
        
        return reviews;
    } catch (error) {
        throw error; 
    }
}

async function getReviewById(reviewId) {
    try {
        const { rows: [review] }= await db.query(`
        SELECT * 
        FROM reviews
        WHERE id=$1;`,[reviewId]);

        if(!review){
            throw{
                name:"ReviewNotFoundError",
                message: "Could not find a review with that reviewId"
            };
        }
    } catch (error) {
        throw error;
    }
}


async function createReview({
    authorId,
    title,
    content,
}) {
    try{
        const { rows: [ review ] }= await db.query(`
        INSERT INTO reviews ("authorId",title,content)
        VALUES ($1,$2,$3)
        RETURNING *;
        `,[authorId,title,content]);
    }catch(error){
        throw error;
    }
}


module.exports = {
    getAllReviews,
    createReview,
    getReviewById,
}