import React from 'react'
import RegisterationForm from './RegisterationForm';
import Signupimage from './Signupimage';
import './TempSignup.css';
export default function Signup() {
  return (
    <section >
<div className="Signupmaindiv">

<div className="Signupmaindiv2">

<div className="SignupSubdiv1">
    {/* form */}
<RegisterationForm/>

</div>
<div className="SignupSubdiv2">   
    {/*image  */}
    <Signupimage/>
     </div>

</div>

</div>

    </section>
  )
}
