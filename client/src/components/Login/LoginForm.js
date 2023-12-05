import React,{useState} from 'react'
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
export default function LoginForm() {
let navigate = useNavigate();
  const [email, setemail] = useState("second")
  const [password, setpassword] = useState("second")
  
  const LoginUser=async(e)=>{
      e.preventDefault();
  
      if (e.keyCode == 13) {
          e.preventDefault();
      }
      const res = await fetch("/login", {
  
        method: "POST",
        headers: { "Content-Type": "application/json" },
  
        body: JSON.stringify({
        
          email,
          
          password
          
        }),
      });
  
      const data=await res.json();
  
      if(data.status=== 400 || !data){
        window.alert("Invalid credintials")
        console.log("Invalid credentials");
      }
      else{
        console.log(data);
        window.alert("Login SUCCESSFUL")
        console.log("Login Successful");
        navigate('/home')
      }
      console.log("form is automatically submitted");
  }
  

  return (
    <div>
       <h1 className="LoginFormheading">Sign In</h1>
<form action="">
      <div className="Loginforminput">
        
        <input type="email" name="email" onChange={(e)=>setemail(e.target.value)}  onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                    }} className="Logininpsameclass" placeholder="Your Email"/>

        <input type="password" name="password" onChange={(e)=>setpassword(e.target.value)} className="Logininpsameclass" placeholder="Password"/>

      
        <input type="submit" onClick={LoginUser} className="Loginsubmit" />
      </div>
      </form>
     
     <button className="backtohomebtn"><NavLink to="/home">&#x21aa; Back to Home</NavLink></button>
    </div>
  )
}
