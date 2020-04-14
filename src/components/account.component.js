import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from './appBar.component'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default class Account extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
          }
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
                        //user = res.data.email;
                        window.location = '/'
                    } else {
                        // TO DO - didn't log in
                    }
                });
                }).catch(error => console.log(error))
    }
    

    
    
    render() {
        const classes = this.props;
        return (
            <Fragment>
                <AppBar width="100%" pageName="ACCOUNT"/>

                <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={'/account/weight'} style={{color: "grey"}}>
                    <ListItem>
                    {/* <ListItemIcon>
                        
                    </ListItemIcon> */}
                    <ListItemText primary="Update Weight and Height" />
                    </ListItem>
                    </Link>

                    <Divider />

                    <Link to={''} style={{color: "grey"}}>
                    <ListItem>
                    {/* <ListItemIcon>
                        
                    </ListItemIcon> */}
                    <ListItemText primary="Update Account Details" />
                    </ListItem>
                    </Link>


                    <Link to={''} style={{color: "grey"}}>
                    <ListItem>
                    {/* <ListItemIcon>
                        
                    </ListItemIcon> */}
                    <ListItemText primary="Change Password" />
                    </ListItem>
                    </Link>
                    
                </List>


                <div className="form-group">
                        <input type="button" value="Logout" className="btn btn-danger container" onClick={this.logout} />
                </div>
            </div>

               
            </Fragment>
        )
    }
}