import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from './appBar.component'


export default class Messages extends Component{
    constructor(props) {
        super(props);

        this.state = {
            messages: "",
            currentUser: "",
            email: "",
            newChatUser: "",
            showError: false,
            allUsers: "",
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getMessages();
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    async componentDidMount(){
        // Get all messages
        await this.getMessages();
        this.getAllUsers()
    }

    getAllUsers(){
        var userList = [];
        for (var i = 0; i < this.state.messages.length; i++){
            var index = userList.indexOf(this.state.messages[i].userTo);
            if (index == -1){
                // not in list - add user to list
                userList.push(this.state.messages[i].userTo)
            }
        }
    }

    async onSubmit(e){
        e.preventDefault();
        // IF this func returns null, show error
        // otherwise create chat window with userTo as email provided
        
        await this.checkUserExists()
        console.log(this.state.newChatUser)
        if(this.state.newChatUser.email != null){
            console.log("user")
            this.props.history.push({
                pathname: '/chat',
                message: this.state.messages, 
                currentUser: this.state.currentUser
            })
        } else {
            console.log("no user")
            this.setState({
                showError: true
            })
            // show error that uer does not exist
        }
    }

    async checkUserExists(){
        // Checking user exists
        const email = JSON.stringify({email: this.state.email})
        this.setState({
            newChatUser: null
        })
        await fetch('/api/user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
              body: email
        }).then(async res => {
            await res.json().then(async log => {
                if(log.user != null){
                    this.setState({
                        newChatUser: log.user
                    })
                }
            });
            }).catch(error => console.log(error))
    }

    async getMessages(){
        await fetch('/api/messages', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
        }).then(async res => {
            await res.json().then(log => {
                this.setState({
                    messages: log.messages,
                    currentUser: log.currentUser
                })
            });
            }).catch(error => console.log(error))
    }

    

    // GET MESSAGES FOR CURRENT USER REQUIRED
    // - Get all messages for current user
    // - Split array up into new arrays for each user communicated with
    // - Start new chat button

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="MESSAGES"/>

                { this.state.showError?
                    <h6 className="alert alert-danger alert-dismissible" role="alert"> There is no user with that email address </h6>
                :   null  
                }

                <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#newChatModal">Start New Chat</button>
                <div className="">
                <List>
                <Link to={{pathname: '/chat', message: this.state.messages, currentUser: this.state.currentUser}}>
                <ListItem>
                {/* <ListItemIcon>
                    
                </ListItemIcon> */}
                <ListItemText primary="My Person Trainer" secondary="Good work yesterday!" />
                </ListItem>
                </Link>
                </List>
                </div>


                <div className="container">
                    <div className="modal fade" id="newChatModal">
                        <div className="modal-dialog">
                        <br/><br/><br/>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Start New Chat</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    Enter the users email address below:
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
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.onSubmit}>Start Chat</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}