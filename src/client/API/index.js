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
