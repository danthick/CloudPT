import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Workout from "./components/workout.component";
import WorkoutPT from "./components/workoutPT.component";
import Messages from "./components/messages.component";
import Chat from "./components/chat.component";
import Account from "./components/account.component";
import BottomNav from  './components/bottomNavigation.component';
import Weight from './components/weight.component';
import newWorkout from './components/newWorkout.component';

function PrivateRoute ({component: Component, authed, wasInitialised, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : !wasInitialised? ""
        : <Redirect to={{pathname: '/'}} />}
    />
  )
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      auth: false,
      ptBool: false,
      wasInitialised: false,
    }
    this.checkAuth()
  }

  async componentDidMount(){
    //await this.checkAuth();
  }

  async checkAuth() {
   await fetch('/api/auth/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
            }
        ).then(async res => {
            await res.json().then(log => {
                if (log.redirect === "/home") {
                  this.setState({
                    auth: true,
                    ptBool: log.ptBool, 
                    wasInitialised: true
                  });
               } else {
                  this.setState({
                    auth: false, 
                    wasInitialised: true
                  });
               }
            });
            }).catch(error => console.log(error))
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div>
          {this.state.auth? <BottomNav /> : null}           
          </div>
          <br/>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          {this.state.ptBool?
          <Switch>
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout' component={WorkoutPT} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout/new' component={newWorkout} />
          </Switch>
          :
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout' component={Workout} />
          }
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/home' component={Home} />
          
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/messages' component={Messages} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/chat' component={Chat} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account' component={Account} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account/weight' component={Weight} />
          {/* <Route render={() => <Redirect to="/home" />} /> Used to catch all routes */}
        </div>
      </Router>

    );
  }
}
export default App;