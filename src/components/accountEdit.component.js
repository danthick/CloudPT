import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component';

export default class accountEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            errorMessage: '',
            successMessage: '',
            showError: false,
            showSuccess: false,
            user: '',
        }
        this.fillDetails();
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

    async fillDetails(){
        await this.getCurrentUser();
        this.setState({
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
        })
    }

    async getCurrentUser(){
        await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
        }).then(async res => {
            await res.json().then(log => {
                this.setState({user: log.user[0]})
            });
            }).catch(error => console.log(error))
    }

    onSubmit(e) {
        this.setState({
            showError: false,
            showSuccess: false
        })
        e.preventDefault();
        const userData = JSON.stringify(this.state);

        fetch('/api/user/update', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: userData
        }).then(res => {
            res.json().then(log => {
                if (log.success) {
                    this.setState({
                        showSuccess: true,
                        successMessage: "User account has been updated"
                    })
                    // Email has been changed and user must re-login
                    if (this.state.email !== this.state.user.email){
                        this.setState({
                            showSuccess: true,
                            successMessage: "User account has been updated. You must re-login for changes to take effect. You will now be logged out."
                        })
                        setTimeout(this.logout, 6000);
                    }
                } else {
                    this.setState({
                        showError: true,
                        errorMessage: "That email is already in use",
                        firstName: this.state.user.firstName,
                        lastName: this.state.user.lastName,
                        email: this.state.user.email
                    })
                }
            });
            }).catch(error => console.log(error))
    }

    logout(){
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
            }
        ).then(function(res) {
            res.json().then(log => {
                if (log.logout === true) {
                    window.location = '/'
                }
            });
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="UPDATE ACCOUNT DETAILS" back="/account"/><br/>
                
                <form onSubmit={this.onSubmit} autoComplete="new-password"  style={{color: "grey"}}>

                    { this.state.showSuccess?
                        <div>
                        <h4 className="alert alert-success alert-dismissible" role="alert" style={{textAlign: "center", fontSize: "16px"}}> { this.state.successMessage } </h4>
                        </div>
                    : null
                    }
                    {this.state.showError?
                        <div>
                        <h4 className="alert alert-danger alert-dismissible" role="alert" style={{textAlign: "center", fontSize: "16px"}}> { this.state.errorMessage } </h4>
                        </div>
                    : null
                    }

                    <div className="form-group">
                        First Name
                        <input  type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                autoComplete="off"
                                required
                        /><p/>
                        Last Name
                        <input  type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                autoComplete="off"
                                required
                        /><p/>
                        Email
                        <input  type="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                autoComplete="new-password"
                                required
                        />
                    </div><br/>

                    <input type="submit" value="UPDATE DETAILS" className="btn btn-primary container"/>
                </form>
            </Fragment>
        )
    }
}