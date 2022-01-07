import React from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import { Login } from './components/login.component';
import SignUp from "./components/signup.component";
import  { PageWithMap } from './components/PageWithMap';
import {PageUser} from './components/PageUser';
import {HistoryPage} from './components/HistoryPage';
import {PreLoader1} from './components/PreLoader1';

function App() {
  
  return (
  <Router>
   
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/map" component={PageWithMap} />
            <Route exact path="/mapuser" component={PageUser} />
            <Route exact path="/historypage" component={HistoryPage} />
            <Route exact path="/loading" component={PreLoader1} />
          </Switch>
        </div>
      </div>
    </Router>)
}

export default App;
