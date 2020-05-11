import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Home from "./components/client/home.component";
import HomePT from "./components/pt/home.component";
import Register from "./components/register.component";
import Workout from "./components/client/workout.component";
import WorkoutPT from "./components/pt/workout.component";
import Messages from "./components/messages.component";
import Chat from "./components/chat.component";
import Account from "./components/account/account.component";
import BottomNav from  './components/navigation/bottomNavigation.component';
import Body from './components/account/body.component';
import NewWorkout from './components/pt/newWorkout.component';
import AccountEdit from './components/account/accountEdit.component';
import ChangePassword from './components/account/changePassword.component';
import UserRole from './components/account/userRole.component';
import RecordWorkout from './components/client/recordWorkout.component';
import WorkoutHistory from './components/client/workoutHistory.component';

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

        {this.state.auth? <BottomNav /> : null}

        
        <div className="container" >
          <br/>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          {this.state.ptBool?
          <Switch>
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/home' component={HomePT} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout' component={WorkoutPT} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout/new' component={NewWorkout} />
          </Switch>
          :
          <Switch>
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/home' component={Home} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout' component={Workout} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout/record' component={RecordWorkout} />
            <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/workout/history' component={WorkoutHistory} />
          </Switch>
          }
          
          
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/messages' component={Messages} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/chat' component={Chat} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account' component={Account} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account/body' component={Body} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account/update' component={AccountEdit} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account/password' component={ChangePassword} />
          <PrivateRoute authed={this.state.auth} wasInitialised={this.state.wasInitialised} exact path='/account/role' component={UserRole} />
          {/* <Route render={() => <Redirect to="/home" />} /> Used to catch all routes */}
        </div>
      </Router>
    );
  }
}
export default App;