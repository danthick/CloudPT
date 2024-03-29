import React, { Component } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core'


export default class workoutList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    
    render() {
        return (
            <div className="boxList">
            <Box overflow="hidden">
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif"><b>{this.props.workout.workout.name}</b></Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif">Number of Excerises: <b>{this.props.workout.exercises.length}</b></Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif">Date Updated: <b>{new Date(this.props.workout.workout.dateCreated).getDate()}/{new Date(this.props.workout.workout.dateCreated).getMonth() + 1}/{new Date(this.props.workout.workout.dateCreated).getFullYear()}</b></Text>
                    </Box>
                </Flex>
                
                <button style={{display: "inline-block", width: "140px"}} type="button" className="btn btn-success container" onClick={() => this.props.start(this.props.workout)}>Start Workout</button>
            </Box>
            
            </div>
        )
    }
}
