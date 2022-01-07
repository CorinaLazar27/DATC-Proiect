
import React,{useState} from "react";


import { useHistory } from "react-router-dom";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function HistoryPage()  {

  const history = useHistory();
     const [nrlocatii, setNrLocatii] = useState("");
     const [nrutilizatori, setNrUtilizatori] = useState("");
  const numarLocatii= async()=>
  {
    
    axios.get('/request')
    .then((response) => {
                console.log(response.data);
            
              console.log(response.data.length);
              setNrLocatii(response.data.length);
                      }

                    
                    
    );}
    const numarUtilizatori= async()=>
  {
    
    axios.get('/user')
    .then((response) => {
                console.log(response.data);
            
              console.log(response.data.length);
              setNrUtilizatori(response.data.length);
                      }

                    
                    
    );}
    
        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" >AMBROZIA</Link>
             
              </div>
            </nav>
         
               <h3>Detalii</h3>

               <div className="details">
                 <label>Ambrozia zones:</label>
                 <input type="text" className="nr-zones" placeholder=" " value={nrlocatii}/>
                 <button className="btn-locations" onClick={() => numarLocatii()}>Get number of locations!</button>
               </div>
               <div className="details">
                 <label>Total users</label>
                 <input type="text" className="nr-users" placeholder=" " value={nrutilizatori}/>
                 <button className="btn-user" onClick={() => numarUtilizatori()}>Get number of users!</button>
               </div>
               <button onClick={()=>history.push("/map")}>Back to map</button>
               </div>
        );
    
}
export default HistoryPage;