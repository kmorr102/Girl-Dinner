const db = require('./client');

// GET - /api/reviews to fetch all reviews
async function getAllReviews() {
    try {
      const { rows: reviews } = await db.query(`
      SELECT
        reviews.id AS id,
        reviews."authorId" AS authorId,
        reviews.restaurant_id AS restaurantId,
        reviews.title AS title,
        reviews.content AS content,
        comments.id AS comment_id,
        comments.comment AS comment_text
      FROM
        reviews
      LEFT JOIN
        review_comments AS reviewscomments ON reviews.id = reviewscomments."reviewId"
      LEFT JOIN
        comments AS comments ON reviewscomments."commentId" = comments.id;
    `);
    
       
    return reviews;
    } catch (error) {
        throw error; 
    }
}

// GET - /api/reviews/:id to fetch single review by id
async function getReviewById(reviewId) {
    try {
        const { rows: [review] }= await db.query(`
        SELECT * 
        FROM reviews
        WHERE id=$1;`,[reviewId]);
        //return rows[0];

        if(!review){
            throw{
                name:"ReviewNotFoundError",
                message: "Could not find a review with that reviewId"
            };
        } 
        const { rows: comments }=await db.query(`
            SELECT comments. *
            FROM comments
            JOIN review_comments ON comments.id=review_comments."commentId"
            WHERE review_comments."reviewId" = $1;
            `, [reviewId])
    

        const { rows: [author] }= await db.query(`
            SELECT id,name,email,isAdmin
            FROM users
            WHERE id=$1;
        `, [review.authorId])

        review.comments= comments;
        review.author=author;

        delete review.authorId;
        
        return review;
    } catch (error) {
        console.error('Error with retrieving review by ID', error);
        throw error;
    }
}

async function createReview(reviewData) {
  try {
    const {authorId, title, content} = reviewData;
  
    //console.log('Author ID:', authorId);
    console.log('Title:', title);
    console.log('Content:', content);
    //console.log('Comments:', comments);
  // Check if a review with the same authorId, title, and content exists
  const { rows: [existingReview] } = await db.query(
    `
    SELECT * FROM reviews
    WHERE "authorId"=$1 AND title = $2 AND content = $3;
    `,
    [ authorId, title, content]
  );
  if (existingReview) {
    // An existing review was found, you can choose to update it here
    console.log('Review already exists. Updating...');
    return existingReview;
  } else {
    // No existing review found, create a new one
    const { rows: [review] } = await db.query(
      `
      INSERT INTO reviews ("authorId",title, content)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [ authorId, title, content]
    );
   // const commentList = await createComment(comments);
    //return await addCommentsToReview(review.id, commentList);
  }
} catch (error) {
  throw error;
}
}


// DELETE - /api/reviews/:id - delete a review by id
async function deleteReview(id) {
  try {
    // checking if there's an associated review_comments data
    const { rows: [review] } = await db.query(`
      SELECT * FROM reviews
      WHERE id = $1;
    `, [id]);

    if (!review) {
      throw {
        name: "ReviewNotFoundError",
        message: "Unable to find a review with that id",
      };
    }

    // If there is, delete the associated review_comments data
    await db.query(`
      DELETE FROM review_comments
      WHERE "reviewId" = $1;
    `, [id]);

    // Deleting review 
    const { rows: [deletedReview] } = await db.query(`
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return deletedReview;
  } catch (error) {
    throw error;
  }
}

//EDIT REVIEW 

async function updateReview(reviewId, fields){
  const {title, content}=fields;
  
  console.log("title:", title)
  console.log('Content:', content);

  if( !title && !content) {
    throw new Error('At least one, title or content must be provided for update')
  }
  const updateFields= [];

  if(title) {
    updateFields.push(`title= '${title}'`);
  }

  if(content) {
    updateFields.push(`content= '${content}'`);
  }
  try {
    if(updateFields.length > 0) {
      const query= (`
        UPDATE reviews
        SET ${updateFields.join(',')}
        WHERE id=$1
        RETURNING *;
      `);
    const values=[reviewId];
    const { rows }= await db.query(query,values);
    if (rows.length ===0) {
      throw new Error('Review with id ${reviewId} not found.');
    }
  
    return rows[0];
    }
  } catch (error) {
  }
};


async function getReviewByUser(userId) {
    try {
        const { rows: reviewIds } = await db.query(`
        SELECT id
        FROM reviews
        WHERE "authorId"= ${userId};
        `)

        const reviews = await Promise.all(reviewIds.map(
            review => getReviewById(review.id)
        ));

        return reviews;
    } catch (error) {
      throw error;
    }
}

async function createComment(commentList) {
  // Filter out invalid comments (null or empty)
  const validComments = commentList.filter(comment => comment.comment && comment.comment.trim() !== '');

  if (validComments.length === 0) {
    // No valid comments to insert
    return;
  }

  try {
    const placeholders = validComments.map((comment, index) => `($${index + 1})`).join(',');
    const values = validComments.map(comment => comment.comment);

    const query = `
      INSERT INTO comments (comment)
      VALUES ${placeholders}
      ON CONFLICT (comment) DO NOTHING
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
}


/*const createComment = async (commentList) => {
  if (commentList.length === 0) {
    return;
  }

  // Create an array of parameterized query placeholders
  const placeholders = commentList.map((comment, index) => `($${index + 1})`).join(',');
  const values = commentList.map(comment => comment.comment);

  try {
    const query = `
      INSERT INTO comments (comment)
      VALUES (${placeholders})
      ON CONFLICT (comment) DO NOTHING
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
};



/*async function createComment(commentList) {
  if (commentList.length === 0) {
    return;
  }

  try {
    const placeholders = commentList.map((comment, index) => `($${index + 1})`).join(',');
    const values = commentList.map(comment => comment.comment);

    if (values.length === 0) {
      // No valid comments to insert
      return;
    }

    const query = `
      INSERT INTO comments (comment)
      VALUES ${placeholders}
      ON CONFLICT (comment) DO NOTHING
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
}

    */
  
  
  

async function createReviewComment(reviewId, commentId) {
    try {
        await db.query(`
        INSERT INTO review_comments("reviewId", "commentId")
        VALUES ($1,$2)
        ON CONFLICT ("reviewId", "commentId") DO NOTHING;
        `, [reviewId, commentId]);
    } catch (error) {
      throw error;
    }
}

async function addCommentsToReview(reviewId,commentList) {
    try {
        const createReviewCommentPromise= commentList.map(
            comment => createReviewComment(reviewId,comment.id)
        );

        await Promise.all(createReviewCommentPromise);

        return await getReviewById(reviewId);
    } catch (error) {
      throw error;
    }
}



async function getAllComments(){
    try {
        const  {rows} = await db.query(`
        SELECT * FROM comments
        `);

        return { rows }
    } catch (error) {
      throw error;
    }
}



async function getCommentById(commentId){
  try {
    const { rows: [comment] } = await db.query(`
    SELECT * 
    
    FROM 
    comments
    
    WHERE id=$1`,[commentId]);

  if(!comment){
    throw{
        name:"CommentNotFoundError",
        message: "Could not find a review with that id"
    };
} 
  return comment;
  } catch (error) {
    console.error('Error with retrieving comment by ID', error);
    throw error;
  }
}


//DELETE comments 
async function deleteCommentsById(commentId){
  try {
    await db.query(`
      DELETE FROM review_comments
      WHERE "commentId"=$1
      `, [commentId]
    );
    const {rows: [comment] } = await db.query(`
    DELETE FROM comments
    WHERE id=$1
    RETURNING *
    `, [commentId]
  );
  return comment;
  } catch (error) {
    throw error;
  }
}
module.exports = {
    getAllReviews,
    createReview,
    deleteReview,
    updateReview,
    getReviewById,
    getReviewByUser,
    getAllComments,
    createComment,
    createReviewComment,
    addCommentsToReview,
    getCommentById,
    deleteCommentsById
    
}