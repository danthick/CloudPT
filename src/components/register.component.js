import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.changePtTrue = this.changePtTrue.bind(this);
        this.changePtFalse = this.changePtFalse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errorMessage: '',
            showError: false,
            ptBool: false
        }
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        });
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

    changePtTrue() {
        this.setState({
            ptBool: true
        });
    }

    changePtFalse(){
        this.setState({
            ptBool: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const registerData = JSON.stringify(this.state);

        fetch('/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: registerData
        }).then(res => {
            res.json().then(log => {
                if (log.redirect === '/') {
                    window.location = '/'
                } else {                  
                    this.setState({errorMessage: "Email is already in use"});
                    this.setState({showError: true})
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
                {/* Background video */}
                <div className="fullscreen-bg">
                    <video autoPlay loop muted playsInline poster="" className="fullscreen-bg__video">
                        <source src="/login-video.mp4" type="video/mp4"/>
                    </video>
                </div>

                <div style={{marginTop: 40}}>

                <p className="appTitle">
                    <img src="logo512.png" alt="logo" height="60" width="60"/>
                    CloudPT
                </p><br/>

                <div className="homeBackground">
                <h3>CREATE YOUR ACCOUNT</h3>
                <form onSubmit={this.onSubmit}>
                    
                    {/* Show error message */}
                    { this.state.showError?
                        <div>
                        <h4 className="alert alert-danger alert-dismissible" role="alert"> { this.state.errorMessage } </h4>
                        </div>
                    : null
                    }

                    {/* Register form */}
                    <div className="form-group"> 
                        <input  type="text"
                                id="firstName"
                                className="form-control"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                required
                        />
                        </div>
                        <div className="form-group">
                        <input  type="text"
                                id="lastName"
                                className="form-control"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                required
                        />
                        </div>
                        <div className="form-group">
                        <input  type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <input  type="password" 
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                        />
                    </div>
                    <h5>Do you want to register as a personal trainer?<p/>
                    <div className="btn-group btn-group-toggle container" data-toggle="buttons">
                    
                        <label className="btn btn-light active" >
                            <input type="radio" onClick={this.changePtTrue}/>Yes
                        </label>
                        <label className="btn btn-light active" >
                            <input type="radio" onClick={this.changePtFalse} defaultChecked/>No
                        </label>
                    </div>
                    </h5>
                    
                    <div className="form-group">
                    <br/>
                        <input type="submit" value="REGISTER" className="btn btn-success container" />
                    </div>
                </form>
                </div>
                <br/>
                <div>
                        <a href="/" className="btn btn-primary container">LOGIN</a>
                </div><br/>

                <div className="alert alert-info">
                    User data is only stored for logging in and communication purposes. Your full name will be displayed to other users. Your email address and
                    password will never be shared with other users.
                </div>
                </div>
            </div>
        )
    }
}