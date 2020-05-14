import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import ClientWorkoutList from './clientWorkoutList.component';

export default class ClientDetails extends Component{
    constructor(props) {
        super(props);

        this.viewWorkoutHistory = this.viewWorkoutHistory.bind(this);

        this.state = {

        };

        if(typeof this.props.location.user == "undefined"){
            this.props.history.push({pathname: '/home'});
        }
    }

    viewWorkoutHistory(){
        this.props.history.push({
            pathname: '/home/details/history',
            user: this.props.location.user,
        });
    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="CLIENT DETAILS" back={"/home"}/>

                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "36px"}}>{this.props.location.user.firstName} {this.props.location.user.lastName}</div>

                <button type="button" className="btn btn-primary container" onClick={this.viewWorkoutHistory}>View Workout History</button>

            <br/><br/><br/><br/></Fragment>
        )
    }
}