import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import SlideRuler from 'slide-ruler';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AppBar from './appBar.component'
import DeleteIcon from '@material-ui/icons/Delete';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ResponsiveLine } from '@nivo/line';

export default class Weight extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            weight: 60,
            height: 150,
            userHeight: false,
            date: new Date(),
        };
        this.handleValueWeight = this.handleValueWeight.bind(this);
        this.handleValueHeight = this.handleValueHeight.bind(this);
        this.renderSlideRulerWeight = this.renderSlideRulerWeight.bind(this);
        this.renderSlideRulerHeight = this.renderSlideRulerHeight.bind(this);
        this.addWeight = this.addWeight.bind(this);
        this.getWeight = this.getWeight.bind(this);
        this.deleteWeight = this.deleteWeight.bind(this);
        this.updateHeight = this.updateHeight.bind(this);
        this.getHeight = this.getHeight.bind(this);
    }

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
            currentValue: 150,
            handleValue: this.handleValueHeight,
            precision: 0.5,
            fontColor: "#FFFFFF"
        });
      }

      componentDidMount(){
          this.getWeight();
          this.getHeight();
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
            window.location.reload();
      }

      deleteWeight(weightData){
        fetch('/api/weight/' + weightData._id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              }
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
            window.location.reload();
      }

      updateHeight(e){
        const heightData = JSON.stringify(this.state)

        fetch('/api/height/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
            body: heightData
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
            window.location.reload();
      }

      getHeight(){
        fetch('/api/height/', {
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
                this.setState({userHeight: log.height})
            });
            }).catch(error => console.log(error))
      }

      
    render() {
        return (
            
       
            <Fragment>
                <AppBar width="100%" pageName="HEIGHT & WEIGHT" back="/account"/>
                
            

            <h4>Current Height: {this.state.userHeight? <b>{this.state.userHeight} cm</b> : null}</h4>
            <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#heightModal">Update Height</button>
            <br/><br/>
            

            <h4>Current Weight: {} KG</h4>
            <button type="button" className="btn btn-primary container" data-toggle="modal" data-target="#weightModal">Update Weight</button>

            <div style={{height:"auto"}}>
            <List  className="weightList">
                    {this.state.allWeights && this.state.allWeights.map((weightsData, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText>{weightsData.weight} kg - {new Date(weightsData.date).getDate()}/{new Date(weightsData.date).getMonth()}/{new Date(weightsData.date).getFullYear()}</ListItemText>
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
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.updateHeight}>Update Height</button>
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