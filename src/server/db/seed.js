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



const dropTables = async () => {
    try {
        console.log('Dropping All Tables...');

        // have to make sure to drop in correct order

        await db.query(`
        DROP TABLE IF EXISTS review_comments;
        DROP TABLE IF EXISTS comments;
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
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) UNIQUE NOT NULL,
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
        content varchar(255) UNIQUE NOT NULL
        );
      
      CREATE TABLE review_comments (
        "reviewId" INTEGER REFERENCES reviews(id),
        "commentId" INTEGER REFERENCES comments(id),
        UNIQUE ("reviewId", "commentId")
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
    // username: 'emilyjohnson',
    password: 'securepass',
    isAdmin: false,
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    // username: 'johnnysmith',
    password: 'password123',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Jeff Buckley',
    email: 'jeffb@example.com',
    // username: 'jeffb123',
    password: 'mynameisjeff',
    isAdmin: true,
  },
  {
    id: 4,
    name: 'Mario Maria',
    email: 'mariom@example.com',
    //username: 'mrmario',
    password: 'maria724',
    isAdmin: true,
  }
  // Add more user objects as needed
];  

const createInitialUsers = async () => {
  try {
    console.log("Starting to create users...")
    for (const user of users) {
      await createUser({id: user.id, name: user.name, email: user.email, password: user.password, isAdmin: user.isAdmin});
    }
   
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!', error);
  }
};

async function createInitialReviews() {
  try {
    for (const user of users) {
      console.log('Creating Initial Review Data for User:', user.name);
      
      // Call createReview with individual arguments
      await createReview(
        user.id,
        "Best food ever",
        "I would recommend to others!",
        ["I definitely agree!"]
      );

      await createReview(
        user.id,
        "Decent food",
        "Reasonable prices and pretty good food",
        ["I agree with the review, food is decent but nothing you can't make at home."]
      );
      await createReview(
        user.id,
        "Nice customer service",
        "Had a great birthday party here",
        ["I also attended a party here and it was a great space for pictures"]
      );
      await createReview(
        user.id,
        "Would not go here again",
        "I have had better'",
        ["A server yelled at me :("]
      );
      await createReview(
        user.id,
        "Best cheesecake ever!!!",
        "You have to try their oreo cheesecake its great. Service was also amazing",
        [ "Cheesecake is a 10/10"]
      );
      await createReview(
        user.id,
        "Wasn't great:(",
        "I've heard such great things, but I personally won't be going back",
        ["Waste of a datenight."]
      );
      await createReview(
        user.id,
        "Look no further!",
        "They have the best ice in town! If you know, you know.",
        ["Ashley our server was great!"]
      );
      // Add more review entries as needed for this user
      
      console.log('Initial Review Data created successfully for User:', user.name);
    }
  } catch (err) {
    console.log('Error creating review data');
    throw err;
  }
}


/*async function createInitialReviews() {
  
  try {   
   for( const user of users) await getAllUsers();
    console.log('Creating Initial Review Data...');
    
    await createReview({
      authorId: users.id,
      title: "Best food ever",
      content: "I would recommend to others!",
      comments: ["I definitely agree!"]
    }),
    await createReview({
      authorId: 2,
      title: "Decent food",
      content: "Reasonable prices and pretty good food",
      comments:[ "I agree with the review, food is decent but nothing you can't make at home."]
    }),
    await createReview({
      authorId: 3,
      title: "Nice customer service",
      content: "Had a great birthday party here",
      comments: ["I also attended a party here and it was a great space for pictures"]
    }),
    await createReview({
      authorId: 4,
      title: "Would not go here again",
      content: "I have had better'",
      comments: ["A server yelled at me :("]
    }),
    await createReview({
      authorId: 2,
      title: "Best cheesecake ever!!!",
      content: "You have to try their oreo cheesecake its great. Service was also amazing",
      comments:[ "Cheesecake is a 10/10"]
    }),
    await createReview({
      authorId: 1,
      title: "Wasn't great:(",
      content: "I've heard such great things, but I personally won't be going back",
      comments: ["Waste of a datenight."]
    }),
    await createReview({
      authorId: 3,
      title: "Look no further!",
      content: "They have the best ice in town! If you know, you know.",
      comments: ["Ashley our server was great!"]
    })

   
    console.log('Initial Review Data created successfully')
  } catch (err) {
    console.log('Error creating review data')
    throw err;
  }
};*/





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

        console.log("Calling getAllComments");
        const allComments= await getAllComments();
        console.log ("Result:", allComments)
    
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

