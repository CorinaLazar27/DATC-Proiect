import React from "react";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function HistoryPage()  {
    
        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                 
                </div>
              </div>
            </nav>
         
               <h3>ISTORIC</h3>
               
       
               </div>
        );
    
}
export default HistoryPage;