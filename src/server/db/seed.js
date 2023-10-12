const db = require('./client');
const { 
  createUser,
  getAllUsers
} = require('./users');
const { 
  getAllReviews, 
  createReview,
  getAllComments,
  createComment
} = require('./reviews');

const {
  createRestaurant, getAllRestaurants
} = require('./restaurants');

// Rest of your code...


const dropTables = async () => {
    try {
        console.log('Dropping All Tables...');

        // have to make sure to drop in correct order

        await db.query(`
        DROP TABLE IF EXISTS review_comments;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS restaurant_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS restaurants;
        DROP TABLE IF EXISTS users;
       
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
  
  CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  number VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

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
  "restaurantId" INTEGER REFERENCES restaurants(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL 
);
CREATE TABLE restaurant_reviews (
  "restaurantId" INTEGER REFERENCES restaurants(id),
  "reviewId" INTEGER REFERENCES reviews(id),
  UNIQUE ("restaurantId", "reviewId")
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE review_comments (
  "reviewId" INTEGER REFERENCES reviews(id),
  "commentId" INTEGER REFERENCES comments(id),
  UNIQUE ("reviewId", "commentId")
);


`)
    }
    catch(err) {
        throw err;
    }
}


const userData = [
  {
    id: 1,
    authorId: 1,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    username: 'emilyjohnson',
    password: 'securepass',
    isAdmin: false,
  },
  {
    id: 2,
    authorId: 2,
    name: 'John Smith',
    email: 'john@example.com',
    username: 'johnnysmith',
    password: 'password123',
    isAdmin: false,
  },
  {
    id: 3,
    authorId: 3,
    name: 'Jeff Buckley',
    email: 'jeffb@example.com',
    username: 'jeffb123',
    password: 'mynameisjeff',
    isAdmin: true,
  },
  {
    id: 4,
    authorId: 4,
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
    for (const user of userData) {
      await createUser({name: user.name, username: user.username, email: user.email, password: user.password, isAdmin: user.isAdmin});
    }
   
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!', error);
  }
};


// creating initial restaurants
const createInitialRestaurants = async () => {
  try {
    const restaurants = [
      {
        id: 1,
        name: 'Seafood Shack',
        address: '123 Front Street',
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 123-4567',
        content: 'A coastal gem serving the freshest catch of the day. Dive into a seafood paradise with dishes that make waves.'
      },
      {
        id: 2,
        name: 'Pizzeria',
        address: '101 Main Street',
        img: 'https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 987-6543',
        content: 'The home of mouthwatering pizzas made with love. From classic margheritas to gourmet creations, we got your pizza cravings covered.'
      },
      {
        id: 3,
        name: 'Ice Cream',
        address: '393 Oak Road',
        img: 'https://images.unsplash.com/photo-1620124452520-0d9be56b29ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2824&q=80',
        number: '(555) 456-7890',
        content: 'Chill out with our creamy, dreamy ice cream. Satisfy your sweet tooth with a variety of flavors and toppings.'
      },
      {
        id: 4,
        name: 'Sub Shop',
        address: '402 Maple Boulevard',
        img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 789-1234',
        content: 'Crafted for sandwich enthusiasts, we pile on fresh ingredients between layers of bread to create the ultimate subs and hoagies.'
      },
      {
        id: 5,
        name: 'Cozy Coffee Cafe',
        address: '271 Pine Lane',
        img: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 234-5678',
        content: 'Perk up your day with aromatic coffee and artisanal brews. Pair your favorite cup of joe with delectable pastries and light bites.'
      },
      {
        id: 6,
        name: 'Sunrise Diner',
        address: '179 Meadow Drive',
        img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 876-5432',
        content: 'Step into a classic American diner experience. Our comfort food classics and friendly service will transport you back in time.'
      },
      {
        id: 7,
        name: 'Thai Spice',
        address: '5th Lakeview Drive',
        img: 'https://images.unsplash.com/photo-1580212206172-dbea2d1b64dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 312-5321',
        content: 'Thai Spice offers a tantalizing journey to Thailand with dishes bursting with authentic flavors and spices.'
      },
      {
        id: 8,
        name: 'Taqueria',
        address: '120 College Road',
        img: 'https://images.unsplash.com/photo-1606168152642-aae9b879f3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 964-1894',
        content: 'Taqueria brings the vibrant and savory taste of Mexico to your plate, serving up delicious tacos, burritos, and more.'
      },
      {
        id: 9,
        name: 'Tokyo Kitchen',
        address: '109 Elm Street',
        img: 'https://images.unsplash.com/photo-1562436356-11574662e477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
        number: '(555) 720-8024',
        content: 'Tokyo Kitchen invites you to savor the art of Japanese cuisine through expertly crafted sushi rolls and delectable dishes.'
      },
    ];

    for (const restaurant of restaurants) {
      console.log('Creating Restaurant Data:', restaurant);
      await createRestaurant(restaurant.name, restaurant.address, restaurant.img, restaurant.number, restaurant.content);
    }

    console.log('Initial Restaurant Data created successfully');
  } catch (err) {
    console.log('Error creating restaurant data:', err);
    throw err;
  }
};



async function createInitialReviews() {
  try {
    const users = await getAllUsers(); // Retrieve all users
    const restaurants= await getAllRestaurants();
    

    const reviewDataArray = [
      {
        authorId: users[0].id,
        restaurantId: 8,
        title: "Best food ever",
        content: "I would recommend to others!",
        comments: ["I definitely agree!"]
      },
      {
        authorId: users[2].id,
        restaurantId: 6,
        title: "Decent food",
        content: "Reasonable prices and pretty good food",
        comments: ["I agree with the review, food is decent but nothing you can't make at home."]
      },
      {
        authorId: users[3].id,
        restaurantId: 9,
        title: "Nice customer service",
        content:  "Had a great birthday party here",
        comments: ["I also attended a party here and it was a great space for pictures"]
      },
      {
        authorId: users[1].id,
        restaurantId: 7,
        title: "Would not go here again",
        content:  "I have had better'",
        comments:["Rude staff:("]
      },
      {
        authorId: users[0].id,
        restaurantId: 6,
        title:  "Best cheesecake ever!!!",
        content:  "You have to try their oreo cheesecake its great. Service was also amazing",
        comments:["Cheesecake is 10/10"]
      },
      {
        authorId: users[2].id,
        restaurantId: 4,
        title:"Wasn't great:(",
        content:"I've heard such great things, but I personally won't be going back",
        comments:["Waste of a datenight."]
      },
      {
        authorId: users[1].id,
        restaurantId: 3,
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



/*async function createInitialComments() {
  try {
const reviews = await getAllReviews();

const commentList = [
  {
    id: reviews[1],
    content: "I definitely agree!"
  },
  {
    id: reviews[1],
    content: "I agree with the review, food is decent but nothing you can't make at home."
  },
  {
    id: reviews[1],
    content: "I also attended a party here and it was a great space for pictures"
  },
  {
    id:reviews[1],
    content:"Rude staff:("
  },
  {
    id: reviews[1],
    content:"Cheesecake is 10/10"
  },
  {
    id: reviews[1],
    content:"Waste of a datenight."
  },
  {
    id: reviews[1],
    content:"Ashley our server was great!"
  },
];


const commentContent = commentList.map((comment) => comment.content);

    console.log('Creating Comments:', commentContent);
    await createComment(commentList);

    console.log('Comments created successfully');
  } catch (err) {
    console.log('Error creating comments');
    throw err;
  }
}
*/


const seedDatabase = async () => {
    try {
        db.connect();
        
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialRestaurants();
        await createInitialReviews();
     
       // await createInitialComments();
     
        
    }catch (err) {
      console.log("Error during seedDatabase")
        throw err;
    }
  }

    async function testDB() {
      try {
        console.log("Starting to test database...");
    
        console.log("Calling getAllUsers");
        const _users = await getAllUsers();
        console.log("Result:", _users);
    
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

