import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export function SignUp() {

<<<<<<< HEAD
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
  const getUser= async () => {
   

    axios.get('/user')
  .then((response) => {
    console.log(response.data);

  });


   
  };

  function RegisterClick() {
  
    tryToRegister();
    history.push("/sign-in");
  }
=======
>>>>>>> 07e3b95f446b3caec50c5576fa09893e970bcfb7
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
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
               
            </form></div>
        );
    }
export default SignUp;