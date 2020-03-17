import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



export default class Messages extends Component{
    constructor(props) {
        super(props);

        this.state = {
            messages:[
                {
                    text: "This is a test message1",
                    user:{
                        firstName: "Dan",
                        lastName: "Thick",
                        email: "dan.thick@hotmail.co.uk"
                    }
                },
                {
                    text: "This is a test message1",
                    user:{
                        firstName: "Dan",
                        lastName: "Thick",
                        email: "dan.thick@hotmail.co.uk"
                    }
                },
            ]
        }
    }

    // GET MESSAGES FOR CURRENT USER REQUIRED
    // - Get all messages for current user
    // - Split array up into new arrays for each user communicated with

    render() {
        return (
            <Fragment>

                <div style={{marginTop: 10}}>
                    <h3>This is the messages page</h3>
                </div>

                <div className="">
                <List>
                <Link to={{pathname: '/chat', message: this.state.messages}}>
                <ListItem>
                {/* <ListItemIcon>
                    
                </ListItemIcon> */}
                <ListItemText primary="My Person Trainer" secondary="Good work yesterday!" />
                </ListItem>
                </Link>
                </List>
                </div>

            </Fragment>
        )
    }
}