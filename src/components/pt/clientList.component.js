import React, { Component } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core'

export default class exerciseList extends Component{
    constructor(props) {
        super(props);


        this.state = {
            client: this.props.client,
            assigned: this.props.assignedWorkout.length,
            withinWeek: false,
            lastWorkout: "",
        }
    }

    componentDidMount(){
        if(this.props.recordedWorkouts.length > 0){
            
            // Check if the client has completed a workout in the last week
            var min = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);  // Get date a week ago
            var max = new Date();   // Get todays date

            var date = new Date(this.props.recordedWorkouts[this.props.recordedWorkouts.length - 1].dateRecorded);   // Getting date of workout
            var isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime()); // Returns true or false is date is between min and max

            if(isBetween(date, min, max)){
                this.setState({
                    withinWeek: true,
                    lastWorkout: date
                })
            }
        }

    }

    
    render() {
        return (
            <div className="boxList">
            <Box overflow="hidden">
                <Flex flexDirection='row'>
                    <Box flex='1'>
                    <Text fontFamily="Arial, Helvetica, sans-serif">
                        <b>{this.state.client.firstName} {this.state.client.lastName}</b>
                    </Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                    <Text fontFamily="Arial, Helvetica, sans-serif">
                        Workout Currently Assigned: {this.state.assigned? <span style={{color: "green", fontWeight: "bold"}}>Yes</span>: <span style={{color: "red", fontWeight: "bold"}}>No</span>}
                    </Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                <Box flex='1'>
                    <Text fontFamily="Arial, Helvetica, sans-serif">
                        {this.state.lastWorkout !== "" &&
                        <span>
                            Last Workout: {this.state.withinWeek? 
                            <span style={{color: "green", fontWeight: "bold"}}>
                                {new Date(this.state.lastWorkout).getDate()}/{new Date(this.state.lastWorkout).getMonth() + 1}/{new Date(this.state.lastWorkout).getFullYear()}
                            </span>
                            : 
                            <span style={{color: "red", fontWeight: "bold"}}>
                                {new Date(this.state.lastWorkout).getDate()}/{new Date(this.state.lastWorkout).getMonth() + 1}/{new Date(this.state.lastWorkout).getFullYear()}
                            </span>}
                        </span>
                        
                        
                        }
                        
                    </Text>
                    </Box>
                </Flex>

                
                <button type="button" style={{float:"left"}} className="btn btn-primary container" onClick={() => this.props.viewDetails(this.state.client)}>View Details</button>
                <button type="button" style={{float:"right"}} className="btn btn-success container" onClick={() => this.props.viewSchedule(this.state.client)}>View Schedule</button>
            </Box>
            
            </div>
        )
    }
}
