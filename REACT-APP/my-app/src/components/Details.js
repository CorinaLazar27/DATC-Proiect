
import React,{useState} from "react";


import { useHistory } from "react-router-dom";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function Details()  {

  const history = useHistory();
     const [nrlocatii, setNrLocatii] = useState("");
     const [nrutilizatori, setNrUtilizatori] = useState("");

     const numarLocatiiFunctie= async()=>
  {
    numarLocatii();
    axios.get('https://apiambrosia.azurewebsites.net/historic')
    .then((response) => {
                console.log(response.data);
            
              console.log(response.data[response.data.length-1].count);
             setNrLocatii(response.data[response.data.length-1].count);
                      }

                    
                    
    );}
    const numarUtilizatoriFunctie= async()=>
    {
      numarUtilizatori();
      axios.get('https://apiambrosia.azurewebsites.net/numberofusers')
      .then((response) => {
                console.log(response.data);
                console.log(response.data[response.data.length-1].count);
              
                setNrUtilizatori(response.data[response.data.length-1].count);
                        }
  
                      
                      
      );}
  const numarLocatii= async()=>
  {
    
    axios.get('https://apiambrosia.azurewebsites.net/request')
    .then((response) => {
               console.log(response.data);
            
              console.log(response.data.length);
              setNrLocatii(response.data.length);
                      }

                    
                    
    );}
    const numarUtilizatori= async()=>
  {
    
    axios.get('https://apiambrosia.azurewebsites.net/user')
    .then((response) => {
             //   console.log(response.data);
            
            //  console.log(response.data.length);
              setNrUtilizatori(response.data.length);
                      }

                    
                    
    );}
    
        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" >AMBROSIA</Link>
             
              </div>
            </nav>
         
               <h3>Details</h3>

               <div className="details">
                 <label>Ambrosia:</label>
                 <input type="text" className="nr-zones" placeholder=" " value={nrlocatii}/>
                 <button className="btn-locations" onClick={() => numarLocatiiFunctie()}>Get</button>
               </div>
               <div className="details">
                 <label>Users:</label>
                 <input type="text" className="nr-users" placeholder=" " value={nrutilizatori}/>
                 <button className="btn-user" onClick={() => numarUtilizatoriFunctie()}>Get</button>
               </div>
               <button className="btn-back" onClick={()=>history.push("/map")}>Back to map</button>
               </div>
        );
    
}
export default Details;