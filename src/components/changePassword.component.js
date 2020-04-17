import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component';
import Divider from '@material-ui/core/Divider';

export default class accountEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeNewConPassword = this.onChangeNewConPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            currentPassword: '',
            newPassword: '',
            newConPassword: '',
            message: '',
            showError: false,
            showSuccess: false
        }
    }

    onChangeCurrentPassword(e){
        this.setState({
            currentPassword: e.target.value
        });
    }

    onChangeNewPassword(e){
        this.setState({
            newPassword: e.target.value
        });
    }

    onChangeNewConPassword(e) {
        this.setState({
            newConPassword: e.target.value
        });
    }

    onSubmit(e) {
        this.setState({
            showError: false,
            showSuccess: false,
        })
        e.preventDefault();
        if(this.state.newConPassword !== this.state.newPassword){
            this.setState({
                message: "New password does not match",
                showError: true,
                newPassword: "",
                newConPassword: ""
            })
        } else {
            const newPassword = JSON.stringify(this.state);

            fetch('/api/user/password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: newPassword
            }).then(res => {
                res.json().then(log => {
                    if(log.success){
                        this.setState({
                            message: "Password has been changed",
                            showSuccess: true,
                            currentPassword: "",
                            newPassword: "",
                            newConPassword: ""
                        })
                    } else {
                        this.setState({
                            message: "Current password is not correct",
                            showError: true,
                            currentPassword: "",
                            newPassword: "",
                            newConPassword: ""
                        })
                    }
                    
                });
                }).catch(error => console.log(error))
        }
        
    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="CHANGE PASSWORD" back="/account"/><br/>
                
                <form onSubmit={this.onSubmit} autoComplete="new-password"  style={{color: "grey"}}>
                    { this.state.showError?
                        <div>
                        <h4 className="alert alert-danger alert-dismissible" role="alert" style={{textAlign: "center", fontSize: "16px"}}> { this.state.message } </h4>
                        </div>
                    : null
                    }
                    { this.state.showSuccess?
                        <div>
                        <h4 className="alert alert-success alert-dismissible" role="alert" style={{textAlign: "center", fontSize: "16px"}}> { this.state.message } </h4>
                        </div>
                    : null
                    }

                    <div className="form-group">
                        <input  type="password"
                                className="form-control"
                                placeholder="Current Password"
                                value={this.state.currentPassword}
                                onChange={this.onChangeCurrentPassword}
                                autoComplete="new-password"
                                required
                        /><br/><Divider/><br/>
                        <input  type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={this.state.newPassword}
                                onChange={this.onChangeNewPassword}
                                autoComplete="new-password"
                                required
                        /><p/>
                        <input  type="password"
                                className="form-control"
                                placeholder="Confirm New Password"
                                value={this.state.newConPassword}
                                onChange={this.onChangeNewConPassword}
                                autoComplete="new-password"
                                required
                        />
                    </div><br/>

                    <input type="submit" value="CHANGE PASSWORD" className="btn btn-primary container"/>
                </form>
            </Fragment>
        )
    }
}