import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import AppBar from './appBar.component'
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';

export default class Account extends Component{
    
    constructor(props) {
        super(props);
        this.listClick = this.listClick.bind(this);
    }

    logout() {
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

    listClick(url){
        this.props.history.push({pathname: url})
    }
    

    
    
    render() {
        const classes = this.props;
        return (
            <Fragment>
                <AppBar width="100%" pageName="ACCOUNT"/>

                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem onClick={() => this.listClick("account/body")}>
                        <ListItemIcon>
                            <AccessibilityIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Update Weight and Height" />
                        </ListItem>

                        <Divider />

                        <ListItem onClick={() => this.listClick("")}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Change User Role" />
                        </ListItem>

                        <ListItem onClick={() => this.listClick("account/update")}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Update Account Details" />
                        </ListItem>

                        <ListItem onClick={() => this.listClick("/account/password")}>
                        <ListItemIcon>
                            <LockIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                        </ListItem>
                        <Divider />
                    </List>

                    <div className="form-group">
                            <input type="button" value="Logout" className="btn btn-danger container" onClick={this.logout} />
                    </div>
                </div>
            </Fragment>
        )
    }
}