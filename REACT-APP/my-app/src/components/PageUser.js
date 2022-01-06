import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import * as locations from "../locations.json";

import axios from "axios";
import fs from 'fs';
export function PageUser()  {

 
  const loadLocation= async()=>
  {
    var app = window.require('electron').remote;
    const fs = app.require('fs');
    const path = "./locations.json";
    var json = {
      "foo":"bar",
      "bar":"none"
  }
    axios.get('/request')
    .then((response) => {
                console.log(response.data);
            try{
               fs.writeFile(path,json);}
               catch (err) {
                throw err;
              }
                for (var i=0; i <response.data.length; i++)
            {
  
                  
                  console.log(response.data[i].partitionKey);
                  console.log(response.data[i].rowKey);
                  
            }
              console.log(response.data.length);
            
                      }

                    
                    
    );
    
    
  }
  const history = useHistory();
  


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
            <GoogleMapForm 
             
            />
           <button onClick={() => window.location.reload(false)}>Click to refresh map!</button>
           <button onClick={() => loadLocation()}>Click to load locations with ambrosia!</button>
          </div>
       
        </div>
      
        
        
        );
    
}
export default PageUser;