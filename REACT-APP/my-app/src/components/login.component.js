import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";


export function Login() 
{     
        
        const [userName, setUserName] = useState("");
        const [password, setPassword] = useState("");
       
        const history = useHistory();
        
     

        const getUser= async () => {
        
        
        axios.get('/user')

        .then((response) => {
         console.log(response.data);
          for (var i=0; i <response.data.length; i++)
              {
                console.log(response.data[i].partitionKey);
                console.log(response.data[i].password);
                console.log(response.data[i].rowKey);
                if((userName == response.data[i].partitionKey) && (password == response.data[i].password))
                  { 
                      if(response.data[i].rowKey == "admin")
                      {
                      
                        history.push("/map");
                      
                        break;}
                      else if(response.data[i].rowKey == "user")
                        {
                        
                          history.push("/mapuser");
                          
        
                          break;}
            

                  }
                  else {  
                    
                    history.push("/sign-up");
                   
                      }
              }
        });
      };

        function RegisterClick(){
          history.push("/sign-up");
        }
        function LoginClick() {
            
          getUser();
          history.push("/loading");
      
          }
      
        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
        
            </div>
          </nav>
            <form>
                <h3>Sign In</h3>
               
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

                

                <button type="submit" className="btn btn-primary btn-block" onClick={() => LoginClick()}>Submit</button>
               <div>
              
                <button className="btn" onClick={() => RegisterClick()}>Register..</button>
                
                </div>
            </form></div>
        );
    
}
export default Login;