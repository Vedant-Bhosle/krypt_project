import React,{useState} from 'react'

export default function LoginPage() {
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
    }
    console.log("form is automatically submitted");
}

  return (
    <div>
        {/* <div>
            <form method="POST">
                <input type="email" name="email" placeholder="email" onChange={(e)=>setemail(e.target.value)}  onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                    }} />
                <br />
                <input type="password" name="password" placeholder="password" onChange={(e)=>setpassword(e.target.value)} />
                <br /><br />
                <input type="submit" onClick={LoginUser} />
            </form>
        </div> */}


<h1>hello</h1>

    </div>
  )
}
