import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function PageWithMap()  {
    
    
        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                
              </div>
            </div>
          </nav>
                <div className="admin">
                <div className="datas">
                  <div className="buttons">
                    <Button className="btn" >
                     Locatie noua ambrozie
                    </Button>

                  </div>
                 
                </div>
                <div className="map1">
                  <GoogleMapForm />
                </div>

              </div>
              </div>
               
        );
    
}
export default PageWithMap;