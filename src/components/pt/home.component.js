import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component'
import ClientList from './clientList.component';
import Loader from 'react-loader-spinner'
const $ = window.$;

export default class Home extends Component{
    constructor(props) {
        super(props);

        this.addClient = this.addClient.bind(this);
        this.viewSchedule = this.viewSchedule.bind(this);
        this.viewDetails = this.viewDetails.bind(this);

        this.state ={
            clients: [],
            email: "",
            newClient: "",
            currentUser: "",
            showError: false,
            message: "",
            clientsLoading: false
        }
    }

    async componentDidMount(){
        await this.getClients();
    }

    async addClient(e){
        e.preventDefault();
        $('#addClient').modal('hide');
        this.setState({
            showError: false,
            showSuccess: false
        })

        var duplicate = false;
        // Checking new client isn't already in client list
        this.state.clients.forEach((client) => {
            if(this.state.email === client.email){
                duplicate = true;
                // Display error
                this.setState({
                    showError: true,
                    message: "That user is already listed as your client!",
                    email: ""
                })
            }
        });

        // Send POST request and display relevent message to user
        if(this.state.email !== this.state.currentUser.email && !duplicate){        
            const email = JSON.stringify({email: this.state.email})
            await fetch('/api/user/relationship', {
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
                    // Client has been added
                    if(log.success){
                        this.setState({
                            showSuccess: true,
                            message: "Client has been added!",
                            email: ""
                        })
                        this.getClients();
                    } else {
                        // Email address could not be found
                        this.setState({
                            showError: true,
                            message: "Email address could not be found!",
                            email: ""
                        })
                    }
                });
                }).catch(error => console.log(error))
        } else if (this.state.email === this.state.currentUser.email){
            // User is trying to add themselves
            this.setState({
                showError: true,
                message: "You can't add yourself as a client!",
                email: ""
            })
        }
    }

    async getClients(){
        this.setState({clientsLoading: true});
        await fetch('/api/user/relationship', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
        }).then(async res => {
            await res.json().then(log => {
                this.setState({ 
                    clients: log.clients,
                    currentUser: log.currentUser[0]
                })
            });
            }).catch(error => console.log(error))
        this.setState({clientsLoading: false});
    }

    viewSchedule(user){
        this.props.history.push({
            pathname: '/home/schedule',
            user: user,
        });
    }

    viewDetails(user){
        this.props.history.push({
            pathname: '/home/details',
            user: user,
        });
    }


    

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="HOME"/>
                <div className="alert alert-success" role="alert" style={{textAlign: "center",fontSize: "24px"}}>Welcome to CloudPT!</div>

                <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#addClient">ADD CLIENT</button><br/><br/>

                

                { this.state.showError?
                    <h6 className="alert alert-danger alert-dismissible" role="alert"> {this.state.message} </h6>
                :   null  
                }
                { this.state.showSuccess?
                    <h6 className="alert alert-info alert-dismissible" role="alert"> {this.state.message} </h6>
                :   null  
                }

                {this.state.clientsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                :
                <div>
                <h2>Clients</h2>
                {this.state.clients.map((client, index) => {
                    return (
                        <div key={index}><ClientList client={client} viewSchedule={this.viewSchedule} viewDetails={this.viewDetails}/></div>
                        
                    )
                })}
                </div>}

                <form onSubmit={e => this.addClient(e)}>
                <div className="container">
                    <div className="modal fade" id="addClient" style={{top: "20px"}}>
                        <div className="modal-dialog">
                        <br/><br/><br/>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add a New Client</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    Enter the users email address below:
                                    <input  type="email" className="form-control" placeholder="Email Address" onChange={(e) => this.setState({email: e.target.value})} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Add Client</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form><br/><br/><br/><br/>
                
              
            </Fragment>
        )
    }
}