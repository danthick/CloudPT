import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


export default class Workout extends Component{
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="WORKOUTS"/>

            </Fragment>
        )
    }
}