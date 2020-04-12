import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.createNewWorkout = this.createNewWorkout.bind(this);

    }

    createNewWorkout(){
        this.props.history.push({
            pathname: '/workout/new'
        });
    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUTS"/>
                <button type="button" className="btn btn-primary container" onClick={this.createNewWorkout}>Create New Workout</button><br/><br/>
                <button type="button" className="btn btn-primary container" onClick={this.startChat}>Assign Workout to a Client</button><br/><br/>

                <div className="bubbleCard">
                    Soon to be list of workouts with edit button...
                </div><br/>
            </Fragment>
        )
    }
}