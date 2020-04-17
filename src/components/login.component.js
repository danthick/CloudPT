import React, { Component, Fragment } from 'react';
import '../App.css';
import $ from 'jquery';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import TimelineIcon from '@material-ui/icons/Timeline';
import DevicesIcon from '@material-ui/icons/Devices';
import HttpsIcon from '@material-ui/icons/Https';
import WebIcon from '@material-ui/icons/Web';

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


        $(function() {
            $('.scroll-down').click (function() {
                $('html, body').animate({scrollTop: $('section.scrollTo').offset().top }, 'slow');
                return false;
            });
        });
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
                    this.setState({
                        errorMessage: "Incorrect email or password",
                        showError: true,
                        password: ""                    
                    });
                }
            });
            }).catch(error => console.log(error))
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

                <p className="appTitle">
                    <img src="logo512.png" alt="logo" height="60" width="60"/>
                    CloudPT
                </p><br/>
                
                <div className="homeBackground">
                { this.state.showError?
                    <div>
                    <h4 className="alert alert-danger alert-dismissible" role="alert" style={{textAlign: "center", fontSize: "16px"}}> { this.state.errorMessage } </h4>
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
                        <input type="submit" value="LOGIN" className="btn btn-success container" />
                    </div>
                </form>
            </div>
            
            <br/>
            <div>
                <a href="/register" className="btn btn-primary container">SIGN UP HERE</a>
            </div><br/><br/>


            <div className="bubbleCard">
                    <h6>  <b>Install this app on your phone: Tap </b>
                    <img src="./safari.png" width="25px" height="25px" alt="Safari Share Button"/> or <img src="./chrome.png" width="8px" height="25px" alt="Chrome Menu Button"/> and then Add to Homescreen! </h6>
            </div><br/>

            
            <div className="scroll-down-info"> Check out the app features!</div>
                <section>
                    <a href="#scroll" className="scroll-down"> </a>
                </section>
                
                <section className="scrollTo"><br/>
                    <div className="homeBackground">
                        <FitnessCenterIcon style={{fontSize: "65px", float: "left"}}/>
                        <h3 style={{fontSize: "30px", lineHeight: "60px"}}>Workout Creation</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>Create custom workouts for clients</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>Assign workouts to your clients</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>View clients workout history</li>
                        
                        <br/>
                        <ChatIcon style={{fontSize: "65px", float: "left"}}/>
                        <h3 style={{fontSize: "30px", lineHeight: "55px"}}>Instant Messaging</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>Contact your clients instantly</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>Easy to use inbuilt chat feature</li>
                        

                        <br/>
                        <TimelineIcon style={{fontSize: "65px", float: "left"}}/>
                        <h3 style={{fontSize: "30px", lineHeight: "55px"}}>Track Progress</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>See progress your clients are making during programs</li>
                        <li className="list-group-item" style={{textAlign: "center"}}></li>
                        

                    </div>

                    <br/>

                    <div className="homeBackground">
                        <DevicesIcon style={{fontSize: "65px", float: "left"}}/>
                        <h3 style={{fontSize: "30px", lineHeight: "60px"}}>Cross-Platform</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>Use the application anywhere</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>Works on any device</li>

                        <br/>
                        <WebIcon style={{fontSize: "65px", float: "left"}}/> 
                        <h3 style={{fontSize: "25px", lineHeight: "60px"}}>Web Application</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>Offline operation</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>Fast and lightweight</li>

                        <br/>
                        <HttpsIcon style={{fontSize: "65px", float: "left"}}/> 
                        <h3 style={{fontSize: "25px", lineHeight: "60px"}}>Secure and Protected</h3>
                        <li className="list-group-item" style={{textAlign: "center"}}>Up-to-date with the latest security</li>
                        <li className="list-group-item" style={{textAlign: "center"}}>HTTPS ensures your information is protected</li>
                    </div>
                    <br/>
                </section>
            </div>
        </Fragment>
        )
    }
}