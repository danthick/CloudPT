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
    }

    renderMessage(message){
        const {user, text} = message;
        const {currentUser} = this.props;
        //const messageFromMe = user.email === currentUser.email; // Check is current user sent this message
        const messageFromMe = "currentUser"
        const className = messageFromMe? "currentUser" : "notCurrentUser" // Change class to true if message was from me

        return (
                <div className={className}>
                    <span className="avatar" style={{backgroundColor: "blue"}}/>

                    <div className="messageContent">
                        <div className="username">
                            {user.email}
                        </div>
                        <div className="text">
                            {text}
                        </div>
                    </div>
                </div>
            
        )
    }

    render() {
        //const {messages} = this.props.location.state;
        console.log(this.props.location.message)
        return (
            <Fragment>
                <div className="messagesList">
                    {this.props.location.message.map(message => <ul key={message}>{this.renderMessage(message)}</ul>)}
                </div>
                <br/><br/>
            </Fragment>
        )
    }
}