import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export function PageWithMap()  {
    
     const history = useHistory();
     function HistoryClick() {
      
      console.log("Try to history:");
      history.push("/historypage")

    }
    function NewZonesClick() {
      
      console.log("Try to newzone:");
      history.push("/newzones")

    }
        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/mapuser"}>User Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/map"}>Admin</Link>
                  </li>
                  </ul>
              </div>
            </div>
          </nav>
    
                <div className="admin">
                <div className="datas">
                  <div className="buttons">
                    <Button className="btn" onClick={() => NewZonesClick()} >
                     Locatii noi ambrozie
                    </Button>
                    <Button className="btn" onClick={() => HistoryClick()} >
                     Istoric
                    </Button>
                  </div>
                 
                </div>
                <div className="map1">
                  <GoogleMapForm />
                  <button onClick={() => window.location.reload(false)}>Click to refresh map!</button>
                </div>

              </div></div>
              
               
        );
    
}
export default PageWithMap;