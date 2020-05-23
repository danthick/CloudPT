import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import ClientWorkoutList from './clientWorkoutList.component';

export default class ClientDetails extends Component{
    constructor(props) {
        super(props);

        this.viewWorkoutHistory = this.viewWorkoutHistory.bind(this);
        this.removeClient = this.removeClient.bind(this);

        this.state = {
            user: this.props.location.user,
            show: false
        };

        if(typeof this.state.user !== "undefined"){
            localStorage.clear();
        }
    }

    componentDidMount() {
        const rehydrate = JSON.parse(localStorage.getItem('user'))
        this.setState(rehydrate)
        this.setState({show: true})
    }

    componentWillUnmount() {
        localStorage.setItem('user', JSON.stringify(this.state))
    }

    viewWorkoutHistory(){
        this.props.history.push({
            pathname: '/home/details/history',
            user: this.state.user,
        });
    }

    removeClient(){
        let removeClient = window.confirm("Click OK if you want to remove this client. All workouts assigned to them will also be removed.");
        if (removeClient){
            fetch('/api/user/relationship', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({email: this.state.user.email})
            }).then(res => {
                res.json().then(log => {
                    if(log.success){
                        this.props.history.push({pathname: '/home'});
                    }
                });
                }).catch(error => console.log(error))
        }
    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="CLIENT DETAILS" back={"/home"}/>
                {this.state.show?
                    <div>
                    <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "36px"}}>{this.state.user.firstName} {this.state.user.lastName}</div>

                    <button type="button" className="btn btn-primary container" onClick={this.viewWorkoutHistory}>View Workout History</button><br/>
                    <input type="button" value="Remove Client" className="btn btn-danger container" onClick={this.removeClient} />
                    </div>
                : null }

            <br/><br/><br/><br/></Fragment>
        )
    }
}