import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component{
    constructor(props) {
        super(props);

        // Do something
    }

    authCheck(){
            fetch('http://localhost:4000/api/auth/', {
                method: 'GET',
                //withCredentials: true,
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
                }
            ).then(function(res) {
                res.json().then(log => {
                    console.log(log)
                    // if (log.redirect === '/home') {
                    //     //user = res.data.email;
                    //     window.location = '/home'
                    // } else {
                    //     // TO DO - didn't log in
                    // }
                });
                }).catch(error => console.log(error))

    }

    onSubmit(e) {
        e.preventDefault();
        console.log("hit")
        fetch('http://localhost:4000/logout', {
                method: 'GET',
                //withCredentials: true,
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
                }
            ).then(function(res) {
                res.json().then(log => {
                    console.log(log)
                    if (log.redirect === '/home') {
                        //user = res.data.email;
                        window.location = '/home'
                    } else {
                        // TO DO - didn't log in
                    }
                });
                }).catch(error => console.log(error))
    }

    render() {
        this.authCheck();
        //const {user} = this.props.data
        return (
            <div>
            <div style={{marginTop: 10}}>
                <h3>You have logged in!{this.props.user}</h3>
            </div>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="submit" value="Logout" className="btn btn-primary" />
            </div>
            </form>
            </div>

        )
    }
}