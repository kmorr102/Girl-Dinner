export async function fetchAllReviews() {
    try {
        const auth = sessionStorage.getItem("authToken");
        const response= await fetch('http://localhost:3000/api/reviews', {
        headers: {
          "Content-Type": "application/json",
         // "Authorization": `Bearer ${auth}`, breaks code for now if uncommented 
      },
    });
        const result= await response.json();
        console.log('Fetched all reviews:', result.reviews);
        return result.reviews;
    } catch (error) {
      console.log('Error: Unable to fetch all reviews');
    }
}

export async function createReview() {
  const response= await fetch ('http://localhost:3000/api/reviews',
  {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      review: addReview,
    }),
  })
  const result= await response.json()
  const newReview= result.data //
  return newReview
}
  
// Registering a new user
export async function fetchNewUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${email}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
// Fetch login, authenticating a user if their username and password mathes the right data
export async function fetchLogin(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${email}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

