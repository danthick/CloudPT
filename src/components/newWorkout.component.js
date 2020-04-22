import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'
import Exercise from '../data/exercises';


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.showDistance = this.showDistance.bind(this);
        this.showTime = this.showTime.bind(this);

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
            showTime: false,
            showDistance: false,
            customName: "",
            minutes: "",
            seconds: "",
            distance: "",
            weight: "",
            sets: "",
            repititions: "",
            notes: "",
            savedExercises: [],
        }
    }

    exerciseTypeChange(e){
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
        if (e.target.value === "0"){
            this.setState({showExerciseList: true})
        } else if (e.target.value > 0){
            this.setState({showBodyPart: true})
        }
    }

    bodyPartChange(e){
        this.setState({bodyPartValue: e.target.value})
        if(e.target.value > -1){
            this.setState({showExerciseList: true})
        }
    }

    exerciseChange(e){
        this.setState({exerciseValue: e.target.value})

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

        this.setState({
            showNotes: true,
            disableBttn: false
        })
    }

    loadExercises(){

        if(this.state.showBodyPart){
            return Exercise[parseInt(this.state.bodyPartValue) + 1][parseInt(this.state.exerciseTypeValue) - 1].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)
        } else {
            return Exercise[this.state.exerciseTypeValue].map((exercise, index) => <option value={index} key={index}>{exercise}</option>)
        }
    }

    showTime(){
        this.setState({
            showTime: true,
            showDistance: false
        })
    }

    showDistance(){
        this.setState({
            showTime: false,
            showDistance: true
        })
    }

    addExercise(){
        const exerciseData = JSON.stringify(this.state)
        //savedExercises.push()
    }

    




    render() {
        return (
            <Fragment>
                
                <AppBar width="100%" pageName="NEW WORKOUT" back="/workout"/>
                
                <form onSubmit={this.addWorkout}>
                    <input type="text" className="form-control" placeholder="Workout Name" value={this.state.firstName} onChange={this.onChangeFirstName} required style={{textAlign: "center"}}/><br/>

                    <button type="button" className="btn btn-success container" data-toggle="modal" data-target="#addExercise">ADD EXERCISE</button><br/><br/>

                    <div className="bubbleCard">Will be a list of exercises in workout</div><br/>

                    <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#addExercise">CREATE WORKOUT</button>

                </form>





                <form onSubmit={this.addExercise}>
                <div className="container">
                <div className="modal fade" id="addExercise">
                    <div className="modal-dialog"><br/><br/><br/><br/>
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
                                    {this.loadExercises()}
                                    
                                </select><br/>
                                {this.state.exerciseValue === "0" &&
                                    <div>
                                    <input required type="text" className="form-control" placeholder="Exercise Name" onChange={(e) => this.setState({customName: e.target.value})}/><p/><p/>
                                    </div>
                                }
                                </div>
                                : null}

                                {this.state.showCardioOptions?
                                <div>
                                <div className="btn-group btn-group-toggle container" style={{padding:"0px",border:"1px solid", borderRadius:"5px", borderColor:"lightgrey"}} data-toggle="buttons">
                                    <label className="btn btn-light ">
                                        <input type="radio" onClick={this.showDistance}/>Distance
                                    </label>
                                    <label className="btn btn-light active">
                                        <input type="radio" onClick={this.showTime} defaultChecked/>Time
                                    </label>
                                </div><p/><p/>
                                </div>
                                : null}

                                
                                {this.state.showTime?
                                    <div style={{margin: "0px auto", width:"90%"}}>
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({minutes: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Minutes"/>  
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({seconds: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Seconds"/>
                                    </div>
                                : null }

                                {this.state.showDistance?
                                    <div>
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({distance: e.target.value})} className="form-control" style={{textAlign:"center"}} placeholder="Distance (Miles)"/>
                                    </div>
                                : null }

                                {this.state.showWeight? 
                                    <div>
                                        <input required type="number" inputMode="decimal" onChange={(e) => this.setState({weight: e.target.value})} className="form-control" style={{textAlign:"center"}} placeholder="Weight (KG)" /><p/><p/>
                                    </div>
                                :null}   

                                {this.state.showSets? 
                                    <div style={{margin: "0px auto", width:"90%"}}>
                                        <input required type="number" onChange={(e) => this.setState({sets: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Sets"/>  
                                        <input required type="number" onChange={(e) => this.setState({repititions: e.target.value})} className="form-control" style={{width: "47%", textAlign:"center", display: "inline-block", margin: "2px"}} placeholder="Repititions"/>
                                    </div>
                                :null}
                                {this.state.showNotes?
                                    <p>
                                        <textarea rows="3" onChange={(e) => this.setState({notes: e.target.value})} className="form-control" placeholder="Notes (e.g. Video links)" style={{marginTop: "20px"}}/>
                                    </p>
                                :null}
                            </div>


                            <div className="modal-footer">
                                {this.state.customName}
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