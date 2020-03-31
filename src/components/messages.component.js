import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from './appBar.component'
import FaceIcon from '@material-ui/icons/Face';


export default class Messages extends Component{
    constructor(props) {
        super(props);

        this.state = {
            messages: "",
            currentUser: "",
            email: "",
            getUser: "",
            showError: false,
            errorMsg: "",
            userList: [],
            userListLoaded: false,

        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.startChat = this.startChat.bind(this);
    }

    async componentDidMount(){
        // Get all messages
        await this.getMessages();
        // Get all users
        await this.getAllUsers()
        // Create array of lists for all users in allUsers list
        this.createMessageLists()
        // Show list when messages have been fetched
        this.setState({
            userListLoaded: true
        })
        
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    async getAllUsers(){
        for (var i = 0; i < this.state.messages.length; i++){
            var inList = false;
            
            for(var j = 0; j < this.state.userList.length; j++){
                if(this.state.userList[j].email === this.state.messages[i].userTo || this.state.userList[j].email === this.state.messages[i].userFrom){
                    inList = true;
                }
            }
            
            if (!inList){
                if(this.state.messages[i].userTo !== this.state.currentUser[0].email){
                    await this.getUser(this.state.messages[i].userTo)
                    this.state.userList.push(this.state.getUser)
                } else {
                    await this.getUser(this.state.messages[i].userFrom)
                    this.state.userList.push(this.state.getUser)
                }
                
            }
        }
        
    }

    createMessageLists(){
        for (var i = 0; i < this.state.userList.length; i++){
            var newUserList = this.state.userList;
            newUserList[i] = [newUserList[i], []]
            this.setState({
                userList: newUserList
            })
            for(var j = 0; j < this.state.messages.length; j++){
                if (this.state.messages[j].userTo === this.state.userList[i][0].email || this.state.messages[j].userFrom === this.state.userList[i][0].email){
                    var newUserList2 = this.state.userList;
                    newUserList2[i][1].push(this.state.messages[j])
                    this.setState({
                        userList: newUserList2
                    })
                }
            }
        }
    }

    async startChat(e){
        e.preventDefault();
        
        await this.getUser(this.state.email)
        if(this.state.getUser.email != null){
            if(this.state.getUser.email !== this.state.currentUser[0].email){
                if (this.state.userList.length == 0){
                    this.props.history.push({
                        pathname: '/chat',
                        messages: [], 
                        userTo: this.state.getUser,
                        currentUser: this.state.currentUser,
                    });
                }
                for (var i = 0; i < this.state.userList.length; i++){
                    if (this.state.userList[i][0].email === this.state.email){
                        // chat alredy exists with user
                        this.props.history.push({
                            pathname: '/chat',
                            messages: this.state.userList[i][1], 
                            userTo: this.state.userList[i][0],
                            currentUser: this.state.currentUser,
                        });
                    } else {
                        // new chat should be started
                        console.log("here")
                        this.props.history.push({
                            pathname: '/chat',
                            messages: [], 
                            userTo: this.state.getUser,
                            currentUser: this.state.currentUser,
                        });
                    }
                }
            } else {
                this.setState({
                    showError: true,
                    errorMsg: "You can't start a chat with yourself!",
                    email: ""
                })
            }
        } else {
            this.setState({
                showError: true,
                errorMsg: "There is no user with that email address!",
                email: ""
            })
        }
    }

    async getUser(userEmail){
        // Checking user exists
        const email = JSON.stringify({email: userEmail})
        this.setState({
            getUser: null
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
                        getUser: log.user
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

    captitaliseFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="MESSAGES"/>

                { this.state.showError?
                    <h6 className="alert alert-danger alert-dismissible" role="alert"> {this.state.errorMsg} </h6>
                :   null  
                }

                <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#newChatModal">Start New Chat</button>

                <List  className="userList" >
                    {this.state.userListLoaded?  this.state.userList.map((users, index) => {
                        return (
                            <ListItem key={index} style={(index + 1) % 2? {background: "#e3e3e3"}:{background: "white"}}>
                                
                                <ListItemIcon>
                                    <FaceIcon/>
                                </ListItemIcon>
                                <Link to={{pathname: '/chat', messages: users[1], userTo: users[0], currentUser: this.state.currentUser}}>
                                {/* <div {(users[1])[users[1].length - 1].read ? style={{fontWeight: "bold"}} : null}> */}
                                    <ListItemText  style={{textShadow: "0px 0px 1px #333"}} primary={this.captitaliseFirstLetter(users[0].firstName) + " " + this.captitaliseFirstLetter(users[0].lastName)} secondary={(users[1])[users[1].length - 1].text}/>

                                
                                </Link>
                                
                            </ListItem>
                            
                        )
                        }): null}
                        
                </List>


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
                                    <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.startChat}>Start Chat</button>
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