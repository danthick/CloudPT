import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import ExerciseList from './exerciseList.component';

var completedExercises = [];
export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.finishWorkout = this.finishWorkout.bind(this);
        this.completedExercise = this.completedExercise.bind(this);
        this.missedExercise = this.missedExercise.bind(this);

        this.state = {
            notes: "",
        };

        if(typeof this.props.location.workout === "undefined"){
            window.location = "/workout"
        }
    }

    async componentDidMount(){

    }

    completedExercise(index){
        completedExercises[index] = {completed: true, exerciseID: this.props.location.workout.exercises[index]._id};
    }

    missedExercise(index){
        completedExercises[index] = {completed: false, exerciseID: this.props.location.workout.exercises[index]._id};
    }

    async finishWorkout(){
        await fetch('/api/workout/record', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({workoutID: this.props.location.workout.workout._id, 
                                completedExercises: completedExercises, 
                                notes: this.state.notes
                            })
    }).then(async res => {
        await res.json().then(async log => {
            if(log.success){
                this.props.history.push({
                    pathname: '/workout',
                    workoutRecorded: true,
                });
            }
        });
        }).catch(error => console.log(error))

        console.log(this.props.location.workout.workout._id)
        
    }



    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="RECORD WORKOUT" back="/workout"/>
                <h2 style={{textAlign: "center"}}>{this.props.location.workout.workout.name}</h2>

                <div>
                    {this.props.location.workout.exercises.map((exercise, index) => 
                        <div key={index}><ExerciseList exercise={exercise} index={index} complete={this.completedExercise} missed={this.missedExercise}/></div>
                    )}
                </div>

                <textarea rows="3" onChange={(e) => this.setState({notes: e.target.value})} value={this.state.notes} className="form-control" placeholder="How did it go?" style={{marginTop: "20px"}}/><br/>
                
                <button className="btn btn-primary container" onClick={this.finishWorkout} >Finish Workout</button>
            </Fragment>
        )
    }
}