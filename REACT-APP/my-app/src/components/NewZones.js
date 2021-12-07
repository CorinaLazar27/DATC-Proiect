import React, {useState} from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export function NewZones()  {

  let handleChange = (i, e) =>{
    let newFormValues = [...formValues];
    newFormValues[i][e.target.zone] = e.target.value;
    setFormValues(newFormValues);
  }
  let addFormFields = () =>{
    setFormValues([...formValues, {zone: ""}])
  }

  let removeFormFields = (i) =>{
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }
    
  const [formValues, setFormValues] = useState([{zone: ""}])


        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                 
                </div>
              </div>
            </nav>
             
               <h3>Zone noi</h3>

               <form>
                 {formValues.map((element, index) =>(
                   <div className="new-zones" key={index}>
                     
                     <input type="text" name="zone"  onChange={e => handleChange(index,e)} />
                     <button type="button" className="btn-accept"></button>
                     <button type="button" className="btn-refuse" onClick={() =>removeFormFields(index)}></button>
                     </div>
                 ))}
                 <div className="button-section">
                   <button className="button-add" type="button" onClick={() => addFormFields()}>Add zone</button>
                 </div>
               </form>

               </div>
               
  );

             
        
        }       

export default NewZones;