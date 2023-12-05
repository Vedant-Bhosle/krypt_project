import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import Transactions from './components/Transactions'
import Footer from './components/Footer'
import Services from './components/Services'
import Allcompomainpage from './components/Allcompomainpage'
import Signup from './components/signup/Signup'
import Login from './components/Login/Login'
import Errorpage from './components/templates/Errorpage'
import TempNavbar from './components/templates/TempNavbar'
import Testing from "./components/templates/Testing";
// import Temparorywelcome from './components/ Temparorywelcome'

function App() {
  return (
    <div  >
    {/* <div className="gradient-bg-welcome">
      <Navbar/>
      <Welcome/>
    
    </div>
    <Services/>
    <Transactions/>
    <Footer/> */}
    {/* <Allcompomainpage/> */}
    {/* <Signup/> */}
    {/* <Login/> */}
    {/* <Errorpage/> */}

    {/* <TempNavbar/> */}

   <BrowserRouter>
     <Routes>

      <Route path="/"  element={<Testing />}/>
      <Route path="/home" exact element={<Allcompomainpage />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/signup" exact element={<Signup />}/>


      
         {/* <Route path="home" element={<Allcompomainpage />}>

           <Route path="login" element={<Login />} /> 
          <Route path="signup" element={<Signup />} />

          
        </Route> 
      </Route>
 */}

      
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
