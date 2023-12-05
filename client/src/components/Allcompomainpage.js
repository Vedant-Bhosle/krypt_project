import React ,{useEffect}from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Services from './Services'
import Transactions from './Transactions'
import Welcome from './Welcome'
import { useNavigate } from 'react-router-dom';


export default function Allcompomainpage() {
    let navigate = useNavigate();
    let jwt=localStorage.getItem('jwt');

const callAboutPage = async ()=>{
    try {
        const res=await fetch("/getcookie",{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials:"include"
        
        });


// const data= await res.json();
const cookie= res.cookies.jwt;
console.log("cookie"+cookie);
if(cookie){

}else{
    // navigate('/login');
}
// if( res.status===401){
//     window.alert("you are not logged in please log in.");
//     navigate('/login')
// }


    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
//  callAboutPage();




 
}, [])






  return (
    <div className="min-h-screen" >
    <div className="gradient-bg-welcome">
      <Navbar/>
      <Welcome/>
    
    </div>
    <Services/>
    <Transactions/>
    <Footer/>
    </div>
  )
}
