import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            exerciseType: ["Cardio", "Streching", "Body Weight", "Barbell", "Dumbbell"],
            cardioExercises: ["Custom", "Treadmill", "Cross-Trainer", "Bike", "Rowing Machine", "Stair Climb", ""],
            strechtingExercises: ["Custom", ],
            bodyParts: ["Custom", "Legs", "Back", "Shoulders", "Chest", "Arms", "Abs", "Cardio"],
            exercises: [["Custom", "Squat", "Front Squat", "Lunge"], // for legs
                        ["Custom", "Deadlift"], // for back
                        ["Custom"], // for shoulders
                        ["Custom"], // for chest
                        ["Custom"],
                        ["Custom"],
                        []],
            bodyPart: 6,
        }
    }

    addExercise(){


    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="NEW WORKOUT" back="/workout"/>

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

                    <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#addExercise">Add Exercise</button><br/><br/>

                    <div className="bubbleCard">Will be a list of exercises in workout</div><br/>
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
                                <select className="form-control" onChange={(e) => this.setState({bodyPart: e.target.value})}>
                                    <option hidden >Choose exercise type...</option>
                                    {this.state.exerciseType.map((exerciseType, index) => <option value={index} key={index}>{exerciseType}</option>)}
                                </select><br/>

                                Body Part
                                <select className="form-control" onChange={(e) => this.setState({bodyPart: e.target.value})}>
                                    <option hidden >Choose a body part...</option>
                                    {this.state.bodyParts.map((bodyPart, index) => <option value={index} key={index}>{bodyPart}</option>)}
                                </select><br/>

                                Exercise
                                <select className="form-control" onChange={(e) => this.setState({exercise: e.target.value})}>
                                    <option hidden >Choose a exercise...</option>
                                    {this.state.exercises[this.state.bodyPart].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)}
                                </select>
                                {this.state.exercise < 1 &&
                                    <input type="text" className="form-control" placeholder="Exercise Name" value={this.state.firstName} onChange={this.onChangeFirstName} required/>
                                }
                            </div>


                            <div className="modal-footer">
                                {this.state.exercise}
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.addExercise}>Add</button>
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