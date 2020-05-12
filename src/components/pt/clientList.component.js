import React, { Component } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core'

export default class exerciseList extends Component{
    constructor(props) {
        super(props);


        this.state = {
            client: this.props.client,
            assigned: false
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
                        Last Workout: {this.state.assigned? <span style={{color: "green", fontWeight: "bold"}}>01/01/2000</span>: <span style={{color: "red", fontWeight: "bold"}}>01/01/2000</span>}
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
