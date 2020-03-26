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
            getUser: "",
            showError: false,
            userList: [],
            userListLoaded: false,
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        this.setState({
            messages: "",
            currentUser: "",
            email: "",
            getUser: "",
            showError: false,
            userList: [],
            userListLoaded: false,
        })
        // Get all messages
        await this.getMessages();
        // Get all users
        this.getAllUsers()
        // Create array of lists for all users in allUsers list
        this.createMessageLists()
        // this.setState({
        //     userListLoaded: true
        // })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    async getAllUsers(){
        console.log(this.state.userList)
        for (var i = 0; i < this.state.messages.length; i++){
            //var index = Object.(this.state.userList).indexOf(this.state.messages[i].userTo);
            //console.log(index)
            //if (index == -1){
            //    // not in list - add user to list
            //    await this.getUser(this.state.messages[i].userTo)
            //    this.state.userList.push(this.state.getUser)
            //}
            if(this.state.userList.length == 0){
                await this.getUser(this.state.messages[i].userTo)
                    this.state.userList.push(this.state.getUser)
            }
            console.log(this.state.userList)
            for(var j = 0; j < this.state.userList.length; j++){
                try{
                    if(this.state.userList[j].email == this.state.messages[i].userTo){
                        await this.getUser(this.state.messages[i].userTo)
                        this.state.userList.push(this.state.getUser)
                    }
                } catch (e){

                }
                
            }
        }
        console.log(this.state.userList)
    }

    createMessageLists(){
        for (var i = 0; i < this.state.userList.length; i++){
            this.state.userList[i] = [this.state.userList[i], []]
            for(var j = 0; j < this.state.messages.length; j++){
                if (this.state.messages[j].userTo == this.state.userList[i][0]){
                    
                    this.state.userList[i][1].push(this.state.messages[j])
                }
            }
        }
    }

    async onSubmit(e){
        e.preventDefault();
        
        await this.getUser(this.state.email)
        console.log(this.state.getUser)
        if(this.state.getUser.email != null){
            this.props.history.push({
                pathname: '/chat',
                message: this.state.messages, 
                currentUser: this.state.currentUser
            })
        } else {
            this.setState({
                showError: true
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



                <List  className="userList">
                    {this.state.userListLoaded?  this.state.userList.map((users, index) => {
                        return (
                            <ListItem key={index}>
                                <Link to={{pathname: '/chat', message: this.state.messages, currentUser: this.state.currentUser}}>
                                {/* <ListItemIcon>
                
                                </ListItemIcon> */}
                                <ListItemText primary={users[0]} secondary={(users[1])[users[1].length - 1].text}/>
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