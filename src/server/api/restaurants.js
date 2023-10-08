const express = require('express')
const restaurantsRouter = express.Router();


const {
    getAllRestaurants,
    getRestaurantById
} = require('../db/restaurants');


// GET - /api/restaurants - fetch all restaurants
restaurantsRouter.get('/', async (req, res, next) => {
    try {
        const restaurants = await getAllRestaurants();
        res.send({ restaurants });
        console.log('Fetch all restaurants:', restaurants)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

//GET - /api/restaurants/:restaurantId - fetch single restaurant by Id
restaurantsRouter.get("/:restaurantId", async (req, res, next) => {
    try {
        const restaurant = await getRestaurantById(req.params.restaurantId);
        res.send(restaurant);
    } catch (error) {
        next(error);
    }
});

module.exports = restaurantsRouter;