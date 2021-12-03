import React from "react";
import GoogleMapForm from "./GoogleMapForm";
import { Button } from "@material-ui/core";

export function PageWithMap()  {
    
    
        return (
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
               
        );
    
}
export default PageWithMap;