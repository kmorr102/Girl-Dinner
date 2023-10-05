const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;


async function Secure(){
    try {
        const hashedPassword= await bcrypt.hash(user.password,SALT_COUNT);
        user.password=hashedPassword;
    } catch (error) {
}
};

const createUser = async({ 
    name='first last',
    email='john@example.com',
    hashedPassword='hashedpass',
    isAdmin,
}) => {
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password, isAdmin)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, isAdmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
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
async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT id, name, email, password
        FROM users
        WHERE id=${ userId }
      `);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }
  
      user.posts = await getReviewByUser(userId);
  
      return user;
    } catch (error) {
      throw error;
    }
  }
async function getAllUsers() {
    try{
        const {rows}= await db.query(`
        SELECT id,name,username,email,password,isAdmin FROM users`);

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
    getUserById,
    Secure
    
};