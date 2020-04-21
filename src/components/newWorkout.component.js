import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            exerciseType: ["Cardio", "Streching", "Body Weight", "Barbell", "Dumbbell"],
            exerciseTypeValue: -1,
            bodyParts: ["Legs", "Back", "Shoulders", "Chest", "Arms", "Abs"],
            bodyPartValue: -1,
            showExerciseList: false,
            showBodyPart: false,
            exerciseValue: -1,
            showCardioOptions: false,
            disableBttn: true,
            exercise: [
                        //Cardio
                        [
                            "Custom", "Treadmill", "Cross-Trainer", "Bike", "Rowing Machine", "Stair Climb", ""
                        ],
                        // Legs
                        [
                            // Streching
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Body Weight
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Barbell
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Dumbbell
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ]
                        ],
                        // Back
                        [
                            // Streching
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Body Weight
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Barbell
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Dumbbell
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ]
                        ],
                        // Shoulders
                        [
                            // Streching
                            [
                                "Custom", "Squat", "Front Squat", "Lunge"
                            ],
                            // Body Weight
                            [

                            ],
                            // Barbell
                            [

                            ],
                            // Dumbbell
                            [

                            ]
                        ],
                        // Chest
                        [
                            // Streching
                            [

                            ],
                            // Body Weight
                            [

                            ],
                            // Barbell
                            [

                            ],
                            // Dumbbell
                            [

                            ]
                        ],
                        // Arms
                        [
                            // Streching
                            [

                            ],
                            // Body Weight
                            [

                            ],
                            // Barbell
                            [

                            ],
                            // Dumbbell
                            [

                            ]
                        ],
                        // Abs
                        [
                            // Streching
                            [

                            ],
                            // Body Weight
                            [

                            ],
                            // Barbell
                            [

                            ],
                            // Dumbbell
                            [

                            ]
                        ],
                    ],
        }
    }

    exerciseTypeChange(e){
        this.setState({
            showBodyPart: false,
            showExerciseList: false,
        })
        this.setState({exerciseTypeValue: e.target.value}); 
        if (e.target.value === "0"){
            this.setState({showExerciseList: true})
        } else if (e.target.value > 0){
            this.setState({showBodyPart: true})
        }
    }

    bodyPartChange(e){
        console.log(e.target.value)
        this.setState({bodyPartValue: e.target.value})
        if(e.target.value > -1){
            this.setState({showExerciseList: true})
        }
    }

    exerciseChange(e){
        this.setState({exerciseValue: e.target.value})

        // Exercise is cardio - show time/distance
        if(this.state.exerciseTypeValue === "0"){
            this.setState({showCardioOptions: true})
        // Exercise is body weight - no need to show weight
        } else if (0 < this.state.exerciseTypeValue < 2) {
        
        // Exercise is weighted - show weight
        } else {

        }
    }

    addExercise(){}

    




    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="NEW WORKOUT" back="/workout"/><br/>

                <form onSubmit={this.addWorkout}>
                    <input  
                        type="text"
                        className="form-control"
                        placeholder="Workout Name"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        required
                        style={{textAlign: "center"}}
                    /><br/>

                    <button type="button" className="btn btn-success container" data-toggle="modal" data-target="#addExercise">ADD EXERCISE</button><br/><br/>

                    <div className="bubbleCard">Will be a list of exercises in workout</div><br/>

                    <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#addExercise">CREATE WORKOUT</button>

                </form>





                <form onSubmit={this.addExercise}>
                <div className="container">
                <div className="modal fade" id="addExercise">
                    <div className="modal-dialog"><br/><br/><br/><br/><br/>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 style={{fontSize: "22px"}} className="modal-title">Add Exercise to Workout</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                            
                                Exercise Type
                                <select className="form-control" onChange={(e) => this.exerciseTypeChange(e)}>
                                    <option hidden >Choose exercise type...</option>
                                    {this.state.exerciseType.map((exerciseType, index) => <option value={index} key={index}>{exerciseType}</option>)}
                                </select><br/>

                                {this.state.showBodyPart?
                                <div>
                                    Body Part
                                    <select className="form-control" onChange={(e) => this.bodyPartChange(e)}>
                                        <option hidden >Choose a body part...</option>
                                        {this.state.bodyParts.map((bodyPart, index) => <option value={index} key={index}>{bodyPart}</option>)}
                                    </select><br/>
                                </div>
                                : null }


                                {this.state.showExerciseList?
                                <div>
                                Exercise
                                <select required className="form-control" onChange={(e) => this.exerciseChange(e) }>
                                    <option hidden >Choose a exercise...</option>
                                    {this.state.exercise[this.state.exerciseTypeValue].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)}
                                </select><br/>
                                {this.state.exerciseValue === "0" &&
                                    <input required type="text" className="form-control" placeholder="Exercise Name" value={this.state.firstName} onChange={this.onChangeFirstName}/>
                                }
                                </div>
                                : null}

                                {this.state.showCardioOptions?
                                <div className="btn-group btn-group-toggle container" style={{padding:"0px",border:"1px solid", borderRadius:"5px", borderColor:"grey"}} data-toggle="buttons">
                                    <label className="btn btn-light ">
                                        <input type="radio" onClick={this.showDistance}/>Distance
                                    </label>
                                    <label className="btn btn-light active">
                                        <input type="radio" onClick={this.showTime} defaultChecked/>Time
                                    </label>
                                </div>
                                : null}
                                        <input
          type="time"
          step="30"
          value={this.state.time}
          className="form-control"
          placeholder="Time"
        />
                            
                            </div>


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