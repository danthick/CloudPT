import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';

export default class accountEdit extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            errorMessage: '',
            successMessage: '',
            showError: false,
            showSuccess: false,
            user: '',
        }
        this.getCurrentUser();
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

        let changeRole = window.confirm("Are you sure? Click OK to confirm.");
        if (changeRole){
            fetch('/api/user/role', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            }).then(res => {
                res.json().then(log => {
                    if(log.success){
                        this.setState({
                            showSuccess: true,
                            successMessage: "User role has been updated. You must re-login for changes to take effect. You will now be logged out."
                        });
                        setTimeout(this.logout, 6000);
                    } else {
                        this.setState({
                            showError: true,
                            errorMessage: "User role could be changed at this time."
                        });
                    }
                    
                });
                }).catch(error => console.log(error))
        }
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
                <AppBar width="100%" pageName="USER ROLE" back="/account"/><br/>

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

                    
                    <div style={{background: "lightgrey", borderRadius: "5px", padding: "5px", textAlign: "center", fontSize: "16px"}}>
                        You are currently using the app as a:
                        {this.state.user.ptBool?
                            <p style={{fontWeight: "bold"}}>Personal Trainer</p>
                        :
                            <p style={{fontWeight: "bold"}}>Client</p>
                        }
                    </div><br/>

                    {this.state.user.ptBool? 
                    <div>
                        <p className="alert alert-danger" >Changing this would remove all of your clients assigned to you and remove the ability to create or assign workouts.</p>
                        <input type="button" value="CHANGE TO A CLIENT" onClick={this.onSubmit} className="btn btn-primary container"/>
                    </div>
                    :
                    <div>
                         <p className="alert alert-danger" >Changing this would remove your workouts and your assigned personal trainer.</p>
                         <input type="button" value="CHANGE TO A PERSONAL TRAINER" onClick={this.onSubmit} className="btn btn-primary container"/>
                    </div>
                    }
                    
            </Fragment>
        )
    }
}