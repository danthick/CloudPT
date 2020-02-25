import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
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
        onSubmit(e) {
            e.preventDefault();

            const registerData = JSON.stringify(this.state);

            axios({
                method: 'POST',
                url: 'http://localhost:4000/register',
                headers: {'Content-Type': 'application/json'},
                data: registerData,
            }).then(function(res) {
                    console.log(registerData)
                    if (res.data.redirect === '/') {
                        window.location = '/'
                    } else {
                        // TO DO - Email already exists
                    }
                }).catch(error => console.log(error))

            this.setState({
                email: '',
                password: '',
            })
        }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Please enter your details:</h3>
                <form onSubmit={this.onSubmit}>
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
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                    <div>
                        <a href="/login" >Already have account? Click here to login!</a>
                    </div>
                </form>
            </div>
        )
    }
}