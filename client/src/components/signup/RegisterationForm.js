import React,{useState} from "react";
import "./RegisterationForm.css";
import { NavLink } from "react-router-dom";
import {useNavigate}from 'react-router-dom'
export default function RegisterationForm() {
 let navigate= useNavigate();
  const [user, setuser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInupts = (e) => {
    
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, phone, password, cpassword } = user;

    if (password !== cpassword) {
      return alert("Password and Confirm-password must be same");
    }

  

    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        fname,
        lname,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data=await res.json();

    if(data.status=== 500 || !data){
      console.log(data);
      window.alert("INVALID REGISTERATION")
      console.log("Invalid Registration");
    }
    else{
      console.log(data);
      window.alert("REGISTERATION SUCCESSFUL")
      console.log("Registeration Successful");
      navigate('/login');
    }
  };





  return (
    <div>
      <h1 className="SignupFormheading">Sign up</h1>
<form method="POST">
      <div className="forminput">

        <input type="text" name="fname"  value={user.fname}
            onChange={handleInupts} className="registerinpsameclass" placeholder="Enter Your First Name"/>

        <input type="text" name="lname"  value={user.lname}
            onChange={handleInupts} className="registerinpsameclass" placeholder="Enter Your Last Name"/>

        <input type="email" name="email"  value={user.email}
            onChange={handleInupts} className="registerinpsameclass" placeholder="Enter Your Email"/>

        <input type="phone" name="phone"  value={user.phone}
            onChange={handleInupts} className="registerinpsameclass" placeholder="Enter Your Mobile Number"/>

        

        <input type="password" name="password" className="registerinpsameclass"  value={user.password}
            onChange={handleInupts} placeholder="Enter Password"/>

        <input type="password" name="cpassword" className="registerinpsameclass"  value={user.cpassword}
            onChange={handleInupts} placeholder="Enter Confirm password"/>

        <input type="submit"  onClick={postData} className="signupsubmit" />
      </div>
      </form>
      <button className="backtohomebtn"><NavLink to="/home">&#x21aa; Back to Home</NavLink></button>
    </div>
  );
}
