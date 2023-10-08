const db = require('./client');
const { 
  createUser,
  getAllUsers
} = require('./users');
const { 
  getAllReviews, 
  createReview,
  getAllComments
}=require('./reviews')

const {
  createRestaurant, getAllRestaurants
  }=require('./restaurants')

const dropTables = async () => {
    try {
        console.log('Dropping All Tables...');

        // have to make sure to drop in correct order

        await db.query(`
        DROP TABLE IF EXISTS review_comments;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS restaurants;
        `);
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        console.log('Building All Tables...');
        await db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            isAdmin BOOLEAN DEFAULT false
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          title varchar(255) NOT NULL,
          content TEXT NOT NULL 
        );        
        
        CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        comment varchar(255) UNIQUE NOT NULL
        );
      
      CREATE TABLE review_comments (
        "reviewId" INTEGER REFERENCES reviews(id),
        "commentId" INTEGER REFERENCES comments(id),
        UNIQUE ("reviewId", "commentId")
        );

        CREATE TABLE restaurants (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          img VARCHAR(255)
          );
          
        `);
    }
    catch(err) {
        throw err;
    }
}

const users = [
  {
    id: 1,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    username: 'emilyjohnson',
    password: 'securepass',
    isAdmin: false,
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    username: 'johnnysmith',
    password: 'password123',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Jeff Buckley',
    email: 'jeffb@example.com',
    username: 'jeffb123',
    password: 'mynameisjeff',
    isAdmin: true,
  },
  {
    id: 4,
    name: 'Mario Maria',
    email: 'mariom@example.com',
    username: 'mrmario',
    password: 'maria724',
    isAdmin: true,
  }
  // Add more user objects as needed
];  

const createInitialUsers = async () => {
  try {
    console.log("Starting to create users...")
    for (const user of users) {
      await createUser({name: user.name, username: user.username, email: user.email, password: user.password, isAdmin: user.isAdmin});
    }
   
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!', error);
  }
};
async function createInitialReviews() {
  try {
    const users = await getAllUsers(); // Retrieve all users


    const reviewDataArray = [
      {
        authorId: users[0].id,
        title: "Best food ever",
        content: "I would recommend to others!",
        comments: ["I definitely agree!"]
      },
      {
        authorId: users[2].id,
        title: "Decent food",
        content: "Reasonable prices and pretty good food",
        comments: ["I agree with the review, food is decent but nothing you can't make at home."]
      },
      {
        authorId: users[3].id,
        title: "Nice customer service",
        content:  "Had a great birthday party here",
        comments: ["I also attended a party here and it was a great space for pictures"]
      },
      {
        authorId: users[1].id,
        title: "Would not go here again",
        content:  "I have had better'",
        comments:["Rude staff:("]
      },
      {
        authorId: users[0].id,
        title:  "Best cheesecake ever!!!",
        content:  "You have to try their oreo cheesecake its great. Service was also amazing",
        comments:["Cheesecake is 10/10"]
      },
      {
        authorId: users[2].id,
        title:"Wasn't great:(",
        content:"I've heard such great things, but I personally won't be going back",
        comments:["Waste of a datenight."]
      },
      {
        authorId: users[1].id,
        title:"Look no further!",
        content:"They have the best ice in town! If you know, you know.",
        comments:["Ashley our server was great!"]
      },
    ];
    
    for (const reviewData of reviewDataArray) {
      console.log('Creating Review Data:', reviewData);
      await createReview(reviewData); // Create a review using the review data
    }

    console.log('Initial Review Data created successfully');
  } catch (err) {
    console.log('Error creating review data');
    throw err;
  }
}

// creating initial restaurants
const createInitialRestaurants = async () => {
  try {
    const restaurants = [
      {
        id: 1,
        name: 'Seafood Shack',
        address: '123 Front Street',
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
      },
      {
        id: 2,
        name: 'Pizzeria',
        address: '101 Main Street',
        img: 'https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
      },
      {
        id: 3,
        name: 'Ice Cream',
        address: '393 Oak Road',
        img: 'https://images.unsplash.com/photo-1620124452520-0d9be56b29ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2824&q=80',
      },
      {
        id: 4,
        name: 'Sub Shop',
        address: '402 Maple Avenue',
        img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
      },
      {
        id: 5,
        name: 'Coffee Cafe',
        address: '271 Pine Lane',
        img: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
      },
      {
        id: 6,
        name: 'Diner',
        address: '179 Meadow Drive',
        img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
      },
    ];

    for (const restaurant of restaurants) {
      console.log('Creating Restaurant Data:', restaurant);
      await createRestaurant(restaurant.name, restaurant.address, restaurant.img);
    }

    console.log('Initial Restaurant Data created successfully');
  } catch (err) {
    console.log('Error creating restaurant data:', err);
    throw err;
  }
};


const seedDatabase = async () => {
    try {
        db.connect();
        
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialReviews();
        await createInitialRestaurants();
    }catch (err) {
      console.log("Error during seedDatabase")
        throw err;
    }
  }

    async function testDB() {
      try {
        console.log("Starting to test database...");
    
        console.log("Calling getAllUsers");
        const users = await getAllUsers();
        console.log("Result:", users);
    
        console.log("Calling getAllReviews");
        const reviews = await getAllReviews();
        console.log("Result:", reviews);

        console.log("Calling getAllComments");
        const allComments= await getAllComments();
        console.log ("Result:", allComments)

        console.log("Calling getAllRestaurants");
        const restaurants = await getAllRestaurants();
        console.log("Result:", restaurants);
    
        console.log("Finished database tests!");
      } catch (error) {
        console.log("Error during testDB");
        throw error;
      }
    }
  

    seedDatabase()
      .then(testDB)
      .catch(console.error)
      .finally(() => db.end());

