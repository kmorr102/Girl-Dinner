import { useEffect, useState } from "react";


export default function CreateReview(){
    const tokenString = sessionStorage.getItem("authToken");
    console.log('token from login(storage):', tokenString)
    

    const [reviews, setReviews]= useState('');
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [error, setError]= useState(null);
    const [searchParams, setSearchParams]= useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAuthor, setIsAuthor]= useState('')

    async function handleSubmit(e){
        e.preventDefault();
    
        /*if(!tokenString) {
          setError("You must have an account to make a post. Login or create an account to add review.")
          console.log('error message if no token')
          return;
        }*/
      
        try {
          //console.log('at the start of try block')
          const response= await fetch('http://localhost:3000/api/reviews',
          {
            method: 'POST',
            headers: {
                      'Content-Type': 'application/json',
                      //'Authorization': `Bearer ${tokenString}`
                    },
            body: JSON.stringify({
                      title,
                      content
          })
        });
          const result = await response.json();
          console.log('result:', result)
          return result;
        } catch (error) {
          console.error('error creating post')
          return{success: false, error: error.message};
          
        }
      }
      return (
        <div className='createReview'>
          <h1>Write Review</h1>
          <form onSubmit={handleSubmit}>
            <label>Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Review:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <br />
            <button>Submit Review</button>
          </form>
          
          {successMessage && <div>{successMessage}</div>}
          {error && <div>{error}</div>}
        </div>
      );
    }
    
    
    
    
    
    