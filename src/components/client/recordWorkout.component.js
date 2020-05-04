import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import ExerciseList from './exerciseList.component';

var exerciseCompleted = []
export default class Workout extends Component{
    constructor(props) {
        super(props);


        this.state = {
            
        };

        if(typeof this.props.location.workout === "undefined"){
            window.location = "/workout"
        }
    }

    async componentDidMount(){

    }

    completedExercise(index){
        console.log(index)
        exerciseCompleted[index] = true;
    }

    missedExercise(index){
        console.log(index)
        exerciseCompleted[index] = false;
    }

    finishWorkout(){
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
                
                <button className="btn btn-primary container" onClick={this.logout} >Finish Workout</button>
            </Fragment>
        )
    }
}