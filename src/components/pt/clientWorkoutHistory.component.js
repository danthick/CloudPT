import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import WorkoutHistoryList from '../client/workoutHistoryList.componenet';

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
            user: this.props.location.user,
            show: false,     
        }

        if(typeof this.state.user !== "undefined"){
            localStorage.clear();
        }
    }

    async componentDidMount(){
        const rehydrate = JSON.parse(localStorage.getItem('user'))
        this.setState(rehydrate, () => {
            this.loadInformation();
        })
        this.setState({show: true})
        
    }

    componentWillUnmount() {
        localStorage.setItem('user', JSON.stringify(this.state))
    }

    async loadInformation(){
        
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
            body: JSON.stringify({user: this.state.user})
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
            pathname: '/home/details/history/view',
            recordedWorkout: this.state.recordedWorkouts[index],
            workoutInfo: workoutInfo[index]
        });
    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUT HISTORY" back={"/home/details"}/>

                {this.state.show?
                <div>
                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "36px"}}>{this.state.user.firstName} {this.state.user.lastName}</div>

                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : null }

                {this.state.workoutsLoading? null
                : this.state.recordedWorkouts.length < 1 &&
                <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "18px"}}>This user has not completed any workouts yet.</div>}
                
                {this.state.workoutsLoading? null :
                this.state.recordedWorkouts.map((workout, index) => {
                return (
                    <div key={index}>
                        <WorkoutHistoryList recordInfo={workout} workoutInfo={workoutInfo[index]} view={this.viewRecordedWorkout} index={index}/>
                    </div>
                )})}
                </div>
                : null }
              
            </Fragment>
        )
    }
}