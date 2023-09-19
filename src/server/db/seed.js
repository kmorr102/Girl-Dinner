const db = require('./client');
const { createUser,getAllUsers } = require('./users');
const { getAllReviews, createReview }=require('./reviews')



const dropTables = async () => {
  try {
      console.log('Dropping All Tables...');
      
      // have to make sure to drop in correct order

      await db.query(`
      DROP TABLE IF EXISTS reviews;
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
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          title VARCHAR(255) UNIQUE NOT NULL,
          content TEXT NOT NULL 
        );
        `);
    }
    catch(err) {
        throw err;
    }
}
const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    // username: 'emilyjohnson',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    // username: 'liuwei',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    // username: 'bellagracia',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    // username: 'mohammed101',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    // username: 'johnnysmith',
    password: 'password123',
  },
  {
    name: 'Jeff Buckley',
    email: 'jeffb@example.com',
    // username: 'jeffb123',
    password: 'mynameisjeff',
  },
  {
    name: 'Mario Maria',
    email: 'mariom@example.com',
    // username: 'mrmario',
    password: 'maria724',
  }
  // Add more user objects as needed
];  

const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser({id: user.id, name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

async function createInitialReviews() {
  try {
    for(const user of users) await getAllUsers();
    console.log('Creating Initial Review Data...');
    await createReview({
      authorId: users.id,
      title: "Best food ever",
      content: "I would recommend to others!",
    });
    await createReview({
      authorId: users.id,
      title: "Decent food",
      content: "Reasonable prices and pretty good food",
    });
    await createReview({
      authorId: users.id,
      title: "Nice customer service",
      content: "Had a great birthday party here",
    });
    await createReview({
      authorId: users.id,
      title: "Would not go here again",
      content: "I have had better'",
    });
    await createReview({
      authorId: users.id,
      title: "Best cheesecake ever!!!",
      content: "You have to try their oreo cheesecake its great. Service was also amazing",
    });
    await createReview({
      authorId: users.id,
      title: "Wasn't great:(",
      content: "I've heard such great things, but I personally won't be going back",
    });
    await createReview({
      authorId: users.id,
      title: "Look no further!",
      content: "They have the best ice in town! If you know, you know.",
    });

    console.log('Initial Review Data created successfully')
  } catch (err) {
    console.log('Error creating review data')
    throw err;
  }
}




const seedDatabase = async () => {
    try {
        db.connect();
        
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialReviews();
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

