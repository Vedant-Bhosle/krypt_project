import React from 'react'
import LoginForm from './LoginForm';
import LoginImage from './LoginImage';
import './Login.css';
export default function Login() {
  return (
    <section >
<div className="Loginmaindiv">

<div className="Loginmaindiv2">

<div className="LoginSubdiv2">
    {/* image */}
    <LoginImage/>

</div>
<div className="LoginSubdiv1">   
    {/*form  */}
<LoginForm/>
     </div>

</div>

</div>

    </section>
  )
}
