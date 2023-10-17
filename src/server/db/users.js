const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
//this function keeps breaking
async function createUser({
    name, 
    username,
    email, 
    password='', 
    isAdmin
})
{
    try {
    
        const emailLowerCase = email.toLowerCase();
        const existingUser = await getUserByEmail(emailLowerCase);
    
        if (existingUser) {
          // User with the same email already exists
        return { message: 'User with this email already exists.' };
        }
        
        // Hash the password before inserting it into the database
        console.log('password data',password)
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        console.log('hashed pass from createUser db',hashedPassword)

        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name,username, email, password, isAdmin)
        VALUES($1, $2, $3, $4,$5)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name,username, emailLowerCase, hashedPassword, isAdmin]);
        console.log("user data from createUser db", user)
        return user;
    } catch (err) {
        console.log( 'error from register/createUser db')
        throw err;
    }
}

const getUser = async({username, password}) => {
    console.log("username and password:", password)
    if (!username || !password) {
        return;
    }
    try {
        const user = await getUserByUsername(username);
        //console.log('obtain user db from get user db:',user)
        if (!user) return;
        const hashedPassword = user.password;
        //console.log('Plaintext Password (length:', password.length, '):', password.split('').map(char => char.charCodeAt(0)));
        //console.log('Hashed Password from DB (length:', hashedPassword.length, '):', hashedPassword.split('').map(char => char.charCodeAt(0)));
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        //console.log('Do Passwords Match?', passwordsMatch);
        
        //if password stays the same and is not hashed, server will delete password and not send to db
        if (passwordsMatch) return user;
        //another area that keeps breaking
        delete user.password;
        //console.log('user from getUser:',user)
        return user;
    } catch (err) {
        throw err;
    }
}


const getUserByUsername = async(username) => {
    //console.log('Username:',username)
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT *
        FROM users
        WHERE username=$1;`, [ username ]);

    
        return user;
    } catch (err) {
        throw err;
    }
}
async function getUserIdByUsername(username) {
    console.log('getuseridbyusername:', username)
    try {
      const { rows: [ user ]  } = await db.query(`
        SELECT id
        FROM users
        WHERE username= $1
        LIMIT 1`, [username]
      );
    console.log('before error placement')
      if (!username) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that username does not exist"
        }
      }
      console.log('result of id:', username)
      return username;
    } catch (error) {
        console.log('error ')
      throw error;
    }
  }

const getUserByEmail = async(email) => {
    //console.log('email:',email)
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

    
        return user;
    } catch (err) {
        throw err;
    }
}
// async function getUserById(Id) {
//     try {
//       const { rows:  [user]  } = db.query(`
//         SELECT *
//         FROM users
//         WHERE id = $1`, [Id]);
  
//       if (!user) {
//         throw {
//           name: "UserNotFoundError",
//           message: "A user with that id does not exist"
//         }
//       }
  
//       user.posts = await getReviewByUser(Id);
  
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
async function getAllUsers() {
    try{
        const {rows}= await db.query(`
        SELECT * FROM users`);

        return rows;
    }catch(error){
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    //getUserById,
    getUserByUsername,
    getUserIdByUsername
    
    
};