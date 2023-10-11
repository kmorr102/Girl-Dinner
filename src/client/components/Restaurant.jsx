import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllRestaurants } from "../API";
import { fetchAllReviews } from "../API";
//import { getRestaurantById } from "../../server/db/restaurants";

const tokenString = sessionStorage.getItem("authToken");

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
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
      
/* useEffect(() => {
    fetch('/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.restaurants);
        console.log('restaurant:',  data.restaurants)
        
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [])
*/
  useEffect(()=>{
    
  })

  const { restaurantid }= useParams();

  useEffect(()=>{
  async function getRestaurantById(){
    const response= await fetch(`http://localhost:3000/api/restaurants/${restaurantid}`);
    if(response){
      const data= await response.json();
      console.log('id:',data.id)
      setRestaurant(data)
      console.log( 'data:', data)
    }else{
      setError(response)
      console.log('error:', error)
    }
  }

getRestaurantById();
}, [restaurantid])



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
      
    {/* Check if the restaurant data is available before displaying */}
    {restaurant && (
      <div key={restaurant.id} className="displayedRestaurant">
        <h1>{restaurant.name}</h1>
        <img src= {restaurant.img} alt="restaurant picture"  style={{
                  maxWidth: '100%',
                  maxHeight: '100vh', 
                  width: 'auto', 
                  height: 'auto', 
                  objectFit: 'cover',
                }} />
            <h3>{restaurant.content}</h3>
            <p>{restaurant.address}</p>
            <p>{restaurant.number}</p>
        {review.map((review)=>(
          <div key={review.id}>
          <p>Top Reviews: {review.title}</p>
          <p>{review.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
   
  );
}   
