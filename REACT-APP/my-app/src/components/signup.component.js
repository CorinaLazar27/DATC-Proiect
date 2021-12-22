import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

export function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
 
  const check=true;
  const history = useHistory();
 

  const tryToRegister = async () => {

    const data = {
      PartitionKey: userName,
      RowKey: "user",
      FirstName: firstName,
      LastName: lastName,
      Password: password,
    };

    await axios
      .post("/user",data,

      )
      .then((response) => response)
      .then((json) => {
        console.log(json.data);
        return json.data;
      });

     
  };
  function RegisterClick() {
  
    tryToRegister();
    console.log(check);
    history.push("/sign-in");
  }
  
        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Register</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </nav>
           
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"
                     onChange={(e) => setFirstName(e.target.value) }/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" 
                     onChange={(e) => setLastName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                     onChange={(e) => setUserName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                     onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={()=>RegisterClick()}>Register</button>
               
            </form></div>
        );
    }
export default SignUp;