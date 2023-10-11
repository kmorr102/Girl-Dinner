import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllRestaurants } from "../API";

const tokenString = sessionStorage.getItem("authToken");

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);
  const [number, setNumber] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthor, setIsAuthor] = useState("");

  
  

  useEffect(() => {
    fetch('/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.restaurants);
        
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const restaurantsToDisplay= searchParams
  ? restaurants.filter(restaurants=>restaurants.name.toLowerCase().includes(searchParams.toLowerCase()))
  : restaurants;

  return (
    <div className="Restaurant">
      <div id="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/CreateReview"}>Write a Review</Link>
        <Link to={"/Profile"}>Profile</Link>
        <Link to={"/Logout"}>Logout</Link>
      </div>
     
      <div className='search-bar'>
          <label>
            Search:{''}
            <input type='text' placeholder='Search' onChange={(e)=> setSearchParams(e.target.value)}/>
          </label>
      </div>

         
        <div>
    
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="displayedRestaurant">
            <h1>Name: {restaurant.name}</h1>
            <Link to={`/restaurants/${restaurant.id}`}>View Details</Link>
          </div>
        ))}
    
      </div>
    </div>
  );
}
