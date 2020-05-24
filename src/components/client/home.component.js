import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';

export default class Home extends Component{
    constructor(props) {
        super(props);

        this.getRecordedWorkouts = this.getRecordedWorkouts.bind(this);
        this.calculateWorkoutInfo = this.calculateWorkoutInfo.bind(this);

        this.state ={
            workoutsLoading: false,
            recordedWorkouts: [],
            noOfWorkoutsInWeek: 0,
            lastWorkout: "",
            
        }
    }

    async componentDidMount(){
        await this.getRecordedWorkouts();
        if(this.state.recordedWorkouts.length > 0){
            this.calculateWorkoutInfo();
        }
        
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
        this.setState({workoutsLoading: false});
    }

    calculateWorkoutInfo(){
        // Getting number of workouts in the past 7 days
        var min = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);  // Get date a week ago
        var max = new Date();   // Get todays date

        // Calculating number of workouts within past week
        for (var i = 0; i < this.state.recordedWorkouts.length; i++){
            var date = new Date(this.state.recordedWorkouts[i].dateRecorded);   // Getting date of workout
            var isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime()); // Returns true or false is date is between min and max
            // Increment noOfWorkoutsInWeek if isBetween is true
            if (isBetween(date, min, max)){
                this.setState({
                    noOfWorkoutsInWeek: this.state.noOfWorkoutsInWeek + 1
                })
            }
        }

        // Get date of last workout and format correctly
        var getDayName = date => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        var getOrdinalNum = n => (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        var getMonthName = date => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',' November', 'December'][date.getMonth()];
        var day = getDayName(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded))
        var ordinalNum = getOrdinalNum(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded).getDate());
        var month = getMonthName(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded))

        this.setState({
            lastWorkout: day
            + " " + new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded).getDate() 
            + ordinalNum 
            + " " + month,
        })
        
    }




    

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="HOME"/>
                <div className="alert alert-success" role="alert" style={{textAlign: "center",fontSize: "24px"}}>Welcome to CloudPT!</div>

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

              
            </Fragment>
        )
    }
}