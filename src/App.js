import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login, { returnUser } from "./components/login.component";
import Home from "./components/home.component";
import Register from "./components/register.component";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: ""
    }
  }

  render() {
    return (
      <Router user={"Dan"}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">CloudPT</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Test</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Test</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Login}/>

          <Route path="/register" exact component={Register}/>
          {/* <Route path="/home" exact component={Home} user="Dan"/> */}
          <Route path="/home" render={props => (<Home {...props} user=""/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;