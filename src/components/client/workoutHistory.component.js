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

        this.state = {
            workoutsLoading: false,
            recordedWorkouts: [],        
        }
    }

    async componentDidMount(){
        await this.getRecordedWorkouts();
        await this.getWorkoutInfo();
        if(this.state.recordedWorkouts.length > 0){
            //this.calculateWorkoutInfo();
        }
        console.log(workoutInfo)
        
    }

    async getRecordedWorkouts(){
        this.setState({workoutsLoading: true});
        await fetch('/api/workout/record', {
            method: 'GET',
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
                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "24px"}}>Welcome to CloudPT!</div>

                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : this.state.recordedWorkouts.length > 0 &&
                <div>
                    <div className="alert alert-info" role="alert">
                        <p style={{textAlign: "center",fontSize: "36px"}}>{this.state.noOfWorkoutsInWeek} </p>
                        <p style={{textAlign: "center"}}>Workout{this.state.noOfWorkoutsInWeek !== 1 && <span>s</span>} completed this week!</p>
                        {this.state.noOfWorkoutsInWeek === 0 && <p style={{textAlign: "center"}}>Try completing a work out soon! You can do this!</p>}
                    </div>
                    <div className="alert alert-info" role="alert">
                        <p style={{textAlign: "center",fontSize: "36px"}}>{this.state.lastWorkout}</p>
                        <p style={{textAlign: "center"}}>Last completed workout!</p>
                    </div>

                </div>}

                {this.state.workoutsLoading? null
                : this.state.recordedWorkouts.length < 1 &&
                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "26px"}} onClick={() => window.location.replace("/workout")}>Head over to the workouts section to get started!</div>}
                
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