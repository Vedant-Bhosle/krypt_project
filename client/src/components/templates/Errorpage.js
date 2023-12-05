import React from 'react'
import './ErrorPage.css';
export default function Errorpage(props) {
  return (
    <div className="errormaindiv">
        <div className="textdiv">
            <h1 className="errorpageheading">{props.msg}Something went wrong please refresh site</h1>
        </div>
        
        </div>
  )
}
