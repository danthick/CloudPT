import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'

var messages = []
var userTo;
export default class Messages extends Component{

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            currentUser: this.props.location.currentUser,
            userTo: this.props.location.userTo
        }
        this.onChangeText = this.onChangeText.bind(this);
       
        this.props.location.messages.map((message) => { this.markMessageAsRead(message)})
    }

    componentDidMount(){
        window.scrollTo(1000000, 1000000);

        this.props.location.socket.onmessage = e => {
            var messageData = JSON.parse(e.data)
            if(messageData.messageType == "messageSent"){
                // Push incoming message to array
                e.preventDefault();
                messages.push({
                    text: messageData.text,
                    user:{
                        firstName: messageData.userFrom[0].firstName,
                        lastName: messageData.userFrom[0].lastName,
                        email: messageData.userFrom[0].email
                    },
                    userTo: messageData.userTo.email
                    
                })
                this.setState({});
            }
        }
    }
    componentDidUpdate(){
        window.scrollTo(1000000, 1000000);
    }

    onChangeText(e) {
        e.preventDefault();
        this.setState({
            text: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        if(this.state.text !== "")
        {
            
            messages.push({
                text: this.state.text,
                userTo:{
                    firstName: this.props.location.currentUser.firstName,
                    lastName: this.props.location.currentUser.lastName,
                    email: this.props.location.currentUser.email
                }
            })
            await this.sendMessage();
        }
        this.setState({text: ""});
    }

    async sendMessage(){
        // Creating JSON string of page state
        const messageData = JSON.stringify(this.state)
        await fetch('/api/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
              body: messageData
        })
        this.props.location.socket.send(JSON.stringify({
            messageType: "messageSent",
            text: this.state.text,
            userTo: this.state.userTo,
            userFrom: this.state.currentUser
        }))
    }

    markMessageAsRead(message){
        const messageData = JSON.stringify(message)
        if(message.userTo === this.state.currentUser[0].email){
            fetch('/api/message/read', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  },
                body: messageData
            })
        }

    }

    renderMessage(message){
        var classname, messageFrom;
        if(message.userTo === this.props.location.currentUser[0].email){
            // message is being sent to me
            classname = "notCurrentUser";
            messageFrom = this.state.userTo;
            
        } else {
            // message is being sent from me
            classname = "currentUser";
            messageFrom = this.props.location.currentUser[0];

        }
        return (
                <div className={classname}>

                    <div className="messageContent">
                        <div className="username">
                            {this.captitaliseFirstLetter(messageFrom.firstName)} {this.captitaliseFirstLetter(messageFrom.lastName)}
                        </div>
                        <div className="text">
                            {message.text}
                        </div>
                    </div>
                </div>
        )
    }

    captitaliseFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        messages = this.props.location.messages;
        userTo = this.props.location.userTo;
        return (
            <Fragment>
                <AppBar width="100%" pageName={this.captitaliseFirstLetter(userTo.firstName) + " " + this.captitaliseFirstLetter(userTo.lastName)} back="/messages"/>

                    <div className="messageList">
                        {messages.map((message, index) => <ul key={index}>{this.renderMessage(message)}</ul>)}
                    </div>
                    <br/><br/><br/><br/><br/><br/>
                    <div className="chatInput">
                        <form className="chatInputForm" onSubmit={e => this.onSubmit(e)}  >
                            <input
                                className = "form-control"
                                onChange={this.onChangeText}
                                value = {this.state.text}
                                type = "text"
                                placeholder = "Enter your message here"
                            />
                            <button className="sendButton" type="submit">Send</button>
                        </form>
                    </div>
                    <div className="chatHide"></div>
                </Fragment>
        )
    }
}