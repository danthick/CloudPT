import React, { Component } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core'
import linkifyHtml from 'linkifyjs/html';
import Exercise from '../../data/exercises';

var name, notes = false;
export default class exerciseList extends Component{
    constructor(props) {
        super(props);

        this.getExerciseData = this.getExerciseData.bind(this);
        this.complete = this.complete.bind(this);
        this.missed = this.missed.bind(this);

        this.state = {
            exerciseData: this.props.exercise,
            exerciseType: ["Cardio", "Stretching", "Body Weight", "Barbell", "Dumbbell"],
        }
        this.getExerciseData()
    }

    componentDidMount(){
        if(this.props.recordedInfo){
            this.complete();
        } else if (!this.props.recordedInfo) {
            this.missed();
        }
    }

    getExerciseData(){
        // // Checking if a custom exercise name was used or a pre-selected one
        if(this.state.exerciseData.customName !== ""){
            name = this.state.exerciseData.customName
        } else if(this.state.exerciseData.exerciseTypeValue === "0") {
            name = (Exercise[this.state.exerciseData.exerciseTypeValue])[this.state.exerciseData.exerciseValue]
        } else {
            name = (Exercise[parseInt(this.state.exerciseData.bodyPartValue) + 1][parseInt(this.state.exerciseData.exerciseTypeValue) - 1])[this.state.exerciseData.exerciseValue]
        }

        // Checking for any links in the notes and making them clickable
        notes = (linkifyHtml(this.state.exerciseData.notes, {defaultProtocol: 'https'}));
    }

    // Changing colour of completed exercise to green
    complete(){
        document.getElementById("list" + this.props.index).style.backgroundColor = "rgba(0, 230, 11, 0.37)";
        document.getElementById("list" + this.props.index).style.borderColor = "white";
    }

    // Changing colour of missed exercise to red
    missed(){
        document.getElementById("list" + this.props.index).style.backgroundColor = "rgba(230, 0, 0, 0.37)";
        document.getElementById("list" + this.props.index).style.borderColor = "white";
    }
    
    render() {
        return (
            <div id={"list" + this.props.index} className="boxList">
            <Box overflow="hidden">
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontFamily="Arial, Helvetica, sans-serif"><b>Type: </b>{this.state.exerciseType[this.props.exercise.exerciseTypeValue]}</Text>
                    </Box>
                    <Box flex='1'>
                        <Text textAlign='right' fontFamily="Arial, Helvetica, sans-serif">
                            {this.state.exerciseData.distance? <span>Distance: {this.state.exerciseData.distance} Miles</span>:null}
                            {this.state.exerciseData.minutes? <span>Duration: {this.state.exerciseData.minutes} Min {this.state.exerciseData.seconds} Sec</span>:null}
                            {this.state.exerciseData.weight? <span><b>Weight: </b>{this.state.exerciseData.weight} KG</span>:null}
                        </Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                    <Text fontFamily="Arial, Helvetica, sans-serif"><b>Exercise: </b>{name}</Text>
                    </Box>
                    <Box flex='1'>
                    <Text textAlign='right' fontFamily="Arial, Helvetica, sans-serif">
                        {this.state.exerciseData.sets? <span><b>Sets: </b>{this.state.exerciseData.sets} <span><b>Reps: </b>{this.state.exerciseData.repetitions}</span></span>:null}
                    </Text>
                    </Box>
                </Flex>
                <Flex flexDirection='row'>
                    <Box flex='1'>
                        <Text fontWeight='bold' margin="0" fontFamily="Arial, Helvetica, sans-serif">
                            {this.state.exerciseData.notes? <span>Notes:</span>:null}
                        </Text>
                        <Text fontFamily="Arial, Helvetica, sans-serif" dangerouslySetInnerHTML={{__html: notes}}/>
                    </Box>
                </Flex>
            </Box>
            
            </div>
        )
    }
}
