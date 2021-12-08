import React from "react";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function HistoryPage()  {
    
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
         
               <h3>ISTORIC</h3>

               <div className="history">
                 <label>Zone Validate:</label>
                 <input type="text" className="history-validated" placeholder="Aici o sa apara zonele validate"/>
               </div>
               <div className="history">
                 <label>Zone Nevalidate:</label>
                 <input type="text" className="history-unvalidated" placeholder="Aici o sa apara zonele nevalidate"/>
               </div>
               <div className="history">
                 <label>Total:</label>
                 <input type="text" className="history-total" placeholder="Totalul zonelor noi"/>
               </div>
       
               </div>
        );
    
}
export default HistoryPage;