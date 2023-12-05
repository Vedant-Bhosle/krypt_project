import React from 'react'
import loginimage from '../../images/loginimage.svg'
import './LoginImage.css';
export default function LoginImage() {
  return (
    <div>
<img src={loginimage} className="loignsvgimage" alt="image not found" />
    </div>
  )
}