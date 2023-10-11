import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data.restaurant);
        console.log('result:', data.restaurant)
        
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id])

  if (loading) {
    // Display a loading indicator while waiting for the fetch to complete.
    return <div>Loading...</div>;
  }

  if (restaurant) {
    return (
      <div>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.content}</p>
        {/* Add more details about the restaurant */}
      </div>
    );
  } else {
    // Handle the case where the restaurant with the specified ID is not found.
    return <div>Restaurant not found</div>;
  }
}

export default RestaurantDetail;
