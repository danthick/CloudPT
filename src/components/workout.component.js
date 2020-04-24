import React, { Component, Fragment } from 'react';
import AppBar from './navigation/appBar.component';


export default class Workout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            
        }

    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUTS"/>

            </Fragment>
        )
    }
}