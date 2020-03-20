import React, { Component, Fragment } from 'react';

var messages = []
export default class Messages extends Component{

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }
    }

    onChange(e){
        this.setState({text: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        messages.push({
            text: this.state.text,
            user:{
                firstName: "current",
                lastName: "user",
                email: "currentuser@email.com"
            }
        })
        this.newData.scrollIntoView(false);
    }

    sendMessage(){
        fetch('/api/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
        }).then(res => {
            res.json().then(log => {
                if (log.auth === true) {
                    
                } else {
                    // TO DO - didn't log in
                    
                }
            });
            }).catch(error => console.log(error))
    }

    renderMessage(message){
        const {currentUser} = this.props;
        //const messageFromMe = user.email === currentUser.email; // Check is current user sent this message
        const messageFromMe = "currentUser"
        const className = messageFromMe? "currentUser" : "notCurrentUser" // Change class to true if message was from me

        return (
                <div className={className}>

                    <div className="messageContent">
                        <div className="username">
                            {message.userFrom}
                        </div>
                        <div className="text">
                            {message.text}
                        </div>
                    </div>
                </div>
            
        )
    }

    renderInput(){
        return (
            <div className="chatInput">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value = {this.state.text}
                        type = "text"
                        placeholder = "Type your message here"
                    />
                </form>
            </div>
        )
    }

    render() {
        messages = this.props.location.message;
        return (
            <div>
                <div className="messagesList" ref={(ref) => this.newData = ref}>
                    {messages.map((message, index) => <ul key={index}>{this.renderMessage(message)}</ul>)}
                    
                </div>

                <div style={{backgroundColor:"white"}}>
                    <div className="chatInput" >
                        <form className="chatInputForm" onSubmit={e => this.onSubmit(e)}  >
                            <input
                                className = "form-control"
                                onChange={e => this.onChange(e)}
                                value = {this.state.text}
                                type = "text"
                                placeholder = "Enter your message here"
                                
                            />
                            <button className="sendButton" type="submit" >Send</button>
                        </form>
                    </div>
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}