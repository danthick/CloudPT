import React, { Component, Fragment } from 'react';
import AppBar from '../navigation/appBar.component';
import Loader from 'react-loader-spinner';
import WorkoutList from './workoutList.component';

var selectedClients = [];
export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.createNewWorkout = this.createNewWorkout.bind(this);
        this.getWorkouts = this.getWorkouts.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.assignWorkout = this.assignWorkout.bind(this);

        this.state = {
            workoutsLoading: false,
            workouts: [],
            clients: [],
            day: "Monday",
            assignBttn: false,
        };
    }

    async componentDidMount(){
        await this.getWorkouts();
        await this.getClients();
        selectedClients = [this.state.clients.length].fill(false);
    }

    createNewWorkout(){
        this.props.history.push({ pathname: '/workout/new', workout: "null"});
    }

    async getClients(){
        await fetch('/api/user/relationship', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
        }).then(async res => {
            await res.json().then(log => {
                this.setState({ 
                    clients: log.clients,
                    currentUser: log.currentUser[0]
                })
            });
            }).catch(error => console.log(error))
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

    assignWorkout(){
        for(var i = 0; i < this.state.clients.length; i++){
            if(selectedClients[i] === true){
                console.log(this.state.day)
                console.log(this.state.clients[i].firstName)
                console.log(this.state.clients[i].lastName)
            }
        }
    }

    editWorkout(index){
        this.props.history.push({ pathname: '/workout/new', workout: this.state.workouts[index]});
    }

    openModal(index){
        // Setting workout name for modal title
        this.setState({workoutNameAssign: this.state.workouts[index].workout.name})
        // Open modal
        window.$('#assignModal').modal();
    }

    checkboxChange(e){
        selectedClients[e.target.value] = !selectedClients[e.target.value]
    }



    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUTS"/>
                <button type="button" className="btn btn-primary container" onClick={this.createNewWorkout}>Create New Workout</button><br/><br/>
                
                {this.state.workoutsLoading? <div style={{width: "100px", marginLeft: "auto", marginRight: "auto"}}><Loader type="ThreeDots" color="rgb(53, 141, 58)" height={100} width={100} /> </div>
                : this.state.workouts.length > 0 &&
                <div><p className="h4">Active Workouts</p>

                    {this.state.workouts.map((workout, index) => {
                    return (
                        <div key={index}><WorkoutList workout={workout} delete={this.deleteWorkout} edit={this.editWorkout} assign={this.openModal} index={index}/></div>
                    )})}</div>
                }

                {this.state.workoutsLoading? null : this.state.workouts.length < 1 &&
                    <div className="alert alert-info" role="alert" style={{textAlign: "center",fontSize: "18px"}}> Start by creating a workout! </div>
                }





                <div className="container">
                <div className="modal fade" id="assignModal">
                    <div className="modal-dialog"><br/><br/><br/><br/><br/>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.state.workoutNameAssign}</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">    

                                <div className="btn-group btn-group-toggle container" style={{padding:"5px",border:"1px solid", borderRadius:"5px", borderColor:"lightgrey", display: "block"}} data-toggle="buttons">
                                    <label className="btn btn-light daySelection active">
                                        <input type="radio" value="Monday" onClick={(e) => this.setState({day: e.target.value})} defaultChecked/>Monday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Tuesday" onClick={(e) => this.setState({day: e.target.value})} />Tuesday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Wednesday" onClick={(e) => this.setState({day: e.target.value})} />Wednesday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Thursday" onClick={(e) => this.setState({day: e.target.value})} />Thursday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Friday" onClick={(e) => this.setState({day: e.target.value})} />Friday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Saturday" onClick={(e) => this.setState({day: e.target.value})} />Saturday
                                    </label>
                                    <label className="btn btn-light daySelection">
                                        <input type="radio" value="Sunday" onClick={(e) => this.setState({day: e.target.value})} />Sunday
                                    </label>

                                </div><p/><p/>

                                {/* List of clients to select */}
                                {this.state.clients.length?
                                <div className="custom-control-lg custom-checkbox mb-0">
                                    <h4>Select clients</h4>
                                    {this.state.clients.map((client, index) => {
                                    return (
                                    <li key={index} className="clientList">
                                        <input type="checkbox" className="custom-control-input" id={index} value={index} onChange={e => this.checkboxChange(e)}/>
                                        <label className="custom-control-label" htmlFor={index}>{client.firstName} {client.lastName}</label>
                                    </li>
                                    )})}
                                </div>
                                : null}   

                            </div>
                            <div className="modal-footer">
                                <button disabled={this.state.assignBttn} type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.assignWorkout}>Assign Workout</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>




            <br/><br/><br/><br/></Fragment>
        )
    }
}