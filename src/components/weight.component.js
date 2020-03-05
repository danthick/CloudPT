import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import SlideRuler from 'slide-ruler';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default class Weight extends Component{
    
    constructor(props) {
        super(props);
        

        this.state = {
            //auth: false,
            weight: 60,
            date: new Date().toLocaleString(),
            allWeights: null
        };
        this.onChange = this.onChange.bind(this)
        this.handleValue = this.handleValue.bind(this);
        this.__renderSlideRuler = this.__renderSlideRuler.bind(this);
        this.addWeight = this.addWeight.bind(this);
        this.getWeight = this.getWeight.bind(this);
    }

    onChange(e) {
        this.setState({
            auth: e.target.value
        });
      }

      handleValue(value){
        this.setState({weight: value});
      }

      __renderSlideRuler(){
        return new SlideRuler({
            el: this.refs.slideRuler,
            maxValue: 250,
            minValue: 30,
            currentValue: 60,
            handleValue: this.handleValue,
            precision: 0.1
        });
      }
    

    async componentDidMount() {
        fetch('/api/auth/', {
                method: 'GET',
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
                        this.setState({auth: true});
                     } else {
                         window.location = "/"
                     }
                });
                }).catch(error => console.log(error))
        this.__renderSlideRuler();  
        this.getWeight();
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
        e.preventDefault();
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



      
    render() {
        //if (!this.state.auth) return null;
        return (
            <Fragment>
            <h3><Link to={'/account'}>&larr;</Link> Manual Weight Input</h3>
            <br/>
            <div ref='slideRuler' className="ruler"></div>
            <br/><br/><br/>
            <div>
                 Weight: {this.state.weight}
            </div>

            <div>
            <input type="button" value="Add Weight" className="btn btn-primary container" onClick={this.addWeight} />
            </div>

            <div>
                <img src="/weight-graph.png"/>

            </div>

            <div>
                <List>
                    {this.state.allWeights && this.state.allWeights.map(sectionID => (
                        <ListItem>
                            <ListItemText>1</ListItemText>
                        </ListItem>
                    ))}
                </List>
                
            </div>

            {/* {this.state.allWeights &&
                   this.state.allWeights(
                    <ListItem>
                        {this.state.allWeights}
                    </ListItem>
                )
            } */}


            <div>
                
            </div>

            </Fragment>
        )
    }
}