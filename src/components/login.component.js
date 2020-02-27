import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

        onSubmit(e) {
            e.preventDefault();

            const loginData = JSON.stringify(this.state);

            fetch('http://localhost:4000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: loginData}
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

            this.setState({
                email: '',
                password: '',
            })
        }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Please enter your login details:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <input  type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                                type="password" 
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                    <div>
                        <a href="/register" >Don't have an account? Click here to register!</a>
                    </div>
                </form>
            </div>
        )
    }
}
export var returnUser;