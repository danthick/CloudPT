import React, { Component, Fragment } from 'react';

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
        this.setState({test: ""});
        this.props.onSendMessage(this.state.text);
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

    renderInput(){
        return (
            <div className="chatInput">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value = {this.state.text}
                        type = "text"
                        placeholder = ""
                    />
                </form>
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

                <div className="chatInput">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value = {this.state.text}
                        type = "text"
                        placeholder = ""
                        autoFocus = {true}
                    />
                </form>
            </div>
                
                
               


                <br/><br/>
            </Fragment>
        )
    }
}