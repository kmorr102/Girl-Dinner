import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllRestaurants } from "../API";
import { fetchAllReviews } from "../API";

const tokenString = sessionStorage.getItem("authToken");

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [review, setReview]=useState([]);
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
        console.log('restaurant:',  data.restaurants)
        
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [])

  useEffect(()=>{
    
  })

  useEffect (() => {
    async function getAllReviews() {
        const response = await fetchAllReviews('http://localhost:3000/api/reviews'); 
        if(response) {
          console.log("response:",response)
          setReview(response);
        }else{
          setError(response);
        }
    }
    getAllReviews();
  }, []);


  return (
    <div className="Restaurant">
      <div id="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/CreateReview"}>Write a Review</Link>
        <Link to={"/Profile"}>Profile</Link>
        <Link to={"/Logout"}>Logout</Link>
      </div>
         
      <div>
    
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="displayedRestaurant">
            <h1> {restaurant.name}</h1>
            <img src= {restaurant.img} alt="restaurant picture"  style={{
                  maxWidth: '100%',
                  maxHeight: '100%', 
                  width: 'auto', 
                  height: 'auto', 
                  objectFit: 'cover',
                }} />
            <h3>{restaurant.content}</h3>
            <p>{restaurant.address}</p>
            <p>{restaurant.number}</p>
        {review.map(()=>(
          <div>
          <p>Top Reviews: {review.title}</p>
          <p>{review.content}</p>
          </div>
        ))}
         
      </div>
    
        ))}
    
        </div>
    
    </div>
  );
}   
