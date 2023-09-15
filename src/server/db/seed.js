const db = require('./client');
const { createUser } = require('./users');


const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    username: 'emilyjohnson',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    username: 'liuwei',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    username: 'bellagracia',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    username: 'mohammed101',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    username: 'johnnysmith',
    password: 'password123',
  },
  {
    name: 'Jeff Buckley',
    email: 'jeffb@example.com',
    username: 'jeffb123',
    password: 'mynameisjeff',
  },
  {
    name: 'Mario Maria',
    email: 'mariom@example.com',
    username: 'mrmario',
    password: 'maria724',
  }
  // Add more user objects as needed
];  
 // have to make sure to drop in correct order
const dropTables = async () => {
    try {
        console.log("Starting to drop tables...")
        await db.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS users;
        `)
      
    
      console.log("Finished dropping tables!");
    } catch(err) {
      console.log("Error dropping tables!")
        throw err;
    }
}

const createTables = async () => {
    try{
        console.log("Starting to build tables...")
        await db.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
      );

      CREATE TABLE Reviews (
        id SERIAL PRIMARY KEY,
        "authorId" INTEGER REFERENCES users(id),
        title varchar(255) NOT NULL,
        content TEXT NOT NULL,
      );

      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
      );

      CREATE TABLE review_comments (
        "reviewId" INTEGER REFERENCES review(id),
        "commentId" INTEGER REFERENCES comments(id),
        UNIQUE ("reviewId", "commentsId"),
      );
    `)
        
          console.log("Finished building tables!")
        }catch(err) {
          console.log("Error building tables!")
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};
async function createInitialReviews() {
  try {
    const response = await insertUsers();

    console.log("Starting to create posts...");
    await createReview({
      authorId: albert.id,
      title: "First Post",
      content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
      tags: ["#happy", "#youcandoanything"]
    });

    await createReview({
      authorId: sandra.id,
      title: "How does this work?",
      content: "Seriously, does this even do anything?",
      tags: ["#happy", "#worst-day-ever"]
    });

    await createReview({
      authorId: glamgal.id,
      title: "Living the Glam Life",
      content: "Do you even? I swear that half of you are posing.",
      tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
    });
    console.log("Finished creating posts!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}
 
const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await createInitialReviews();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabase()
