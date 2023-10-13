const db = require('./client');


const createRestaurant = async (name, address, img, number, content, type) => {
    try {
      const query = {
        text: `
          INSERT INTO restaurants (name, address, img, number, content, type)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `,
        values: [name, address, img, number, content, type],
      };
  
      const result = await db.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  };
  
async function getAllRestaurants() {
    try {
        const { rows: restaurants } = await db.query(`
SELECT
    restaurants.id AS id,
    restaurants.name AS name,
    restaurants.address AS address,
    restaurants.img AS img,
    restaurants.number AS number,
    restaurants.content AS content,
    restaurants.type AS type,
    reviews.id AS reviewId,
    reviews.content AS review_text
FROM
    restaurants
LEFT JOIN
    restaurant_reviews AS restaurantsreviews ON restaurants.id = restaurantsreviews."restaurantId"
LEFT JOIN
    reviews AS reviews ON restaurantsreviews."reviewId" = reviews.id;



`);

        return restaurants;
    } catch (error) {
        throw error;
    }
}


async function getRestaurantById(restaurantId) {
    try {
        const { rows: [restaurant] } = await db.query(`
SELECT *
FROM restaurants
WHERE id = $1`, [restaurantId]);

        if (!restaurant) {
            throw {
                name: "RestaurantNotFoundError",
                message: "Could not find a restaurant with that id",
            };
        }
        return restaurant;
    } catch (error) {
        console.error('Error with retrieving restaurant by ID', error);
        throw error;
    }
}


module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById
}