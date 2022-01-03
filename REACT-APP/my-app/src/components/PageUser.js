import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";




export function PageUser()  {
  const history = useHistory();
  function HistoryClick() {
   
   console.log("Try to history:");
   history.push("/historypage")

 }
 function LogOutClick() {
  history.push("/sign-in");
}
    
        return (

          <div className="App">
              
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
              <button className="btn-logout" onClick={()=>LogOutClick()}>Logout</button>
            </div>
          </nav>
         
          <div className="map1">
            <GoogleMapForm />
            <button onClick={() => window.location.reload(false)}>Click to refresh map!</button>
          </div>
       
        </div>
      
        
        
        );
    
}
export default PageUser;