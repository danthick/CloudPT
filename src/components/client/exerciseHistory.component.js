import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import ExerciseHistoryList from './exerciseHistoryList.component';

var completedExercises = [];
export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.completedExercise = this.completedExercise.bind(this);
        this.missedExercise = this.missedExercise.bind(this);

        this.state = {
            notes: "",
        };

        if(typeof this.props.location.workoutInfo === "undefined"){
            window.location = "/workout/history"
        }
    }

    completedExercise(index){
        completedExercises[index] = {completed: true, exerciseID: this.props.location.workout.exercises[index]._id};
    }

    missedExercise(index){
        completedExercises[index] = {completed: false, exerciseID: this.props.location.workout.exercises[index]._id};
    }



    render() {
        return (
            <Fragment>
                {window.location.pathname.split('/')[1] === "home" && 
                    <AppBar width="100%" pageName="WORKOUT INFORMATION" back="/home/details/history"/>
                }
                {window.location.pathname.split('/')[1] === "workout" && 
                    <AppBar width="100%" pageName="WORKOUT INFORMATION" back="/workout/history"/>
                }
                <h2 style={{textAlign: "center"}}>{this.props.location.workoutInfo.workout.name}</h2>

                {/* Lists all exercises completed in workout */}
                <div>
                    {this.props.location.workoutInfo.exercises.map((exercise, index) => 
                        <div key={index}><ExerciseHistoryList exercise={exercise} recordedInfo={this.props.location.recordedWorkout.completedExercises[index].completed} index={index} complete={this.completedExercise} missed={this.missedExercise}/></div>
                    )}
                </div>

                {this.props.location.recordedWorkout.notes !== "" &&
                <div className="boxList" s>
                    <p style={{fontWeight: "bold"}}>How did it go?</p>
                    <p>
                        {this.props.location.recordedWorkout.notes}
                    </p>
                    
                </div>
                }
            </Fragment>
        )
    }
}