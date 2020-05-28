import React, { Component, Fragment } from 'react';
import AppBar from '../../navigation/appBar.component';
import ExerciseList from './exerciseList.component';
import Exercise from '../../../data/exercises'; // Importing list of exercises array
const $ = window.$;

var savedExercises = [];
export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.addExercise = this.addExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exerciseType: ["Cardio", "Stretching", "Body Weight", "Barbell", "Dumbbell"],
            exerciseTypeValue: -1,
            bodyParts: ["Legs", "Back", "Shoulders", "Chest", "Arms", "Abs"],
            bodyPartValue: -1,
            showExerciseList: false,
            showBodyPart: false,
            exerciseValue: -1,
            showCardioOptions: false,
            disableBttn: true,
            showTime: false,
            showDistance: false,
            showNotes: false,
            customName: "",
            minutes: "",
            seconds: "",
            distance: "",
            weight: "",
            sets: "",
            repetitions: "",
            notes: "",
            showExercises: true,
            workoutName: "",
            workoutID: "", 
        }
        if(typeof this.props.location.workout === "undefined"){
            window.location = "/workout"
        }
    }

    componentDidMount(){
        // Checking if a new workout is being made or one is being edited
        if(this.props.location.workout !== "null"){
            savedExercises = this.props.location.workout.exercises
            this.setState({
                workoutName: this.props.location.workout.workout.name,
                workoutID: this.props.location.workout.workout._id
            })
        } else {
            savedExercises = [];
            this.setState({showExercises: false})
            this.setState({showExercises: false})
        }

    }

    exerciseTypeChange(e){
        // Hiding other options if exercise type is changed
        this.setState({
            showBodyPart: false,
            showExerciseList: false,
            showCardioOptions: false,
            showTime: false,
            showDistance: false,
            showWeight: false,
            showSets: false,
            showNotes: false
        })
        this.setState({exerciseTypeValue: e.target.value}); 
        
        // If exercise type is cardio - don't ask for a body part
        if (e.target.value === "0"){
            this.setState({showExerciseList: true})
        } else if (e.target.value > 0){
            this.setState({showBodyPart: true})
        }
    }

    exerciseChange(e){
        // Hiding other options if exercise is changed
        this.setState({
            exerciseValue: e.target.value,
            showCardioOptions: false,
            showTime: false,
            showDistance: false,
            showWeight: false,
            showSets: false,
            showNotes: false
        })

        // Exercise is cardio - show time/distance
        if(this.state.exerciseTypeValue === "0"){
            this.setState({
                showCardioOptions: true,
                showTime: true
            })
        // Exercise is stretching - show time
        } else if (this.state.exerciseTypeValue === "1") {
            this.setState({showTime: true})
        // Exercise is bodyweight - show reps and sets
        } else if (this.state.exerciseTypeValue === "2"){
            this.setState({showSets: true})
        // Exercise is weighted - show reps, sets and weight
        } else {
            this.setState({
                showSets: true,
                showWeight: true,
            })
        }

        // Showing notes and enabling add button
        this.setState({
            showNotes: true,
            disableBttn: false
        })
    }


    loadExercises(){
        if(this.state.showBodyPart){
            // Showing correct exercises based on selected options - if a body part has been selected
            return Exercise[parseInt(this.state.bodyPartValue) + 1][parseInt(this.state.exerciseTypeValue) - 1].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)
        } else {
            // Showing correct exercises based on selected options - if cardio has been selected
            return Exercise[this.state.exerciseTypeValue].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)
        }
    }

    addExercise(e){
        e.preventDefault();

        // Pushing created exercise onto stack
        savedExercises.push(this.state);

        // Hiding modal and reseting values
        $('#addExercise').modal('hide');
        $("#exerciseType").val('hidden');

        // Resetting states
        this.setState({
            exerciseTypeValue: -1,
            bodyPartValue: -1,
            showExerciseList: false,
            showBodyPart: false,
            exerciseValue: -1,
            showCardioOptions: false,
            disableBttn: true,
            showTime: false,
            showDistance: false,
            showNotes: false,
            showSets: false,
            showWeight: false,
            customName: "",
            minutes: "",
            seconds: "",
            distance: "",
            weight: "",
            sets: "",
            repetitions: "",
            notes: "",
            showExercises: false
        })
        this.setState({showExercises: true})
    }

    deleteExercise(index){
        // Remove exercise from array and refresh list
        const filteredItems = savedExercises.slice(0, index).concat(savedExercises.slice(index + 1, savedExercises.length))
        savedExercises = filteredItems
        this.setState({showExercises: false});
        this.setState({showExercises: true});
    }

    async saveWorkout(e){
        e.preventDefault();
        savedExercises[0].workoutName = this.state.workoutName;

        const workoutData = JSON.stringify(savedExercises)
        var newWorkoutID;
        await fetch('/api/workout/new', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: workoutData
        }).then(async res => {
            await res.json().then(async log => {
                newWorkoutID = log._id;
            });
            }).catch(error => console.log(error))

        // If workout is being updated
        if(this.state.workoutID !== ""){
            fetch('/api/workout/update/' + this.state.workoutID, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({oldWorkoutID: this.state.workoutID, newWorkoutID: newWorkoutID})
            })
        }

        this.props.history.push({ pathname: '/workout/'});
        

    }


    render() {
        return (
            <Fragment>
                
                <AppBar width="100%" pageName="CREATE WORKOUT" back="/workout"/>
                
                <form onSubmit={e => this.saveWorkout(e)}>
                    <input type="text" className="form-control" placeholder="Workout Name" value={this.state.workoutName} onChange={(e) => this.setState({workoutName: e.target.value})} required style={{textAlign: "center"}}/><br/>
                    <button type="button" className="btn btn-success container" data-toggle="modal" data-target="#addExercise">ADD EXERCISE</button><br/><br/>

                    {/* Prompt for user to add an exercise if none have been added */}
                    {savedExercises.length? null: 
                    <div className="alert alert-info" role="alert" style={{textAlign: "center"}}>Add an exercise to begin creating this workout!</div>}

                    {/* List all exercises that have been added to the workout */}
                    {this.state.showExercises?
                    <div>{savedExercises.map((exercise, index) => <div key={index}><ExerciseList exercise={exercise} index={index} delete={this.deleteExercise}/></div>)}</div>
                    : null }

                    <br/><button type="submit" className="btn btn-primary container" disabled={savedExercises.length? false:true}>SAVE WORKOUT</button> <br/><br/><br/><br/>
                </form>




                {/* The modal to add a new exercise to the workout */}
                <form onSubmit={e => this.addExercise(e)}>
                <div className="container">
                <div className="modal fade" id="addExercise">
                    <div className="modal-dialog"><br/><br/><br/><br/>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 style={{fontSize: "22px"}} className="modal-title">Add Exercise to Workout</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">

                                {/* Option to choose the exercise type */}
                                Exercise Type
                                <select className="form-control" id="exerciseType" onChange={(e) => this.exerciseTypeChange(e)}>
                                    <option hidden value="hidden">Choose exercise type...</option>
                                    {this.state.exerciseType.map((exerciseType, index) => <option value={index} key={index}>{exerciseType}</option>)}
                                </select><br/>

                                {/* Option to choose the body part - shown after the exercise type */}
                                {this.state.showBodyPart?
                                <div>
                                    Body Part
                                    <select className="form-control" onChange={(e) => this.setState({bodyPartValue: e.target.value, showExerciseList: true})}>
                                        <option hidden >Choose a body part...</option>
                                        {this.state.bodyParts.map((bodyPart, index) => <option value={index} key={index}>{bodyPart}</option>)}
                                    </select><br/>
                                </div>
                                : null }

                                {/* Option to choose the specific exercise - shown after the body part selection */}
                                {this.state.showExerciseList?
                                <div>
                                Exercise
                                <select required className="form-control" onChange={(e) => this.exerciseChange(e) }>
                                    <option hidden >Choose a exercise...</option>
                                    {this.loadExercises()}
                                </select><br/>

                                {/* Option to add a custom exercise name - shown if "custom" is selected in the drop down list */}
                                {this.state.exerciseValue === "0" &&
                                    <div>
                                    <input required type="text" className="form-control" placeholder="Exercise Name" onChange={(e) => this.setState({customName: e.target.value})} value={this.state.customName}/><p/><p/>
                                    </div>
                                }
                                </div>
                                : null}
                                
                                {/* Ability to add cardio details if a cardio exercise was added */}
                                {this.state.showCardioOptions?
                                <div>
                                <div className="btn-group btn-group-toggle container" style={{padding:"0px",border:"1px solid", borderRadius:"5px", borderColor:"lightgrey"}} data-toggle="buttons">
                                    <label className="btn btn-light ">
                                        <input type="radio" onClick={(e) => this.setState({showTime: false, showDistance: true})}/>Distance
                                    </label>
                                    <label className="btn btn-light active">
                                        <input type="radio" onClick={(e) => this.setState({showTime: true, showDistance: false})} defaultChecked/>Time
                                    </label>
                                </div><p/><p/>
                                </div>
                                : null}

                                {/* Ability to add a duration */}
                                {this.state.showTime?
                                    <div style={{margin: "0px auto", width:"90%"}}>
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({minutes: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Minutes"/>  
                                        <input required type="number" inputMode="decimal" max="59" onChange={(e) => this.setState({seconds: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Seconds"/>
                                    </div>
                                : null }
                                
                                {/* Ability to add a distance */}
                                {this.state.showDistance?
                                    <div>
                                        <input required type="number" step="any" inputMode="decimal" onChange={(e) => this.setState({distance: e.target.value})} className="form-control" style={{textAlign:"center"}} placeholder="Distance (Miles)"/>
                                    </div>
                                : null }

                                {/* Ability to add a weight */}
                                {this.state.showWeight? 
                                    <div>
                                        <input required type="number" step="any" inputMode="decimal" onChange={(e) => this.setState({weight: e.target.value})} className="form-control" style={{textAlign:"center"}} placeholder="Weight (KG)" /><p/><p/>
                                    </div>
                                :null}   

                                {/* Ability to add sets and reps */}
                                {this.state.showSets? 
                                    <div style={{margin: "0px auto", width:"90%"}}>
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({sets: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Sets"/>  
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({repetitions: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Repetitions"/>
                                    </div>
                                :null}
                                
                                {/* Ability to add notes */}
                                {this.state.showNotes?
                                    <p><textarea rows="3" onChange={(e) => this.setState({notes: e.target.value})} className="form-control" placeholder="Notes (e.g. Video links)" style={{marginTop: "20px"}}/></p>
                                :null}
                            </div>

                            {/* Modal close and add buttons */}
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" disabled={this.state.disableBttn}>Add</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </form>
            </Fragment>
        )
    }
}