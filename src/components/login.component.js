import React, { Component, Fragment } from 'react';
import '../App.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            showError: false
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

    componentDidMount() {
        fetch('/api/auth/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
                }
            ).then(res => {
                res.json().then(log => {
                     if (log.redirect === '/home') {    
                        window.location = "/home"
                     } else {
                         
                     }
                });
                }).catch(error => console.log(error))
            
      }

    onSubmit(e) {
        e.preventDefault();
        const loginData = JSON.stringify(this.state);

        fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: loginData
        }).then(res => {
            res.json().then(log => {
                if (log.auth === true) {
                    window.location = '/home'
                } else {
                    // TO DO - didn't log in
                    
                    this.setState({errorMessage: "Incorrect email or password"});
                    this.setState({showError: true})
                }
            });
            }).catch(error => console.log(error))

        this.setState({
            password: '',
        })
    }

    render() {
        return (
            <Fragment>
            <div className="fullscreen-bg">
                <video autoPlay loop muted playsInline poster="" className="fullscreen-bg__video">
                    <source src="/login-video.mp4" type="video/mp4"/>
                </video>
            </div>
                <div style={{marginTop: 10}}>
                <h3>Please enter your login details:</h3>
                { this.state.showError?
                    <div>
                    <h4 className="alert alert-danger alert-dismissible" role="alert"> { this.state.errorMessage } </h4>
                    </div>
                : null
                }
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
            </Fragment>
        )
    }
}