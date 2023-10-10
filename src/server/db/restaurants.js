const db = require('./client');


const createRestaurant = async (name, address, img, number, content) => {
    try {
      const query = {
        text: `
          INSERT INTO restaurants (name, address, img, number, content)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `,
        values: [name, address, img, number, content],
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
SELECT * FROM restaurants
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