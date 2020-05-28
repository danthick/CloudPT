import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import WorkoutHistoryList from './workoutHistoryList.componenet';

var workoutInfo = [];
export default class WorkoutHistory extends Component{
    constructor(props) {
        super(props);

        this.getRecordedWorkouts = this.getRecordedWorkouts.bind(this);
        this.getWorkoutInfo = this.getWorkoutInfo.bind(this);
        this.viewRecordedWorkout = this.viewRecordedWorkout.bind(this);

        this.state = {
            workoutsLoading: false,
            recordedWorkouts: [],        
        }
    }

    async componentDidMount(){
        await this.getRecordedWorkouts();
        await this.getWorkoutInfo();
    }

    async getRecordedWorkouts(){
        this.setState({workoutsLoading: true});
        await fetch('/api/workout/recorded', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
        }).then(async res => {
            await res.json().then(async log => {
                this.setState({
                    recordedWorkouts: log.recordedWorkouts,
                })
            });
            }).catch(error => console.log(error))
    }

    async getWorkoutInfo(){
        for(var i = 0; i < this.state.recordedWorkouts.length; i++){
            await fetch('/api/workout/one/' + this.state.recordedWorkouts[i].workoutID, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  },
            }).then(async res => {
                await res.json().then(async log => {
                    workoutInfo.push(log.workout)
                });
                }).catch(error => console.log(error))
        }
        this.setState({workoutsLoading: false});
    }


    viewRecordedWorkout(index){
        // Pass workout to next page
        this.props.history.push({
            pathname: '/workout/history/view',
            recordedWorkout: this.state.recordedWorkouts[index],
            workoutInfo: workoutInfo[index]
        });
    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUT HISTORY" back={"/workout"}/>

                {/* Loading animation */}
                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : null }

                {/* Show if no workouts recorded */}
                {this.state.workoutsLoading? null
                : this.state.recordedWorkouts.length < 1 &&
                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "26px"}} onClick={() => window.location.replace("/workout")}>Head over to the workouts section to get started!</div>}
                
                {/* List of all workouts recorded */}
                {this.state.workoutsLoading? null :
                this.state.recordedWorkouts.map((workout, index) => {
                return (
                    <div key={index}>
                        <WorkoutHistoryList recordInfo={workout} workoutInfo={workoutInfo[index]} view={this.viewRecordedWorkout} index={index}/>
                    </div>
                )})}
              
            </Fragment>
        )
    }
}