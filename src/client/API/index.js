export async function fetchAllReviews() {
    try {
        const response= await fetch('http://localhost:3000/api/reviews');
        const result= await response.json();
        console.log('Fetched all reviews:', result);
        return result
    } catch (error) {
      console.log('Error: Unable to fetch all reviews');
    }
}

