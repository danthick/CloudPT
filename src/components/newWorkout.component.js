import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            
        }

    }

    addExercise(){

    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="NEW WORKOUT" back="/workout"/>

                <div className="bubbleCard">
                    Soon to be where you can create a new workout
                </div><br/>

                <form onSubmit={this.onSubmit}>


                    <input  
                        type="text"
                        id="workoutName"
                        className="form-control"
                        placeholder="Workout Name"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        required
                    /><br/>

                    <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#addExercise">Add Exercise</button><br/><br/>

                    <div className="bubbleCard">Will be a list of exercises in workout</div><br/>
                </form>







                <div className="modal fade container" id="addExercise">
                    <div className="modal-dialog"><br/><br/><br/>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 style={{fontSize: "22px"}} className="modal-title">Add Exercise to Workout</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <select className="mdb-select md-form md-outline colorful-select dropdown-primary" placeholder="Choose one of the following...">
                                    <option hidden >Display but don't show in list</option>
                                    <option value="1">Legs</option>
                                    <option value="2">Back</option>
                                    <option value="3">Shoulders</option>
                                    <option value="3">Chest</option>
                                    <option value="3">Arms</option>
                                    <option value="3">Cardio</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.addExercise}>Add</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}