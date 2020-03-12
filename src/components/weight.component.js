import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import SlideRuler from 'slide-ruler';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AppBar from './appBar.component'
import DeleteIcon from '@material-ui/icons/Delete';
import { ResponsiveLine } from '@nivo/line';


const DATA = [
    [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
    [{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
  ];

  var sortedArray = [];

export default class Weight extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            weight: 60,
            height: 150,
            date: new Date().toLocaleString(),
            allWeights: [],
        };
        this.handleValueWeight = this.handleValueWeight.bind(this);
        this.handleValueHeight = this.handleValueHeight.bind(this);
        this.renderSlideRulerWeight = this.renderSlideRulerWeight.bind(this);
        this.renderSlideRulerHeight = this.renderSlideRulerHeight.bind(this);
        this.addWeight = this.addWeight.bind(this);
        this.getWeight = this.getWeight.bind(this);
        this.deleteWeight = this.deleteWeight.bind(this);
    }

    _onMouseLeave = () => {
        this.setState({crosshairValues: []});
      };

      _onNearestX = (value, {index}) => {
        this.setState({crosshairValues: DATA.map(d => d[index])});
      };

      handleValueWeight(value){
        this.setState({weight: value});
      }
      handleValueHeight(value){
        this.setState({height: value});
      }

      renderSlideRulerWeight(){
        return new SlideRuler({
            el: this.refs.slideRulerWeight,
            maxValue: 250,
            minValue: 30,
            currentValue: 80,
            handleValue: this.handleValueWeight,
            precision: 0.1,
            fontColor: "#FFFFFF"
        });
      }
      renderSlideRulerHeight(){
        return new SlideRuler({
            el: this.refs.slideRulerHeight,
            maxValue: 250,
            minValue: 30,
            currentValue: 80,
            handleValue: this.handleValueHeight,
            precision: 0.1,
            fontColor: "#FFFFFF"
        });
      }

      async componentDidMount(){
          this.getWeight();
          this.renderSlideRulerWeight();
          this.renderSlideRulerHeight();
      }
    
    
    getWeight(e){
        fetch('/api/weight/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
            }
        ).then(res => {
            res.json().then(async log => {
                this.setState({allWeights: log.weights})
            });
            }).catch(error => console.log(error))
    }
    
    addWeight(e){
        const weightData = JSON.stringify(this.state)

        fetch('/api/weight/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
            body: weightData
            }
        ).then(res => {
            res.json().then(log => {
                 if (log.redirect === '/home') {
                    //this.setState({auth: true});
                 } else {
                    // window.location = "/"
                 }
            });
            }).catch(error => console.log(error))
      }

      deleteWeight(weightData){
          alert(weightData.weight)
      }
      
      custom_sort(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    sortDate(array){
        return array.sort(this.custom_sort)
    }
      
    render() {
        return (
            <Fragment>
            <AppBar pageName="Manual Weight Input"/>
            <h3><Link to={'/account'}>&larr;</Link> Manual Weight Input</h3>
            <h4>Current Height:</h4>
            <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#heightModal">Update Height</button>
            <br/><br/>
            

            <h4>Current Weight: {console.log(this.state.allWeights[1])}</h4>
            <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#weightModal">Update Weight</button>
            
            <ResponsiveLine
                data={{x:1, y:2}}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
    />
  

            <div style={{height:"auto"}}>
            <List  className="weightList">
                    {this.state.allWeights && this.state.allWeights.map((weightsData, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText>{weightsData.weight} {new Date(weightsData.date).getDate()}</ListItemText>
                                <ListItemSecondaryAction onClick={() => this.deleteWeight(weightsData)}>
                                    <IconButton edge="end">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                        })}
                </List>
            </div>


        
            <div className="container">
            
            <div className="modal fade" id="weightModal">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title">Manual Weight Input</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div ref='slideRulerWeight' className="ruler"></div>
                        Weight: {this.state.weight} KG
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addWeight}>Add Weight</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="modal fade" id="heightModal">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title">Manual Height Input</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div ref='slideRulerHeight' className="ruler"></div>
                        Height: {this.state.height} CM
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addWeight}>Update Height</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
            <br/> <br/> <br/>
            </Fragment>
        )
    }
}