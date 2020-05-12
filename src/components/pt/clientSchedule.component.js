import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import ClientWorkoutList from './clientWorkoutList.component';

export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.getWorkouts = this.getWorkouts.bind(this);
        this.loadWorkouts = this.loadWorkouts.bind(this);
        this.deleteAssignedWorkout = this.deleteAssignedWorkout.bind(this);

        this.state = {
            workoutsLoading: false,
            workouts: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
            showMessage: false,
            message: "",
            assignment: [],
        };

        if(typeof this.props.location.user == "undefined"){
            this.props.history.push({pathname: '/home'});
        }
    }

    async componentDidMount(){
        await this.getWorkouts();
        this.loadWorkouts();
    }

    async getWorkouts(){
        this.setState({workoutsLoading: true});
        await fetch('/api/workout/assigned', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({user: this.props.location.user})
        }).then(async res => {
            await res.json().then(async log => {
                this.setState({
                    workouts: log.workouts,
                    assignment: log.assignment
                })
            });
            }).catch(error => console.log(error))
        this.setState({workoutsLoading: false});
        
    }

    loadWorkouts(){
        for (var i = 0; i< this.state.assignment.length; i++){
            if(this.state.assignment[i].day === "Monday"){
                var monday = this.state.monday;
                monday.push(this.state.workouts[i])
                this.setState({monday: monday})
            } else if(this.state.assignment[i].day === "Tuesday"){
                var tuesday = this.state.tuesday;
                tuesday.push(this.state.workouts[i])
                this.setState({tuesday: tuesday})
            } else if(this.state.assignment[i].day === "Wednesday"){
                var wednesday = this.state.wednesday;
                wednesday.push(this.state.workouts[i])
                this.setState({wednesday: wednesday})
            } else if(this.state.assignment[i].day === "Thursday"){
                var thursday = this.state.thursday;
                thursday.push(this.state.workouts[i])
                this.setState({thursday: thursday})
            }  else if(this.state.assignment[i].day === "Friday"){
                var friday = this.state.friday;
                friday.push(this.state.workouts[i])
                this.setState({friday: friday})
            }  if(this.state.assignment[i].day === "Saturday"){
                var saturday = this.state.saturday;
                saturday.push(this.state.workouts[i])
                this.setState({saturday: saturday})
            } else if(this.state.assignment[i].day === "Sunday"){
                var sunday = this.state.sunday;
                sunday.push(this.state.workouts[i])
                this.setState({sunday: sunday})
            }
        }
    }

    deleteAssignedWorkout(workout){
        console.log(workout)
        // fetch('/api/workout/assigned', {
        //     method: 'DELETE',
        //     credentials: 'include',
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true
        //     },
        //     body: JSON.stringify({workout: workout})
        // })

    }

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="CLIENT SCHEDULE" back={"/home"}/>
                
                { this.state.showMessage?
                    <h6 className="alert alert-success alert-dismissible" role="alert"> {this.state.message} </h6>
                :   null  
                }

                
                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : this.state.workouts.length > 0 &&
                <div><div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "36px"}}>{this.props.location.user.firstName}'s Schedule</div>


                    
                    {this.state.monday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Monday</h4>
                        {this.state.monday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.tuesday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Tuesday</h4>
                        {this.state.tuesday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.wednesday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Wednesday</h4>
                        {this.state.wednesday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.thursday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Thursday</h4>
                        {this.state.thursday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.friday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Friday</h4>
                        {this.state.friday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.saturday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Saturday</h4>
                        {this.state.saturday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                    {this.state.sunday.length > 0 &&
                    <div className="clientWorkoutList"><h4>Sunday</h4>
                        {this.state.sunday.map((workout, index) => {
                         return (
                        <div key={index}>
                            <ClientWorkoutList workout={workout} delete={this.deleteAssignedWorkout} index={index}/>
                        </div>
                        )})}
                    </div>}
                </div>
                }

                {this.state.workoutsLoading? null : this.state.workouts.length < 1 &&
                    <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "18px"}}> No workouts are assigned to this client! </div>
                }
            <br/><br/><br/><br/></Fragment>
        )
    }
}