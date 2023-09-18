const db = require('./client');
const { createUser } = require('./users');

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

const dropTables = async () => {
    try {
        console.log('Dropping All Tables...');
        await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS reviews;
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
          title VARCHAR(255) UNIQUE NOT NULL,
          content TEXT NOT NULL 
        );
        `);
    }
    catch(err) {
        throw err;
    }
}

// create initial data for reviews
async function createInitialReviews() {
  try {
    console.log('Creating Initial Reviews Data...');
    await db.query(`
    INSERT INTO reviews (title, content)
    VALUES
    ('Best food ever', 'I would recommend to others!'),
    ('Decent food', 'Reasonable prices and pretty good food'),
    ('Nice customer service', 'Had a great birthday party here'),
    ('Would not go here again', 'I have had better')
    `);
  } catch (err) {
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