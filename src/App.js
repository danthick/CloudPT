import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Workout from "./components/workout.component";
import Messages from "./components/messages.component";
import Account from "./components/account.component";
import BottomNav from  './components/bottomNavigation.component'


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div>
            <BottomNav />
          </div>
          <br/>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/workout" exact component={Workout}/>
          <Route path="/messages" exact component={Messages}/>
          <Route path="/account" exact component={Account}/>
        </div>
      </Router>

    );
  }
}
export default App;