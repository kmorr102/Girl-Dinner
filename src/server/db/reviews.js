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

module.exports = {
    getAllReviews
}