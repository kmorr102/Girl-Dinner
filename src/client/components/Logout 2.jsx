import { useNavigate } from "react-router-dom";
export default function Logout(){
  
const Navigate = useNavigate();
 
setTimeout(()=>{
    
        Navigate("/");
      }, 1000)
    
      
}