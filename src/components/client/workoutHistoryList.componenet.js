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
                        <Text fontFamily="Arial, Helvetica, sans-serif"><b>{this.props.workoutInfo.workout.name}</b></Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif">Number of Excerises: <b>{this.props.workoutInfo.exercises.length}</b></Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif">Date: <b>{new Date(this.props.recordInfo.dateRecorded).getDate()}/{new Date(this.props.recordInfo.dateRecorded).getMonth() + 1}/{new Date(this.props.recordInfo.dateRecorded).getFullYear()}</b></Text>
                    </Box>
                </Flex>
                
                <button style={{float: "left", width: "50%"}} type="button" className="btn btn-info container" onClick={() => this.props.view(this.props.index)}>View Workout</button>
            </Box>
            
            </div>
        )
    }
}
