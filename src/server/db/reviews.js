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
}