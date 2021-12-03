import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";

export function PageUser()  {
    
    
        return (
                <div className="user">
                <div className="map">
                  <GoogleMapForm />
                </div>
              </div>
               
        );
    
}
export default PageUser;