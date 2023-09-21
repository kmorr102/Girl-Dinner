export async function fetchAllReviews() {
    try {
        const response= await fetch('http://localhost:3000/api/reviews', {
        headers: {
          "Content-Type": "application/json"
      },
    });
        const result= await response.json();
        console.log('Fetched all reviews:', result);
        return result.reviews;
    } catch (error) {
      console.log('Error: Unable to fetch all reviews');
    }
}

// Registering a new user
export async function fetchNewUser(username, password) {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
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
