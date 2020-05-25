import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import WeightGraph from '../weightGraph.component';

export default class ClientDetails extends Component{
    constructor(props) {
        super(props);

        this.viewWorkoutHistory = this.viewWorkoutHistory.bind(this);
        this.removeClient = this.removeClient.bind(this);
        this.getRecordedWorkouts = this.getRecordedWorkouts.bind(this);
        this.calculateWorkoutInfo = this.calculateWorkoutInfo.bind(this);
        this.getWeight = this.getWeight.bind(this);

        this.state ={
            user: this.props.location.user,
            show: false,
            workoutsLoading: false,
            recordedWorkouts: [],
            noOfWorkoutsInWeek: 0,
            lastWorkout: "",
            allWeights: "",
            
        }

        if(typeof this.state.user !== "undefined"){
            localStorage.clear();
        }
    }

    async componentDidMount() {
        const rehydrate = JSON.parse(localStorage.getItem('user'))
        this.setState(rehydrate)
        this.setState({show: true})

        await this.getRecordedWorkouts();
        if(this.state.recordedWorkouts.length > 0){
            this.calculateWorkoutInfo();
        }
        await this.getWeight();
        console.log(this.state.allWeights)

    }

    componentWillUnmount() {
        localStorage.setItem('user', JSON.stringify(this.state))
    }

    viewWorkoutHistory(){
        this.props.history.push({
            pathname: '/home/details/history',
            user: this.state.user,
        });
    }

    async getWeight(){
        await fetch('/api/weight/user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
            body: JSON.stringify({user: this.state.user})
            }).then(async res => {
            await res.json().then(async log => {
                // Sort weights into date order
                this.setState({allWeights: log.weights.sort((a, b) => new Date(b.date) - new Date(a.date))})
            });
        }).catch(error => console.log(error))
        this.setState({workoutsLoading: false});
    }

    async getRecordedWorkouts(){
        this.setState({workoutsLoading: true});
        await fetch('/api/workout/recorded', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({user: this.state.user})
        }).then(async res => {
            await res.json().then(async log => {
                this.setState({
                    recordedWorkouts: log.recordedWorkouts,
                })
            });
            }).catch(error => console.log(error))
        
    }

    calculateWorkoutInfo(){
        // Getting number of workouts in the past 7 days
        var min = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);  // Get date a week ago
        var max = new Date();   // Get todays date

        // Calculating number of workouts within past week
        for (var i = 0; i < this.state.recordedWorkouts.length; i++){
            var date = new Date(this.state.recordedWorkouts[i].dateRecorded);   // Getting date of workout
            var isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime()); // Returns true or false is date is between min and max
            // Increment noOfWorkoutsInWeek if isBetween is true
            if (isBetween(date, min, max)){
                this.setState({
                    noOfWorkoutsInWeek: this.state.noOfWorkoutsInWeek + 1
                })
            }
        }

        // Get date of last workout and format correctly
        var getDayName = date => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        var getOrdinalNum = n => (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        var getMonthName = date => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',' November', 'December'][date.getMonth()];
        var day = getDayName(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded))
        var ordinalNum = getOrdinalNum(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded).getDate());
        var month = getMonthName(new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded))

        this.setState({
            lastWorkout: day
            + " " + new Date(this.state.recordedWorkouts[this.state.recordedWorkouts.length-1].dateRecorded).getDate() 
            + ordinalNum 
            + " " + month,
        })
        
    }


    removeClient(){
        let removeClient = window.confirm("Click OK if you want to remove this client. All workouts assigned to them will also be removed.");
        if (removeClient){
            fetch('/api/user/relationship', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({email: this.state.user.email})
            }).then(res => {
                res.json().then(log => {
                    if(log.success){
                        this.props.history.push({pathname: '/home'});
                    }
                });
                }).catch(error => console.log(error))
        }
    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="CLIENT DETAILS" back={"/home"}/>
                {this.state.show?
                    <div>
                    <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "36px"}}>{this.state.user.firstName} {this.state.user.lastName}</div>

                    {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                    : this.state.recordedWorkouts.length > 0 &&
                    <div>
                    <div className="alert alert-info" role="alert">
                        <p style={{textAlign: "center",fontSize: "36px"}}>{this.state.noOfWorkoutsInWeek} </p>
                        <p style={{textAlign: "center"}}>Workout{this.state.noOfWorkoutsInWeek !== 1 && <span>s</span>} completed this week!</p>
                    </div>
                    <div className="alert alert-info" role="alert">
                        <p style={{textAlign: "center",fontSize: "36px"}}>{this.state.lastWorkout}</p>
                        <p style={{textAlign: "center"}}>Last completed workout!</p>
                    </div>

                    {this.state.allWeights.length > 0 &&
                        <div><WeightGraph weights={this.state.allWeights} /></div>
                    
                    }

                    </div>}



                    <button type="button" className="btn btn-primary container" onClick={this.viewWorkoutHistory}>View Workout History</button><br/>
                    <input type="button" value="Remove Client" className="btn btn-danger container" onClick={this.removeClient} />
                    </div>
                : null }

            <br/><br/><br/><br/></Fragment>
        )
    }
}