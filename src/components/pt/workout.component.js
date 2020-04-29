import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import WorkoutList from './workoutList.component';


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.createNewWorkout = this.createNewWorkout.bind(this);
        this.getWorkouts = this.getWorkouts.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);

        this.state = {
            workoutsLoading: false,
            workouts: [],
        };

        
    }

    async componentDidMount(){
        await this.getWorkouts();
    }

    createNewWorkout(){
        this.props.history.push({ pathname: '/workout/new'});
    }

    async getWorkouts(){
        this.setState({workoutsLoading: true});
        await fetch('/api/workout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
        }).then(async res => {
            await res.json().then(async log => {
                this.setState({
                    workouts: log.workouts
                })
            });
            }).catch(error => console.log(error))
        this.setState({workoutsLoading: false});
    }


    deleteWorkout(index){
        let deleteWeight = window.confirm("Click OK if you want to delete this workout. It will also be deleted from clients schedule.");
        if (deleteWeight){
            fetch('/api/workout/' + this.state.workouts[index].workout._id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                    }
                }
            )
            window.location.reload();
        }
    }



    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUTS"/>
                <button type="button" className="btn btn-primary container" onClick={this.createNewWorkout}>Create New Workout</button><br/><br/>
                <button type="button" className="btn btn-primary container" onClick={this.startChat}>Assign Workout to a Client</button><br/><br/>
                
                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : this.state.workouts.length > 0 &&
                <div><p className="h4">Active Workouts</p>

                    {this.state.workouts.map((workout, index) => {
                    return (
                        <div key={index}><WorkoutList workout={workout} delete={this.deleteWorkout} index={index}/></div>
                        
                    )})}</div>
                }
            <br/><br/><br/><br/></Fragment>
        )
    }
}