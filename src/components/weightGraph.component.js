import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

var state = "";         // Stores state of graph
var weightStack = [];   // Stores all the weights
var dateStack = [];     // Stores all the dates
export default class weightGraph extends Component{
    constructor(props) {
        super(props);

        // Clearing values
        state = "";
        weightStack = [];
        dateStack = [];
        
        // Creating stack with all the users weights
        this.props.weights.forEach(weight => {
            weightStack.push(weight.weight)
        });

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        // Creating a stack with all the users dates that the weights were recorded
        this.props.weights.forEach(weight => {
            const d = new Date(weight.date);
            dateStack.push(d.getDate() + " " + monthNames[d.getMonth()])
        });

        this.createGraph();
    }

    // Creates state of the graph
    createGraph(){
        state = {
            labels: dateStack.reverse(),
            datasets: [
              {
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth:2,
                data: weightStack.reverse()
              }
            ]
        }
    }
    
    render() {
        return (
            <div>
                <Line
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Weight',
                            fontSize:20
                        },
                        legend:{
                            display: false
                        }
                    }}
                    height={300}
                />
          </div>
        )
    }
}