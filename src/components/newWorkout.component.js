import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            
        }

    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="NEW WORKOUT" back="/workout"/>

                <div className="bubbleCard">
                    Soon to be where you can create a new workout
                </div><br/>
            </Fragment>
        )
    }
}